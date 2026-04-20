import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

type TaskListProps = {
    tasks: Task[];
    onToggleComplete: (id: number) => void;
    onDeleteTask: (id: number) => void;
};

function Tasklist({ tasks, onToggleComplete, onDeleteTask }: TaskListProps) {

    if (tasks.length === 0) {
        return <EmptyState />;
    }

    return (
        <ul className="task-list">
        {tasks.map((task) => (
            <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            />
        ))}
        </ul>
    );
}

export default Tasklist;