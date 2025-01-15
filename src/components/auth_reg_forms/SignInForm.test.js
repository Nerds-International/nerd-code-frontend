import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignInForm from "./SignInForm";
import { authStore } from "../../store/auth/AuthStore";

// Мокаем authStore
jest.mock("../../store/auth/AuthStore", () => ({
  authStore: {
    isLoading: false,
    signIn: jest.fn(() => Promise.resolve()), // Успешный вход
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

describe("SignInForm Component", () => {
  beforeEach(() => {
    authStore.signIn.mockClear();
    authStore.isLoading = false;
  });

  test("calls authStore.signIn and onClose when form is submitted", async () => {
    const onClose = jest.fn();
    render(
        <SignInForm
            toggleToSignUp={jest.fn()}
            onForgotPassword={jest.fn()}
            onClose={onClose}
        />
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Log In" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(authStore.signIn).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
    );
    expect(onClose).toHaveBeenCalled();
  });

  test("prevents default behavior and redirects to GitHub auth on 'Sign in with GitHub' click", () => {
    delete window.location;
    window.location = { assign: jest.fn() };

    render(
        <SignInForm
            toggleToSignUp={jest.fn()}
            onForgotPassword={jest.fn()}
            onClose={jest.fn()}
        />
    );

    const githubButton = screen.getByRole("button", {
      name: "Sign in with GitHub",
    });

    fireEvent.click(githubButton);

    expect(window.location.assign).toHaveBeenCalledWith(
        "http://localhost:3000/auth/github"
    );
  });
});

