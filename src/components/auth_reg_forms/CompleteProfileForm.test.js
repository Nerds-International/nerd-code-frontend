import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CompleteProfileForm from "./CompleteProfileForm";

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

describe("CompleteProfileForm Component", () => {
    test("renders form elements and text", () => {
        render(<CompleteProfileForm />);

        // Check for the form title
        expect(screen.getByText("Complete Your Profile", { selector: "h2" })).toBeInTheDocument();

        // Check for the Username label and input
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();

        // Check for the Full Name label and input
        expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Full name")).toBeInTheDocument();

        // Check for the Avatar dropdown
        expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Choose an avatar")).toBeInTheDocument();

        // Check for Terms of Service checkbox
        expect(screen.getByText("I have read and agree with the Terms of Service and Code of Conduct")).toBeInTheDocument();

        // Check for the Create account button
        expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
    });

    test("shows validation messages if required fields are missing", () => {
        render(<CompleteProfileForm />);

        fireEvent.click(screen.getByRole("button", { name: "Create account" }));

        // Check for validation messages
        expect(screen.getByText("Please input your username!")).toBeInTheDocument();
        expect(screen.getByText("Please input your full name!")).toBeInTheDocument();
        expect(screen.getByText("Please choose an avatar!")).toBeInTheDocument();
    });

    test("accepts input and submits form when all fields are filled", () => {
        render(<CompleteProfileForm />);

        // Fill in the Username and Full Name fields
        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
        fireEvent.change(screen.getByPlaceholderText("Full name"), { target: { value: "Test User" } });

        // Select an avatar
        fireEvent.mouseDown(screen.getByPlaceholderText("Choose an avatar"));
        fireEvent.click(screen.getByText("Avatar 1"));

        // Agree to Terms of Service
        fireEvent.click(screen.getByText("I have read and agree with the Terms of Service and Code of Conduct"));

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "Create account" }));

        // Add assertions here for the `onFinish` or submission behavior if needed
    });
});
