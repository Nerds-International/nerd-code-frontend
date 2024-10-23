import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test("Example 1 renders successfully", () => {
  render(<App />);

  expect(screen.getByText(/Problems/i)).toBeInTheDocument();
  expect(screen.getByText(/Discuss/i)).toBeInTheDocument();
  expect(screen.getByText(/Battle/i)).toBeInTheDocument();
})

