import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FormModalWindow from "./FormModalWindow";

jest.mock('./SignInForm', () => (props) => (
    <div>
        <h2>Sign In Form</h2>
        <button onClick={props.toggleToSignUp}>Go to Sign Up</button>
        <button onClick={props.onForgotPassword}>Forgot Password</button>
    </div>
));

jest.mock('./SignUpForm', () => (props) => (
    <div>
        <h2>Sign Up Form</h2>
        <button onClick={props.toggleForm}>Go to Sign In</button>
        <button onClick={props.onComplete}>Complete Profile</button>
    </div>
));

jest.mock('./ForgotPasswordForm', () => (props) => (
    <div>
        <h2>Forgot Password Form</h2>
        <button onClick={props.onCancel}>Back to Sign In</button>
    </div>
));

jest.mock('./CompeteProfileForm', () => (props) => (
    <div>
        <h2>Complete Profile Form</h2>
        <button onClick={props.backToSignIn}>Back to Sign In</button>
    </div>
));

describe("FormModalWindow Component", () => {
    const onCloseMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders Sign In form by default", () => {
        render(<FormModalWindow onClose={onCloseMock} isLogin={true} />);

        expect(screen.getByText("Sign In Form")).toBeInTheDocument();
        expect(screen.queryByText("Sign Up Form")).not.toBeInTheDocument();
    });

    test("switches to Sign Up form", () => {
        render(<FormModalWindow onClose={onCloseMock} isLogin={true} />);

        fireEvent.click(screen.getByText("Go to Sign Up"));

        expect(screen.getByText("Sign Up Form")).toBeInTheDocument();
        expect(screen.queryByText("Sign In Form")).not.toBeInTheDocument();
    });

    test("switches to Forgot Password form", () => {
        render(<FormModalWindow onClose={onCloseMock} isLogin={true} />);

        fireEvent.click(screen.getByText("Forgot Password"));

        expect(screen.getByText("Forgot Password Form")).toBeInTheDocument();
        expect(screen.queryByText("Sign In Form")).not.toBeInTheDocument();
    });

    test("switches back to Sign In form from Forgot Password", () => {
        render(<FormModalWindow onClose={onCloseMock} isLogin={true} />);

        fireEvent.click(screen.getByText("Forgot Password"));

        fireEvent.click(screen.getByText("Back to Sign In"));

        expect(screen.getByText("Sign In Form")).toBeInTheDocument();
    });

    test("calls onClose when close button is clicked", () => {
        render(<FormModalWindow onClose={onCloseMock} isLogin={true} />);

        fireEvent.click(screen.getByRole('button', { name: /close/i }));

        expect(onCloseMock).toHaveBeenCalled();
    });
});