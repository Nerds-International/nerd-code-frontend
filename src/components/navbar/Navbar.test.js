import { render, screen } from "@testing-library/react";
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

describe("Navbar", () => {
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

    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
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
});
