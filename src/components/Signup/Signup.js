import React, { useEffect } from "react";
import { toast } from "react-toastify";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import useAuthHooks from "../hooks/useAuthHooks";

import useUsernamehooks from "../hooks/useUsernamehooks";
import useIsEmailHooks from "../hooks/useIsEmailHooks";
import usePasswordHook from "../hooks/usePasswordHook";
import AxiosAuth from "../Axios/Axios";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [, , checkToken] = useAuthHooks();

  useEffect(() => {
    if (checkToken()) {
      navigate("/movie");
    }
  }, []);

  const [
    username,
    setUsername,
    usernameError,
    setUsernameOnBlur,
    setUsernameOnFocus,
  ] = useUsernamehooks();

  const [email, setEmail, emailError, setEmailOnBlur, setEmailOnFocus] =
    useIsEmailHooks();

  const [
    password,
    setPassword,
    passwordError,
    setPasswordOnBlur,
    setPasswordOnFocus,
  ] = usePasswordHook();

  async function handleOnSubmit(e) {
    e.preventDefault();

    if (usernameError || passwordError || emailError) {
      toast.error("Please fill out the form correctly");
      return;
    }

    try {
      await AxiosAuth.post("/api/user/create-user", {
        username,
        password,
        email,
      });

      toast.success("Congrats! Now please go login!");

      setPassword("");
      setPasswordOnFocus(false);
      setPasswordOnBlur(false);

      setUsername("");
      setUsernameOnFocus(false);
      setUsernameOnBlur(false);

      setEmail("");
      setEmailOnFocus(false);
      setEmailOnBlur(false);
    } catch (e) {
      toast.error(`${e.response.data.payload[0]}`);
    }
  }

  return (
    <form className="form-container" onSubmit={handleOnSubmit}>
      <div className="form-div">
        <h1>Sign up</h1>

        <div className="form-input">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setUsernameOnFocus(true)}
            onBlur={() => setUsernameOnBlur(true)}
            required
          />
          <div>
            <span className={`${usernameError ? "form-error" : undefined}`}>
              {usernameError &&
                "Username cannot have special characters e.g No ~!@#$%^&*()"}
            </span>
          </div>
        </div>

        <div className="form-input">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailOnFocus(true)}
            onBlur={() => setEmailOnBlur(true)}
            required
          />

          <div>
            <span className={`${emailError ? "form-error" : undefined}`}>
              {emailError && "Please enter a valid email address"}
            </span>
          </div>
        </div>

        <div className="form-input">
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordOnFocus(true)}
            onBlur={() => setPasswordOnBlur(true)}
            required
          />

          <div>
            <span className={`${passwordError ? "form-error" : undefined}`}>
              {passwordError &&
                "Password must be minimum 8 characters long. Must contain 1 uppercase, 1 lowercase, 1 special character and one number"}
            </span>
          </div>
        </div>

        <button>Submit</button>
      </div>
    </form>
  );
}

export default Signup;
