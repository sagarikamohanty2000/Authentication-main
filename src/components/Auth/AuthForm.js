import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setSignUp] = useState(false);
  const emailEntered = useRef();
  const passwordEntered = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setSignUp((prevState) => !prevState);
    const email = emailEntered.current.value;
    const password = passwordEntered.current.value;
    let url = "";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRV_pMlgg9YkB23h8BAghdxFtTTaHpd1M";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRV_pMlgg9YkB23h8BAghdxFtTTaHpd1M";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });
      setSignUp((prevState) => !prevState);
      const data = await response.json();
      if (!response.ok) {
        let errorMsg = "Authentication Failed";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        alert(errorMsg);
        throw new Error(errorMsg);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailEntered} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordEntered} />
        </div>
        <div className={classes.actions}>
          {!isSignup ? (
            <button type="submit">
              {isLogin ? "Log in" : "Create account"}
            </button>
          ) : (
            <p style={{ color: "white" }}>Sending request...</p>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
