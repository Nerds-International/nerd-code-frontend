import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Battle from './Battle';

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe('Battle Component', () => {
  it('renders without crashing', () => {
    render(<Battle />);
  });

  it('finds a match when JavaScript is selected', async () => {
    render(<Battle />);
    fireEvent.change(screen.getByLabelText(/Choose a programming language/i), { target: { value: 'javascript' } });
    fireEvent.click(screen.getByText(/Find Match/i));
    await waitFor(() => screen.getByText(/The nerd for the battle has been found/i));
  });
});
