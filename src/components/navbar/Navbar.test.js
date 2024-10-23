import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

test("correct rendering", () => {
  render(<Navbar/>);
  expect(screen.getByText(/Problems/i)).toBeInTheDocument();
  expect(screen.getByText(/Discuss/i)).toBeInTheDocument();
  expect(screen.getByText(/Battle/i)).toBeInTheDocument();
});