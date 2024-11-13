import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CompleteProfileForm from "./CompeteProfileForm"; // Corrected import name

jest.mock('../../store/auth/AuthStore', () => ({
    authStore: {
        signUp: jest.fn().mockResolvedValue(Promise.resolve()), // Mock the signUp method to resolve
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

describe("CompleteProfileForm Component", () => {
    const mockUser  = { email: "test@example.com", password: "password123" };
    const mockBackToSignIn = jest.fn();

    test("renders form elements and text", () => {
        render(<CompleteProfileForm userData={mockUser } backToSignIn={mockBackToSignIn} />);

        expect(screen.getByText("Complete Your Profile")).toBeInTheDocument();
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
    });

    test("accepts input and submits form when all fields are filled", async () => {
        render(<CompleteProfileForm userData={mockUser } backToSignIn={mockBackToSignIn} />);

        fireEvent.change(screen.getByLabelText("Username"), { target: { value: "testuser" } });
        fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Test User" } });

        fireEvent.mouseDown(screen.getByLabelText("Avatar"));
        fireEvent.click(screen.getByText("Avatar 1"));

        // Check the checkbox for terms of service
        const checkbox = screen.getByLabelText(/i have read and agree with the terms of service and code of conduct/i);
        fireEvent.click(checkbox);

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: "Create account" }));

        // Wait for the backToSignIn function to be called
        await waitFor(() => {
            expect(mockBackToSignIn).toHaveBeenCalled();
        });

        // You can also check if the signUp method was called with the correct parameters
        // Import the authStore to check if signUp was called
        const { authStore } = require('../../store/auth/AuthStore');
        expect(authStore.signUp).toHaveBeenCalledWith(
            mockUser .email,
            mockUser .password,
            "testuser",
            "Test User",
            1
        );
    });
});