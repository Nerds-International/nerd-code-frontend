import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignUpForm from "./SignUpForm";
import { authStore } from "../../store/AuthStore";

// Mock `authStore`
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
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

describe("SignUpForm Component", () => {
    beforeEach(() => {
        // Reset isLoading to false before each test to avoid interference
        authStore.isLoading = false;
    });

    test("renders form elements and static text", () => {
        render(<SignUpForm toggleForm={jest.fn()} onComplete={jest.fn()} />);

        expect(screen.getByText("Join NerdCode")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
        expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    });

    test("calls toggleForm when 'Log in' link is clicked", () => {
        const toggleForm = jest.fn();
        render(<SignUpForm toggleForm={toggleForm} onComplete={jest.fn()} />);

        fireEvent.click(screen.getByText("Log in"));
        expect(toggleForm).toHaveBeenCalled();
    });
});
