import React, { useState } from "react";

const columns = ["TODO", "INPROGRESS", "DONE"];

const initialTasks = [
  {
    id: `task-${Date.now()}`,
    title: "Task 1",
    userId: `userId-${Date.now()}`,
    description: "Sort out recyclable and waste as needed",
    status: "TODO",
  },
  {
    id: "task-2",
    title: "Task 2",
    userId: "userId-2",
    description: "Complete the report for management",
    status: "INPROGRESS",
  },
];

const TaskManagmentIII = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    const payload = {
      id: `taskId-${Date.now()}`,
      title: title.trim(),
      userId: `userId-${Date.now()}`,
      description: description.trim(),
      status: "TODO",
    };

    setTasks((prev) => {
      return [...prev, payload];
    });

    setTitle("");
    setDescription("");
  };

  const onDragStart = (taskId: string) => {
    setDraggingTaskId(taskId);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (status: string) => {
    if (!draggingTaskId) return;

    setTasks((prev) => {
      return prev.map((task) => {
        return task.id === draggingTaskId ? { ...task, status } : task;
      });
    });

    setDraggingTaskId(null);
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-xl font-semibold">Native Drag & Drop Kanban</h1>
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
            onDragOver={onDragOver}
            onDrop={() => onDrop(column)}
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
                    draggable
                    onDragStart={() => onDragStart(task.id)}
                    className="p-2 border rounded-sm bg-gray-50"
                  >
                    <h3 className="text-sm font-medium">{task.title}</h3>
                    <p className="mt-1 text-xs text-gray-600">
                      {task.description}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      User: {task.userId}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagmentIII;
