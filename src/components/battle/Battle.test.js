import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Battle from "./Battle";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ found: false }),
  }),
);

describe("Battle Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders without crashing", () => {
    render(<Battle />);
    expect(screen.getByText(/No Match Found/i)).toBeInTheDocument();
  });

  test("displays loading message when finding a match", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ found: false }),
      }),
    );

    render(<Battle />);
    fireEvent.click(screen.getByText(/Find Match/i));

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument(),
    );
    expect(screen.getByText(/No Match Found/i)).toBeInTheDocument();
  });

  test("displays match found message when a match is found", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ found: true }),
      }),
    );

    render(<Battle />);
    fireEvent.click(screen.getByText(/Find Match/i));

    await waitFor(() =>
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument(),
    );
  });

  test("handles fetch error gracefully", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));

    render(<Battle />);
    fireEvent.click(screen.getByText(/Find Match/i));

    await waitFor(() =>
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument(),
    );
    expect(screen.getByText(/No Match Found/i)).toBeInTheDocument();
  });
});
