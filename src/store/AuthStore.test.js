import "@testing-library/jest-dom";
import { authStore } from "./AuthStore";

global.console = {
  log: jest.fn(),
  error: jest.fn(),
};

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

  test("signIn shows error log on failed login", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Login failed" }),
      })
    );

    await authStore.signIn("testUser", "testPassword");

    expect(authStore.isAuthenticated).toBe(false);
  });

  test("signUp sets isAuthenticated to true on successful registration", async () => {
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

    await authStore.signUp("newUser", "password123", "password123");

    expect(authStore.isAuthenticated).toBe(true);
    expect(localStorage.getItem("accessToken")).toBe("access-token");
    expect(localStorage.getItem("uuid")).toBe("user-uuid");
  });

  test("signUp shows error log if passwords do not match", async () => {
    await authStore.signUp("newUser", "password123", "differentPassword");

    expect(authStore.isAuthenticated).toBe(false);
  });

  test("signUp shows error log on failed registration", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Registration failed" }),
      })
    );

    await authStore.signUp("newUser", "password123", "password123");

    expect(authStore.isAuthenticated).toBe(false);
  });
});
