import { makeAutoObservable, runInAction } from 'mobx';
import { notification } from 'antd';

class AuthStore {
  isLoading = false;
  isAuthenticated = false;
  userData = null;

  constructor() {
    makeAutoObservable(this);
  }

  async signIn(username, password) {
    this.isLoading = true;

    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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

  async signUp(username, password, confirmPassword) {
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
        body: JSON.stringify({ username, password }),
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

  async completeProfile(username, fullName, avatar) {
    this.isLoading = true;

    try {
      const response = await fetch('http://localhost:3000/auth/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ username, fullName, avatar }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error completing profile');
      }

      const data = await response.json();
      notification.success({
        message: 'Profile Updated',
        description: 'Your profile has been successfully updated!',
      });

      runInAction(() => {
        this.userData = data; // Assuming the API returns user data
      });
    } catch (error) {
      notification.error({
        message: 'Profile Update Failed',
        description: error.message || 'Error updating profile',
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async resetPassword(email) {
    this.isLoading = true;

    try {
      const response = await fetch('http://localhost:3000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error resetting password');
      }

      const data = await response.json();
      notification.success({
        message: 'Password Reset',
        description: data.message || 'Password reset instructions have been sent to your email.',
      });
    } catch (error) {
      notification.error({
        message: 'Password Reset Failed ',
        description: error.message || 'Error resetting password',
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