import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Like from "./Like";

describe("Like Component", () => {
  test("renders without crashing", () => {
    render(<Like count={10} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("renders clickable heart icon when clickable is true", () => {
    const editCountMock = jest.fn();
    render(<Like count={10} clickable={true} editCount={editCountMock} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  // test("calls editCount function when heart icon is clicked", () => {
  //   const editCountMock = jest.fn();
  //   render(<Like count={10} clickable={true} editCount={editCountMock} />);
  //   const heartIcon = screen.getByRole("img");
  //   fireEvent.click(heartIcon);
  //   expect(editCountMock).toHaveBeenCalledWith(1);
  //   fireEvent.click(heartIcon);
  //   expect(editCountMock).toHaveBeenCalledWith(-1);
  // });

  test("does not call editCount function when heart icon is not clickable", () => {
    const editCountMock = jest.fn();
    render(<Like count={10} clickable={false} editCount={editCountMock} />);
    const heartIcon = screen.getByRole("img");
    fireEvent.click(heartIcon);
    expect(editCountMock).not.toHaveBeenCalled();
  });
});
