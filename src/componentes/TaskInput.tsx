import { useState } from "react";
import "./TaskInput.css";

type TaskInputProps = {
  onAddTask: (text: string) => void;
};

function TaskInput({ onAddTask }: TaskInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      onAddTask(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Agregar nueva tarea"
      />
      <button onClick={handleAddTask}>Agregar tarea</button>
    </div>
  );
}

export default TaskInput;