import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ForgotPasswordForm from "./ForgotPasswordForm";

// Mock `window.matchMedia`
beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
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

describe("ForgotPasswordForm Component", () => {
    test("renders form elements", () => {
        render(<ForgotPasswordForm onCancel={jest.fn()} />);

        // Check for the form title
        expect(screen.getByText("Reset Password", { selector: "h2" })).toBeInTheDocument();

        // Check for the input label and placeholder
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();

        // Check for the Reset Password button specifically
        expect(screen.getByRole("button", { name: "Reset Password" })).toBeInTheDocument();
        // Check for the Cancel button
        expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    });

    test("calls onCancel when 'Cancel' button is clicked", () => {
        const onCancel = jest.fn();
        render(<ForgotPasswordForm onCancel={onCancel} />);

        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
        expect(onCancel).toHaveBeenCalled();
    });
});
