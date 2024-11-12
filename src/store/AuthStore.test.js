import "@testing-library/jest-dom";
import { authStore } from "./AuthStore";
import { notification } from 'antd';

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

jest.mock('antd', () => ({
  notification: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("AuthStore - resetPassword", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Сбросить все моки перед каждым тестом
  });

  test("shows success message on successful password reset", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Password reset instructions have been sent to your email." }),
      })
    );

    await authStore.resetPassword("test@example.com");

    // Проверяем, что уведомление было вызвано с правильными параметрами
    expect(notification.success).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Password Reset',
        description: 'Password reset instructions have been sent to your email.',
      })
    );
  });

  test("shows error log on failed password reset", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Password reset failed" }),
      })
    );

    await authStore.resetPassword("test@example.com");

    // Проверяем, что уведомление об ошибке было вызвано с правильными параметрами
    expect(notification.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Password Reset Failed',
        description: 'Password reset failed',
      })
    );
  });

  test("calls fetch with correct parameters", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Password reset instructions have been sent to your email." }),
      })
    );

    await authStore.resetPassword("test@example.com");

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: "test@example.com" }),
    });
  });

  test("handles network errors gracefully", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    await authStore.resetPassword("test@example.com");

    // Проверяем, что уведомление об ошибке было вызвано с правильными параметрами
    expect(notification.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Password Reset Failed',
        description: 'Network error',
      })
    );
  });

  test("handles empty error message from server", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}), // Пустой объект без сообщения
      })
    );

    await authStore.resetPassword("test@example.com");

    // Проверяем, что уведомление об ошибке было вызвано с правильными параметрами
    expect(notification.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Password Reset Failed',
        description: 'Error resetting password', // Сообщение по умолчанию
      })
    );
  });
});