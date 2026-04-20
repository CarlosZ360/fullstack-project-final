import { useEffect, useState } from "react";
import Header from "./componentes/Header";
import TaskInput from "./componentes/TaskInput";
import Tasklist from "./componentes/Tasklist";
import Footer from "./componentes/Footer";
const API_URL = import.meta.env.VITE_API_URL;

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  // Conexión al backend
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  } , []);

  const addTask = (text: string) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };

    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(data => {
      setTasks([...tasks, data]);
    })
    .catch(error => {
      console.error("Error adding task:", error);
    });
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting task");
      }

      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: task.text,
          completed: !task.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating task");
      }

      const updatedTask = await response.json();

      setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app-container">
      <Header />
      <TaskInput onAddTask={addTask} />
      <Tasklist
        tasks={tasks}
        onToggleComplete={toggleComplete}
        onDeleteTask={deleteTask}
      />
      <Footer total={tasks.length} completed={completedCount} />
    </div>
  );
}

export default App;