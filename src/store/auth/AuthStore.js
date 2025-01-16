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

    console.log("uath init")
    const accessToken =
      Cookies.get("accessToken") || localStorage.getItem("accessToken");
    const id = Cookies.get("id") || localStorage.getItem("id");

    console.log(accessToken)
    console.log(id)
    if (accessToken && id) {

      console.log("auth success")
      this.getUser(id, accessToken)
        .then((userData) => {
          runInAction(() => {

            console.log("get user req")
            this.isAuthenticated = true;
            this.userInfo = userData;
            console.log(this.userInfo)


            console.log("username save")
            Cookies.set("username", userData.username, { expires: 52 });
            console.log("fullname save")
            Cookies.set("fullname", userData.fullname, { expires: 52 });
            console.log("avatar save")
            Cookies.set("avatar_number", userData.avatar_number, { expires: 52 });

          });
        })
        .catch((error) => {
          console.log("auth faailre")
          this.signOut();
        });
    }
  }

  async signIn(email, password) {
    this.isLoading = true;

    console.log("Sign In req")
    fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        
        console.log("SignIn resp")
        if (!response.ok) {

          console.log("Sign in Failure")
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Login failed");
          });
        }
        return response.json();
      })
      .then((data) => this.getUser(data.id, data.accessToken))
      .then((userData) => {
        console.log("Sign in success")

        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in!",
        });


        console.log("Sign in save id")
        Cookies.set("id", userData.id, { expires: 52 });
        console.log("Sign in save accessToken")
        Cookies.set("accessToken", userData.accessToken, { expires: 52 });
        console.log("Sign in save refreshToken")
        Cookies.set("refreshToken", userData.refreshToken, { expires: 52 });


        runInAction(() => {
          this.isAuthenticated = true;
          this.userData = userData;
          this.userInfo = userData;


          console.log(this.userData)
          console.log(this.userInfo)
        });
      })
      .catch((error) => {

        console.log("Sign in fail")
        notification.error({
          message: "Login Failed",
          description: error.message || "Error during login",
        });
      })
      .finally(() => {

        console.log("Sign in final")
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  async signUp(
    email,
    password,
    username,
    fullname,
    avatar_number,
    confirmPassword = null
  ) {
    this.isLoading = true;


    console.log(confirmPassword)
    if (password !== confirmPassword) {

      console.log("password match failre")
      notification.error({
        message: "Registration Failed",
        description: "Passwords do not match!",
      });
      this.isLoading = false;
      return;
    }


    console.log("sign up start req")
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
      .then(async (response) => {

        console.log(JSON.stringify(response))
        if (!response.ok) {
          console.log("resp ok")
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Error during registration");
          });
        }
        return response.json();
      })
      .then((data) => this.getUser(data.id, data.accessToken))
      .then((userData) => {

        console.log("sign up success")
        notification.success({
          message: "Registration Successful",
          description: "You have successfully signed up!",
        });


        console.log("id save")
        Cookies.set("id", userData.id, { expires: 52 });
        console.log("accessToken save")
        Cookies.set("accessToken", userData.accessToken, { expires: 52 });

        runInAction(() => {
          this.isAuthenticated = true;
          this.userData = userData;
          this.userInfo = userData;
        });
      })
      .catch((error) => {

        console.log("signup fail")
        notification.error({
          message: "Registration Failed",
          description: error.message || "Error during registration",
        });
      })
      .finally(() => {

        console.log("sign up end")
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  resetPassword(email, password) {
    this.isLoading = true;


    console.log("reset pass")
    fetch("http://localhost:3000/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {

        console.log(JSON.stringify(response))
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Error resetting password");
          });
        }

        console.log("successs")
        notification.success({
          message: "Password Reset",
        });
      })
      .catch((error) => {

        console.log("reset fail")
        notification.error({
          message: "Password Reset Failed",
          description: error.message.trim(),
        });
      })
      .finally(() => {

        console.log("reset end")
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  async getUser(id, accessToken) {
    this.isLoading = true;

    console.log("get user start")
    console.log(id)
    console.log(accessToken)
    return await fetch("http://localhost:3000/auth/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        id: id,
        accessToken: accessToken,
      },
    })
      .then( async (response) => {

        console.log(JSON.stringify(response))
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(
              errorData.message || "Error during attempt to get a user"
            );
          });
        }
        return response.json();
      })
      .catch((error) => {
        console.log("get user fail")
      })
      .finally(() => {

        console.log("get user end")
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  setAuthenticated(value) {
    this.isAuthenticated = value;
  }


  signOut() {

    console.log("id del")
    Cookies.remove("id");
    console.log("accessToken del")
    Cookies.remove("accessToken");
    console.log("refreshToken del")
    Cookies.remove("refreshToken");
    console.log("username del")
    Cookies.remove("username");
    console.log("fullname del")
    Cookies.remove("fullname");
    console.log("avatar number del")
    Cookies.remove("avatar_number");
    this.isAuthenticated = false;
    this.userData = null;
  }
}

export const authStore = new AuthStore();
