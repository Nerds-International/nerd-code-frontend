import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App, { sampleFunction } from './App';
import React from "react";

test("Example 1 renders successfully", () => {
  render(<App />);

  const element = screen.getByText(/I have been clicked \d+ times/i);

  expect(element).toBeInTheDocument();
})

test("sampleFunction correctly works", () => {
  expect(sampleFunction(1, 2)).toBe(4);
})

