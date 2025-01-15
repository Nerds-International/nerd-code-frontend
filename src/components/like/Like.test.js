import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom/extend-expect";
import Like from "./Like";
import { authStore } from "../../store/auth/AuthStore";

jest.mock("../../store/auth/AuthStore", () => ({
  authStore: {
    isAuthenticated: false,
  },
}));

describe("Like Component", () => {
  beforeEach(() => {
    authStore.isAuthenticated = true;
  });

  test("renders without crashing", () => {
    render(<Like count={10} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("calls editCount function with correct arguments when heart icon is clicked", () => {
    const editCountMock = jest.fn();
    render(<Like count={10} clickable={true} editCount={editCountMock} />);

    const heartIcon = screen.getByRole("img");
    fireEvent.click(heartIcon);
    expect(editCountMock).toHaveBeenCalledWith(1);

    fireEvent.click(heartIcon);
    expect(editCountMock).toHaveBeenCalledWith(1);
    expect(editCountMock).toHaveBeenCalledTimes(1);
  });
});
