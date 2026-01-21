import { memo, useCallback } from "react";
import type { Task, TaskStatus } from "@/pages/UIProblems/TaskManagmentII";
import TaskCard from "./TaskCard";
import EmptyColumn from "./EmptyColumn";

interface TaskColumnsProps {
  columns: TaskStatus[];
  tasks: Task[];
  moveTask: (id: string, value: TaskStatus) => void;
  deleteTask: (id: string) => void;
}

const TaskColumns = ({
  columns,
  tasks,
  moveTask,
  deleteTask,
}: TaskColumnsProps) => {
    
  const tasksByStatus = useCallback((columnStatus: TaskStatus) => {
    return tasks.filter((task: Task) => task.status === columnStatus);
  }, [tasks]);

  return (
    <div className="flex justify-around p-4 bg-gray-100 rounded-sm gap-x-4">
      {columns.map((column) => {
        const columnTasks = tasksByStatus(column);

        return (
          <div
            key={column}
            className="w-full p-2 space-y-3 bg-gray-300 rounded-sm"
          >
            <h2 className="text-sm font-semibold">
              {column === "INPROGRESS" ? "IN PROGRESS" : column}
            </h2>
            <div className="space-y-3">
              {columnTasks.length === 0 ? (
                <EmptyColumn />
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    moveTask={moveTask}
                    deleteTask={deleteTask}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(TaskColumns);
