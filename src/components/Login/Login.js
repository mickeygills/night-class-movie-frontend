import React, { useState, useEffect } from "react";
import axios from "axios";
import AxiosAuth from "../Axios/Axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import { useNavigate } from "react-router-dom";

import useAuthHooks from "../hooks/useAuthHooks";

function Login({ setUser }) {
  const [, , checkToken] = useAuthHooks();

  useEffect(() => {
    if (checkToken()) {
      navigate("/movie");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      let payload = await AxiosAuth.post("/api/user/sign-in", {
        email,
        password,
      });

      const jwtToken = payload.data.payload;
      window.localStorage.setItem("jwtToken", jwtToken);

      const decodedToken = jwtDecode(jwtToken);

      setUser({ email: decodedToken.email, username: decodedToken.username });

      setEmail("");
      setPassword("");
      toast.success(`Congrats! You logged in!`);

      navigate("/movie");
    } catch (e) {
      toast.error(`${e.response.data.payload[0]}`);
    }
  }

  return (
    <form className="form-container" onSubmit={handleOnSubmit}>
      <div className="form-div">
        <h1>Login</h1>

        <div className="form-input">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-input">
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button>Submit</button>
      </div>
    </form>
  );
}

export default Login;
