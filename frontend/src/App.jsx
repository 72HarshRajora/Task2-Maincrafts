import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // Fetch tasks
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.log(err));
  }, []);

  // Delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(err => console.log(err));
  };

  // Add task
  const addTask = () => {
    if (!text) return alert("Task cannot be empty");

    fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    })
      .then(res => res.json())
      .then(data => {
        setTasks([...tasks, data]);
        setText("");
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MERN To-Do App</h1>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.text}
            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "10px", color: "red" }}
            > Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;