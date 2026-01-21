/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import AddNewTask from "@/components/TaskManagmentComponents/AddNewTask";
import TaskColumns from "@/components/TaskManagmentComponents/TaskColumns";

export type TaskStatus = "TODO" | "INPROGRESS" | "DONE";

export interface Task {
  id: string;
  title: string;
  userId: string;
  description: string;
  status: TaskStatus;
}

const columns: TaskStatus[] = ["TODO", "INPROGRESS", "DONE"];

const initialTasks: Task[] = [
  {
    id: `task-${Date.now()}`,
    title: "Task 1",
    userId: `userId-${Date.now()}`,
    description: "Sort out recyclable and waste as needed",
    status: "TODO",
  },
];

const TaskManagmentII = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addNewTask = useCallback((newTask: Task) => {
    setTasks([...tasks, newTask]);
  }, []);

  const moveTask = useCallback((id: string, status: TaskStatus) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status: status } : task))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-semibold">Task Managment - II</h1>

      <AddNewTask addNewTask={addNewTask} />

      <TaskColumns
        columns={columns}
        tasks={tasks}
        moveTask={moveTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TaskManagmentII;
