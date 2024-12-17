import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Battle from './Battle';
import '@testing-library/jest-dom/extend-expect';
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));


jest.mock('../../store/socket/WebSocketStore', () => ({
  webSocketStore: {
    socket: {
      emit: jest.fn(),
      on: jest.fn(),
    },
  },
}));

describe('Battle Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Battle />);
  });

  it('findMatch function calls API and emits socket event', async () => {
    const mockBattleId = '12345';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(mockBattleId),
      })
    );

    const { webSocketStore } = require('../../store/socket/WebSocketStore');

    render(<Battle />);

    fireEvent.change(screen.getByLabelText(/Choose a programming language/i), {
      target: { value: 'javascript' },
    });

    fireEvent.click(screen.getByText(/Find Match/i));

    await screen.findByText(/Looking for nerds/i);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/battles/getKeys');
    });

    expect(webSocketStore.socket.emit).toHaveBeenCalledWith('joinBattle', mockBattleId);
  });

  it('handles fetch error gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    render(<Battle />);

    fireEvent.change(screen.getByLabelText(/Choose a programming language/i), {
      target: { value: 'javascript' },
    });
    fireEvent.click(screen.getByText(/Find Match/i));

    await screen.findByText(/Looking for nerds/i);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    expect(screen.getByText(/Looking for nerds.../i)).toBeInTheDocument();
  });
});
