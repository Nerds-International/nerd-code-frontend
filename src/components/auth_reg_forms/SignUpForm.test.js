import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignUpForm from "./SignUpForm";
import { authStore } from "../../store/auth/AuthStore";

jest.mock("../../store/auth/AuthStore", () => ({
  authStore: {
    isLoading: false,
  },
}));

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

describe("SignUpForm Component", () => {
  beforeEach(() => {
    authStore.isLoading = false;
  });

  test("renders form elements and static text", () => {
    render(<SignUpForm toggleForm={jest.fn()} onComplete={jest.fn()} />);

    expect(screen.getByText("Join NerdCode")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" })
    ).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });

  test("calls toggleForm when 'Log in' link is clicked", () => {
    const toggleForm = jest.fn();
    render(<SignUpForm toggleForm={toggleForm} onComplete={jest.fn()} />);

    fireEvent.click(screen.getByText("Log in"));
    expect(toggleForm).toHaveBeenCalled();
  });

  test("calls onComplete with email, password, and confirm password on successful submission", async () => {
    const onComplete = jest.fn();
    render(<SignUpForm toggleForm={jest.fn()} onComplete={onComplete} />);

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: "mypassword" },
    });
    fireEvent.input(screen.getByLabelText("Confirm Password"), {
      target: { value: "mypassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await (() => {
      expect(onComplete).toHaveBeenCalledWith(
        "newuser@example.com",
        "mypassword",
        "mypassword"
      );
    });
  });

  test("shows validation errors on empty form submission", async () => {
    render(<SignUpForm toggleForm={jest.fn()} onComplete={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(
      await screen.findByText("Please input your email!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please input your password!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please confirm your password!")
    ).toBeInTheDocument();
  });
});
