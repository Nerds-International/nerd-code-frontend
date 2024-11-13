import "@testing-library/jest-dom";
import { authStore } from "./AuthStore";
import { notification } from 'antd';

global.console = {
  log: jest.fn(),
  error: jest.fn(),
};

jest.mock('antd', () => ({
  notification: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("AuthStore", () => {
  beforeEach(() => {
    authStore.isLoading = false;
    authStore.isAuthenticated = false;
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("signIn sets isAuthenticated to true on successful login", async () => {
    const mockResponse = {
      accessToken: "access-token",
      refreshToken: "refresh-token",
      uuid: "user-uuid",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    await authStore.signIn("testUser", "testPassword");

    expect(authStore.isAuthenticated).toBe(true);
    expect(localStorage.getItem("accessToken")).toBe("access-token");
    expect(localStorage.getItem("refreshToken")).toBe("refresh-token");
    expect(localStorage.getItem("uuid")).toBe("user-uuid");
  });

  test("signIn shows error notification on failed login", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Login failed" }),
      })
    );

    await authStore.signIn("testUser", "testPassword");

    expect(authStore.isAuthenticated).toBe(false);
    expect(notification.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Login Failed",
        description: "Login failed",
      })
    );
  });

  test("signUp shows error notification if passwords do not match", async () => {
    await authStore.signUp("newUser", "password123", "username", "fullname", 1, "differentPassword");

    expect(authStore.isAuthenticated).toBe(false);
    expect(notification.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Registration Failed",
        description: "Passwords do not match!",
      })
    );
  });

  test("signUp sets isLoading to true during registration", async () => {
    const mockResponse = {
      accessToken: "access-token",
      uuid: "user-uuid",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const signUpPromise = authStore.signUp("newUser", "password123", "newUser", "fullname", 1, "password123");

    // Check if isLoading is true after calling signUp
    expect(authStore.isLoading).toBe(true);
    
    await signUpPromise;

    expect(authStore.isAuthenticated).toBe(true);
    expect(authStore.isLoading).toBe(false);
  });

  test("signUp shows success notification on successful registration", async () => {
    const mockResponse = {
      accessToken: "access-token",
      uuid: "user-uuid",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    await authStore.signUp("newUser", "password123", "newUser", "fullname", 1, "password123");

    expect(notification.success).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Registration Successful",
        description: "You have successfully signed up!",
      })
    );
  });

  test("resetPassword shows success notification on successful reset", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    await authStore.resetPassword("test@example.com", "newPassword");

    expect(notification.success).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Password Reset",
      })
    );
  });

  test("resetPassword shows error notification on failed reset", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Error resetting password" }),
      })
    );

    await authStore.resetPassword("test@example.com", "newPassword");

    expect(notification.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Password Reset Failed",
        description: "Error resetting password",
      })
    );
  });
});
