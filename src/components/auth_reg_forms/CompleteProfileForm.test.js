import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CompleteProfileForm from "./CompleteProfileForm"; // Исправлено имя файла

jest.mock('../../store/auth/AuthStore', () => ({
    authStore: {
        signUp: jest.fn().mockResolvedValue(Promise.resolve()),
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
    const mockUser   = { 
        email: "test@example.com", 
        password: "password123", 
        confirmPassword: "password123" // Убедитесь, что пароли совпадают
    };
    const mockBackToSignIn = jest.fn();

    test("renders form elements and text", () => {
        render(<CompleteProfileForm userData={mockUser } backToSignIn={mockBackToSignIn} />);

        expect(screen.getByText("Complete Your Profile")).toBeInTheDocument();
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
    });

    test("shows validation messages when fields are empty", async () => {
        render(<CompleteProfileForm userData={mockUser } backToSignIn={mockBackToSignIn} />);

        fireEvent.click(screen.getByRole("button", { name: "Create account" }));

        expect(await screen.findByText(/Please input your username!/i)).toBeInTheDocument();
        expect(await screen.findByText(/Please input your full name!/i)).toBeInTheDocument();
        expect(await screen.findByText(/Please choose an avatar!/i)).toBeInTheDocument();
    });
});