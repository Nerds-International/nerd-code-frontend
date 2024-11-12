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

describe("AuthStore - Additional Tests", () => {
  beforeEach(() => {
    authStore.isLoading = false;
    authStore.isAuthenticated = false;
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("completeProfile sets user data on successful profile completion", async () => {
    const mockResponse = {
      username: "testUser ",
      fullName: "Test User",
      avatar: "avatar1",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    await authStore.completeProfile("testUser ", "Test User", "avatar1");

    expect(authStore.userData.username).toBe("testUser ");
    expect(authStore.userData.fullName).toBe("Test User");
    expect(authStore.userData.avatar).toBe("avatar1");
  });

  test("completeProfile shows error log on failed profile completion", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Profile completion failed" }),
      })
    );

    await authStore.completeProfile("testUser ", "Test User", "avatar1");

    expect(authStore.userData).toBeNull(); // или другое значение по умолчанию
  });

  test("resetPassword shows success message on successful password reset", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Password reset successful" }),
      })
    );

    const response = await authStore.resetPassword("test@example.com");

    expect(response.message).toBe("Password reset successful");
  });

  test("resetPassword shows error log on failed password reset", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Password reset failed" }),
      })
    );

    const response = await authStore.resetPassword("test@example.com");

    expect(response.message).toBe("Password reset failed");
  });
});
