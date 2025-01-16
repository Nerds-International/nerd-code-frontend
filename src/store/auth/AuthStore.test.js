import { authStore } from './AuthStore';
import { notification } from 'antd';
import Cookies from 'js-cookie';

// Mock external dependencies
jest.mock('antd', () => ({
  notification: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

global.fetch = jest.fn();

describe('AuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authStore.isLoading = false;
    authStore.isAuthenticated = false;
    authStore.userData = null;
    authStore.userInfo = null;
  });

  test('initializes authentication if tokens exist', async () => {
    Cookies.get.mockImplementation((key) => {
      if (key === 'accessToken') return 'testAccessToken';
      if (key === 'id') return 'testUserId';
      return null;
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ username: 'testUser', fullname: 'Test User', avatar_number: 1 }),
    });

    await authStore.initializeAuth();

    expect(authStore.isAuthenticated).toBe(false);
    expect(notification.success).not.toHaveBeenCalled();
    expect(notification.error).not.toHaveBeenCalled();
  });

  test('handles signIn success', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 'testUserId', accessToken: 'testAccessToken' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ username: 'testUser', fullname: 'Test User', avatar_number: 1 }),
      });

    await authStore.signIn('test@example.com', 'password');

    expect(authStore.isAuthenticated).toBe(false);
  });

  test('handles signIn failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: 'Invalid credentials' }),
    });

    await authStore.signIn('test@example.com', 'wrongpassword');

    expect(authStore.isAuthenticated).toBe(false);

  });

  test('handles signUp success', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 'testUserId', accessToken: 'testAccessToken' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ username: 'testUser', fullname: 'Test User', avatar_number: 1 }),
      });

    await authStore.signUp('test@example.com', 'password', 'testUser', 'Test User', 1, 'password');

    expect(authStore.isAuthenticated).toBe(false);
  });

  test('handles signUp password mismatch', async () => {
    await authStore.signUp('test@example.com', 'password', 'testUser', 'Test User', 1, 'wrongPassword');

    expect(authStore.isAuthenticated).toBe(false);
    expect(notification.error).toHaveBeenCalledWith({
      message: 'Registration Failed',
      description: 'Passwords do not match!',
    });
  });

  test('handles resetPassword success', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    await authStore.resetPassword('test@example.com', 'newPassword');

    expect(notification.success).toHaveBeenCalledWith({
      message: 'Password Reset',
    });
  });

  test('handles resetPassword failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: 'User not found' }),
    });

    await authStore.resetPassword('test@example.com', 'newPassword');


  });

  test('signOut clears cookies and resets state', () => {
    authStore.signOut();

    expect(Cookies.remove).toHaveBeenCalledWith('id');
    expect(Cookies.remove).toHaveBeenCalledWith('accessToken');
    expect(Cookies.remove).toHaveBeenCalledWith('refreshToken');
    expect(authStore.isAuthenticated).toBe(false);
    expect(authStore.userData).toBeNull();
  });
});
