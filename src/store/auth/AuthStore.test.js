import "@testing-library/jest-dom";
import { authStore } from "./AuthStore";
import { notification } from "antd";
import Cookies from "js-cookie";

global.console = {
  log: jest.fn(),
  error: jest.fn(),
};

jest.mock("antd", () => ({
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
    await authStore.signUp(
      "newUser",
      "password123",
      "username",
      "fullname",
      1,
      "differentPassword"
    );

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

    const signUpPromise = authStore.signUp(
      "newUser",
      "password123",
      "newUser",
      "fullname",
      1,
      "password123"
    );

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

    await authStore.signUp(
      "newUser",
      "password123",
      "newUser",
      "fullname",
      1,
      "password123"
    );

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

  test("signOut clears cookies, localStorage, and resets authentication state", () => {
    Cookies.set("id", "user-id");
    Cookies.set("accessToken", "access-token");
    Cookies.set("refreshToken", "refresh-token");
    Cookies.set("username", "test-user");
    Cookies.set("fullname", "Test User");
    Cookies.set("avatar_number", "1");

    localStorage.setItem("accessToken", "access-token");
    localStorage.setItem("refreshToken", "refresh-token");
    localStorage.setItem("uuid", "user-uuid");
    localStorage.setItem("username", "test-user");
    localStorage.setItem("fullname", "Test User");
    localStorage.setItem("avatar_number", "1");

    authStore.signOut();

    expect(Cookies.get("id")).toBeUndefined();
    expect(Cookies.get("accessToken")).toBeUndefined();
    expect(Cookies.get("refreshToken")).toBeUndefined();
    expect(Cookies.get("username")).toBeUndefined();
    expect(Cookies.get("fullname")).toBeUndefined();
    expect(Cookies.get("avatar_number")).toBeUndefined();

    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(localStorage.getItem("refreshToken")).toBeNull();
    expect(localStorage.getItem("uuid")).toBeNull();
    expect(localStorage.getItem("username")).toBeNull();
    expect(localStorage.getItem("fullname")).toBeNull();
    expect(localStorage.getItem("avatar_number")).toBeNull();

    expect(authStore.isAuthenticated).toBe(false);
    expect(authStore.userData).toBeNull();
  });

  test("initializeAuth shows error and calls signOut on failed user fetch", async () => {
    const mockGetUser = jest
        .spyOn(authStore, "getUser")
        .mockRejectedValueOnce(new Error("Failed to fetch user"));

    const mockSignOut = jest.spyOn(authStore, "signOut");

    Cookies.set("accessToken", "invalid-access-token");
    Cookies.set("id", "invalid-user-id");

    await authStore.initializeAuth();

    expect(mockGetUser).toHaveBeenCalledWith("invalid-user-id", "invalid-access-token");
    expect(notification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Failed to initialize authentication",
          description: "Failed to fetch user",
        })
    );
    expect(mockSignOut).toHaveBeenCalled();

    mockGetUser.mockRestore();
    mockSignOut.mockRestore();
  });

  test("initializeAuth sets user data, cookies, and localStorage on successful user fetch", async () => {
    const mockUserData = {
      username: "test-user",
      fullname: "Test User",
      avatar_number: 1,
    };

    jest.spyOn(authStore, "getUser").mockResolvedValueOnce(mockUserData);

    Cookies.set("accessToken", "valid-access-token");
    Cookies.set("id", "valid-user-id");

    await authStore.initializeAuth();

    expect(authStore.isAuthenticated).toBe(true);
    expect(authStore.userInfo).toEqual(mockUserData);

    expect(Cookies.get("username")).toBe(mockUserData.username);
    expect(Cookies.get("fullname")).toBe(mockUserData.fullname);
    expect(Cookies.get("avatar_number")).toBe(String(mockUserData.avatar_number));

    expect(localStorage.getItem("username")).toBe(mockUserData.username);
    expect(localStorage.getItem("fullname")).toBe(mockUserData.fullname);
    expect(localStorage.getItem("avatar_number")).toBe(String(mockUserData.avatar_number));
  });

  test("getUser shows error notification and rethrows the error on failure", async () => {
    const mockError = new Error("User not found");

    global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ message: mockError.message }),
        })
    );

    await expect(authStore.getUser("invalid-id", "invalid-access-token")).rejects.toThrow(
        "User not found"
    );

    expect(notification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Attempting to get a user failed",
          description: "User not found",
        })
    );

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/auth/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        id: "invalid-id",
        accessToken: "invalid-access-token",
      },
    });
  });
});
