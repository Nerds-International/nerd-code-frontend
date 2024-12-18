import { makeAutoObservable, runInAction } from 'mobx';
import { notification } from 'antd';

class AuthStore {
  isLoading = false;
  isAuthenticated = false;
  userData = null;

  constructor() {
    makeAutoObservable(this);
  }

  async signIn(email, password) {
    this.isLoading = true;

    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in!',
      });

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('uuid', data.uuid);

      runInAction(() => {
        this.isAuthenticated = true;
      });
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: error.message || 'Error during login',
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async signUp(email, password, username, fullname, avatar_number, confirmPassword = null) {
    this.isLoading = true;

    if (password !== confirmPassword) {
      notification.error({
        message: 'Registration Failed',
        description: 'Passwords do not match!',
      });
      this.isLoading = false;
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, fullname, avatar_number }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error during registration');
      }

      const data = await response.json();

      notification.success({
        message: 'Registration Successful',
        description: 'You have successfully signed up!',
      });

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('uuid', data.uuid);

      runInAction(() => {
        this.isAuthenticated = true;
      });
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: error.message || 'Error during registration',
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async resetPassword(email, password) {
    this.isLoading = true;
  
    try {
      const response = await fetch('http://localhost:3000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error resetting password');
      }
  
      notification.success({
        message: 'Password Reset',
      });
    } catch (error) {
      notification.error({
        message: 'Password Reset Failed',
        description: error.message.trim(),
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  setAuthenticated(value) {
    this.isAuthenticated = value;
  }

  
}

export const authStore = new AuthStore();