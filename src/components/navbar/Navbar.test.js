import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import { authStore } from "../../store/auth/AuthStore";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../../store/auth/AuthStore", () => ({
  authStore: {
    isAuthenticated: false,
    userInfo: null,
    signOut: jest.fn(),
  },
}));

// Мокирование window.location.assign
const mockAssign = jest.fn();
delete window.location;
window.location = { assign: mockAssign };

describe("Navbar", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Устаревшее
        removeListener: jest.fn(), // Устаревшее
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    authStore.isAuthenticated = false;
    authStore.userInfo = null;
  });

  test("correct rendering", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText(/Problems/i)).toBeInTheDocument();
    expect(screen.getByText(/Discuss/i)).toBeInTheDocument();
    expect(screen.getByText(/Battle/i)).toBeInTheDocument();
  });

  test("shows login and signup links when not authenticated", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByRole("link", { name: /Log In/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sign Up/i })).toBeInTheDocument();
  });

  test("shows user info and logout link when authenticated", () => {
    authStore.isAuthenticated = true;
    authStore.userInfo = { username: "TestUser", avatar_number: 2 };

    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText(/TestUser/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Avatar/i)).toHaveAttribute(
      "src",
      "/img/avatar2.png"
    );
  });

  test("calls signOut and redirects to home on logout", () => {
    authStore.isAuthenticated = true;
    authStore.userInfo = { username: "TestUser", avatar_number: 2 };

    render(
      <Router>
        <Navbar />
      </Router>
    );

    fireEvent.click(screen.getByText(/Logout/i));
    expect(authStore.signOut).toHaveBeenCalled();
    expect(mockAssign).toHaveBeenCalledWith("localhost:3001/");
  });

  test("displays user avatar and username when authenticated", () => {
    authStore.isAuthenticated = true;
    authStore.userInfo = { username: "TestUser", avatar_number: 2 };

    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByAltText(/Avatar/i)).toHaveAttribute(
      "src",
      "/img/avatar2.png"
    );
    expect(screen.getByText(/TestUser/i)).toBeInTheDocument();
  });

  test("opens FormModalWindow when Log In is clicked", async () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    fireEvent.click(screen.getByRole("link", { name: /Log In/i }));

    // Проверяем, что модальное окно отобразилось
    await waitFor(() => {
      expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    });
  });

  test("opens FormModalWindow when Sign Up is clicked", async () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    fireEvent.click(screen.getByRole("link", { name: /Sign Up/i }));

    // Проверяем, что модальное окно отобразилось
    await waitFor(() => {
      expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    });
  });
});
