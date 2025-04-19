import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<TodoApp />} />
      </Routes>
    </Router>
  );
}

export default App;
