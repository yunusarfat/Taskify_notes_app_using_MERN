import API from "../api";
import React, { useEffect, useState } from "react";
import "../styles/TodoApp.css";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [username, setUsername] = useState(""); // NEW: for displaying user name

  const fetchTodos = async () => {
    const res = await API.get("/todo");
    setTodos(res.data);
  };



  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;
    await API.post("/todo", { title, text });
    setTitle("");
    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todo/${id}`);
    fetchTodos();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  useEffect(() => {
    fetchTodos();
   
  }, []);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>My Notes</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="todo-input"
        />
        <textarea
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="todo-textarea"
        />

        <button type="submit" className="add-btn">
          Add Note
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="empty-msg">No notes yet. Start writing!</p>
      ) : (
        <div className="cards-container">
          {todos.map((todo) => (
            <div key={todo._id} className="todo-card">
              <div className="card-header">
                <h3>{todo.title}</h3>
              </div>

              <p className="card-text">{todo.text}</p>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoApp;
