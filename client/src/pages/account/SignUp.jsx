import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveToLocalStorage } from "../../utils";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const url = "http://localhost:5000/api/v1/auth/register";

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { name, email, password });
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
        <h4>Register a new account</h4>
        <p>
          Already have an account?{" "}
          <span
            className="account-page-link"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
        <div>
          <form onSubmit={handleRegister}>
            <label htmlFor="name">Name</label>
            <input
              required
              type="name"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
