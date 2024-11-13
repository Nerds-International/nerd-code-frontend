import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ForgotPasswordForm from "./ForgotPasswordForm";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("ForgotPasswordForm Component", () => {
  test("renders form elements", () => {
    render(<ForgotPasswordForm onCancel={jest.fn()} />);

    expect(screen.getByText("Reset Password", { selector: "h2" })).toBeInTheDocument();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();

    expect(screen.getByLabelText("New password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your new password")).toBeInTheDocument(); // Обновлено на "Your new password"

    expect(screen.getByRole("button", { name: "Reset Password" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  test("calls onCancel when 'Cancel' button is clicked", () => {
    const onCancel = jest.fn();
    render(<ForgotPasswordForm onCancel={onCancel} />);

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalled();
  });
});