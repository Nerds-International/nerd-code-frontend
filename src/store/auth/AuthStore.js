import { makeAutoObservable, runInAction } from "mobx";
import { notification } from "antd";
import Cookies from "js-cookie";

class AuthStore {
  isLoading = false;
  isAuthenticated = false;
  userData = null;
  userInfo = null;

  constructor() {
    makeAutoObservable(this);
    this.initializeAuth();
  }

  initializeAuth() {
    const accessToken =
      Cookies.get("accessToken") || localStorage.getItem("accessToken");
    const id = Cookies.get("id") || localStorage.getItem("id");

    if (accessToken && id) {
      this.getUser(id, accessToken)
        .then((userData) => {
          runInAction(() => {
            this.isAuthenticated = true;
            this.userInfo = userData;

            Cookies.set("username", userData.username, { expires: 52 });
            Cookies.set("fullname", userData.fullname, { expires: 52 });
            Cookies.set("avatar_number", userData.avatar_number, { expires: 52 });

            localStorage.setItem("username", userData.username);
            localStorage.setItem("fullname", userData.fullname);
            localStorage.setItem("avatar_number", userData.avatar_number);
          });
        })
        .catch((error) => {
          notification.error({
            message: "Failed to initialize authentication",
            description: error.message || "Error during initialization",
          });
          this.signOut();
        });
    }
  }

  signIn(email, password) {
    this.isLoading = true;

    fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Login failed");
          });
        }
        return response.json();
      })
      .then((data) => this.getUser(data.id, data.accessToken))
      .then((userData) => {
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in!",
        });

        Cookies.set("id", data.id, { expires: 52 });
        Cookies.set("accessToken", data.accessToken, { expires: 52 });
        Cookies.set("refreshToken", data.refreshToken, { expires: 52 });

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("uuid", data.uuid);

        runInAction(() => {
          this.isAuthenticated = true;
          this.userData = data;
          this.userInfo = userData;
        });
      })
      .catch((error) => {
        notification.error({
          message: "Login Failed",
          description: error.message || "Error during login",
        });
      })
      .finally(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  signUp(
    email,
    password,
    username,
    fullname,
    avatar_number,
    confirmPassword = null
  ) {
    this.isLoading = true;

    if (password !== confirmPassword) {
      notification.error({
        message: "Registration Failed",
        description: "Passwords do not match!",
      });
      this.isLoading = false;
      return;
    }

    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        fullname,
        avatar_number,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Error during registration");
          });
        }
        return response.json();
      })
      .then((data) => this.getUser(data.id, data.accessToken))
      .then((userData) => {
        notification.success({
          message: "Registration Successful",
          description: "You have successfully signed up!",
        });

        Cookies.set("id", data.id, { expires: 52 });
        Cookies.set("accessToken", data.accessToken, { expires: 52 });

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("uuid", data.uuid);

        runInAction(() => {
          this.isAuthenticated = true;
          this.userData = data;
          this.userInfo = userData;
        });
      })
      .catch((error) => {
        notification.error({
          message: "Registration Failed",
          description: error.message || "Error during registration",
        });
      })
      .finally(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  async resetPassword(email, password) {
    this.isLoading = true;

    try {
      const response = await fetch(
        "http://localhost:3000/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error resetting password");
      }

      notification.success({
        message: "Password Reset",
      });
    } catch (error) {
      notification.error({
        message: "Password Reset Failed",
        description: error.message.trim(),
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async getUser(id, accessToken) {
    this.isLoading = true;
    try {
      const response = await fetch("http://localhost:3000/auth/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          id: id,
          accessToken: accessToken,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error during attempt to get a user"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      notification.error({
        message: "Attempting to get a user failed",
        description: error.message.trim(),
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  setAuthenticated(value) {
    this.isAuthenticated = value;
  }

  signOut() {
    Cookies.remove("id");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("username");
    Cookies.remove("fullname");
    Cookies.remove("avatar_number");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("uuid");
    localStorage.removeItem("username");
    localStorage.removeItem("fullname");
    localStorage.removeItem("avatar_number");
    this.isAuthenticated = false;
    this.userData = null;
  }
}

export const authStore = new AuthStore();
