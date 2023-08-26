import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = getFromLocalStorage("token");

  const url = "http://localhost:5000/api/v1/auth/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { email, password });
      const token = response.data.token;
      saveToLocalStorage("token", token);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="account-container">
        <h4>task manager</h4>
        <h4>Log in to your account</h4>
        <p>
          Don't have an account?{" "}
          <span
            className="account-page-link"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
        <div>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email Address</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn submit-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
