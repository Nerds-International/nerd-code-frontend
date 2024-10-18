import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import React from "react";

test.only("Example 1 renders successfully", () => {
  render(<App />);

  const element = screen.getByText(/I have been clicked \d+ times/i);

  expect(element).toBeInTheDocument();
})

