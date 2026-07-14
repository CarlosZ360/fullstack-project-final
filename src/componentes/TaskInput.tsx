import React, { useState } from "react";

type TaskInputProps = {
  onAddTask: (text: string) => void;
};

function TaskInput({ onAddTask }: TaskInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    // Si contiene texto válido, lo limpia y añade
    if (inputValue.trim() !== "") {
      onAddTask(inputValue.trim()); // Se envía el texto limpio sin espacios sobrantes
    }
    // Solución al BUG: Siempre reseteamos el input, previniendo espacios residuales
    setInputValue("");
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