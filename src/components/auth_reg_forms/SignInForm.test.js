import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignInForm from "./SignInForm";
import { authStore } from "../../store/auth/AuthStore";

jest.mock("../../store/auth/AuthStore", () => ({
    authStore: {
        isLoading: false,
    },
}));

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
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
        authStore.isLoading = false;
    });

    test("renders form elements and static text", () => {
        render(<SignInForm toggleToSignUp={jest.fn()} onForgotPassword={jest.fn()} />);

        expect(screen.getByText("Log In", { selector: "h2" })).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
        expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
        expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
        expect(screen.getByText("Forgot password?")).toBeInTheDocument();
    });

    test("calls toggleToSignUp when 'Sign Up' link is clicked", () => {
        const toggleToSignUp = jest.fn();
        render(<SignInForm toggleToSignUp={toggleToSignUp} onForgotPassword={jest.fn()} />);

        fireEvent.click(screen.getByText("Sign Up"));
        expect(toggleToSignUp).toHaveBeenCalled();
    });

    test("calls onForgotPassword when 'Forgot password?' link is clicked", () => {
        const onForgotPassword = jest.fn();
        render(<SignInForm toggleToSignUp={jest.fn()} onForgotPassword={onForgotPassword} />);

        fireEvent.click(screen.getByText("Forgot password?"));
        expect(onForgotPassword).toHaveBeenCalled();
    });

});
