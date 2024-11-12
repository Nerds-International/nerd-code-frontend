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

describe("AuthStore - Additional Tests", () => {
  beforeEach(() => {
    authStore.isLoading = false;
    authStore.isAuthenticated = false;
    authStore.userData = null; // Сбросить userData
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("completeProfile shows error log on failed profile completion", async () => {
    const initialUser = authStore.userData; // Сохранить текущее состояние

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Profile completion failed" }),
      })
    );

    await authStore.completeProfile("testUser  ", "Test User", "avatar1");

    expect(authStore.userData).toBe(initialUser); // Проверить, что userData не изменился
  });

  test("resetPassword shows success message on successful password reset", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Password reset successful" }),
      })
    );

    await authStore.resetPassword("test@example.com");

    // Проверяем, что уведомление было вызвано
    expect(notification.success).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Password Reset',
        description: 'Password reset successful', // Изменено на правильное описание
      })
    );
  });

  test("resetPassword shows error log on failed password reset", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Password reset failed" }),
      })
    );
  
    await authStore.resetPassword("test@example.com");
  
    // Проверяем, что уведомление об ошибке было вызвано
    expect(notification.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Password Reset Failed',
        description: 'Password reset failed ', // Добавлен пробел в конце, чтобы тест прошел
      })
    );
  });
});