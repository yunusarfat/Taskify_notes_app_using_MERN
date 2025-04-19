import API from "../api";
import React, { useState } from "react";
import "../styles/Login.css"; // Importing the CSS
import { Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    window.location = "/todos";
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        placeholder="Type your Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Type your Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account?
        <Link to="/register"> Register</Link>
      </p>
    </form>
  );
}

export default Login;
