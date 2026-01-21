import { memo } from "react";
import type { Task, TaskStatus } from "@/pages/UIProblems/TaskManagmentII";

interface TaskCardProps {
  task: Task;
  moveTask: (id: string, value: TaskStatus) => void;
  deleteTask: (id: string) => void;
}

const TaskCard = ({ task, moveTask, deleteTask }: TaskCardProps) => {
  return (
    <div key={task.id} className="p-2 border rounded-sm bg-gray-50">
      <h3 className="text-sm font-medium">{task.title}</h3>
      <p className="mt-1 text-xs text-gray-600">{task.description}</p>
      <p className="text-[10px] text-gray-400 mt-1">User: {task.userId}</p>
      <div className="flex items-center justify-between mt-3">
        <select
          value={task.status}
          onChange={(e) => moveTask(task.id, e.target.value as TaskStatus)}
          className="px-2 py-1 text-xs border rounded-sm"
        >
          <option value="TODO">TODO</option>
          <option value="INPROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-xs text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default memo(TaskCard);
