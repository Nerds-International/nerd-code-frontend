import { render, fireEvent, screen } from '@testing-library/react';
import Battle from './Battle';

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe('Battle Component', () => {
  it('renders without crashing', () => {
    render(<Battle />);
  });

  it('finding match', async () => {
    render(<Battle />);
    fireEvent.change(screen.getByLabelText(/Choose a programming language/i), { target: { value: 'javascript' } });
    fireEvent.click(screen.getByText(/Find Match/i));
    await screen.findByText(/Looking for nerds/i);
  });
});