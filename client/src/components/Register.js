import React, { useState } from "react";
import API from "../api";
import '../styles/Register.css';

 // Importing the CSS file

function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", data);
    const res = await API.post('/auth/register', data);
    localStorage.setItem('token', res.data.token);
    window.location = '/todos';
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
