// src/App.js
import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // which task is being edited
  const [editValue, setEditValue] = useState(""); // edited text

  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const saveEdit = (index) => {
    if (editValue.trim() === "") return;
    const updatedTodos = [...todos];
    updatedTodos[index].text = editValue;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>✨ To-Do List</h2>

        {/* Input for adding tasks */}
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            style={styles.input}
          />
          <button onClick={addTodo} style={styles.addBtn}>
            Add
          </button>
        </div>

        {/* Task List */}
        <ul style={styles.list}>
          {todos.map((todo, index) => (
            <li key={index} style={styles.listItem}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={styles.editInput}
                  />
                  <button onClick={() => saveEdit(index)} style={styles.saveBtn}>
                    💾
                  </button>
                </>
              ) : (
                <>
                  <span
                    onClick={() => toggleComplete(index)}
                    style={{
                      ...styles.taskText,
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "gray" : "black",
                    }}
                  >
                    {todo.text}
                  </span>
                  <div style={styles.btnGroup}>
                    <button
                      onClick={() => startEditing(index)}
                      style={styles.editBtn}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => removeTodo(index)}
                      style={styles.deleteBtn}
                    >
                      ❌
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "1.5rem",
    wordWrap: "break-word",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    minWidth: "180px",
    fontSize: "1rem",
  },
  addBtn: {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "none",
    background: "#4cafef",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    flexShrink: 0,
    fontSize: "1rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f9f9f9",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    flexWrap: "wrap",
  },
  taskText: {
    flex: 1,
    textAlign: "left",
    wordBreak: "break-word",
    fontSize: "1rem",
    cursor: "pointer",
  },
  btnGroup: {
    display: "flex",
    gap: "8px",
  },
  editBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
  },
  deleteBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
  },
  editInput: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  saveBtn: {
    marginLeft: "10px",
    border: "none",
    background: "#4cafef",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default App;
