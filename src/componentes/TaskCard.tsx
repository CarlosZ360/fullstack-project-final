import "./TaskCard.css";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskCardProps = {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
};

function TaskCard({ task, onToggleComplete, onDeleteTask }: TaskCardProps) {
  return (
    <li className="task-card">
      <span
        className={`task-text ${task.completed ? "completed" : ""}`}
        onClick={() => onToggleComplete(task.id)}
      >
        {task.text}
      </span>

      <button onClick={() => onDeleteTask(task.id)}>Eliminar</button>
    </li>
  );
}

export default TaskCard;