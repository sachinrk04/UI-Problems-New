import { useState } from "react";

export type TaskStatus = "TODO" | "INPROGRESS" | "DONE";

interface Task {
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

const TaskManagment = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      userId: `userId-${Date.now()}`,
      status: "TODO",
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status: status } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-semibold">Task Managment</h1>

      <div className="max-w-lg p-4 mb-4 space-y-3 bg-gray-100 rounded-sm">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full px-3 py-2 text-sm border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="w-full px-3 py-2 text-sm border rounded"
        />
        <button
          onClick={addTask}
          disabled={title.trim().length === 0}
          className="px-4 py-2 text-sm text-white rounded bg-primary"
        >
          Add Task
        </button>
      </div>

      <div className="flex justify-around p-4 bg-gray-100 rounded-sm gap-x-4">
        {columns.map((column) => (
          <div
            key={column}
            className="w-full p-2 space-y-3 bg-gray-300 rounded-sm"
          >
            <h2 className="text-sm font-semibold">
              {column === "INPROGRESS" ? "IN PROGRESS" : column}
            </h2>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === column)
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-2 border rounded-sm bg-gray-50"
                  >
                    <h3 className="text-sm font-medium">{task.title}</h3>
                    <p className="mt-1 text-xs text-gray-600">
                      {task.description}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      User: {task.userId}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          moveTask(task.id, e.target.value as TaskStatus)
                        }
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
                ))}

              {tasks.filter((task) => task.status === column).length === 0 && (
                <div className="p-2 text-center border rounded-sm h-28 bg-gray-50">
                  <p className="text-xs text-gray-400 bg">No tasks</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagment;
