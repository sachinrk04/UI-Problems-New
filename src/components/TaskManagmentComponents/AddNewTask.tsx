import { useCallback, useState } from "react";
import type { Task } from "@/pages/UIProblems/TaskManagmentII";

interface AddNewTaskProps {
  addNewTask: (data: Task) => void;
}

interface TaskFormState {
  title: string;
  description: string;
}

const AddNewTask = ({ addNewTask }: AddNewTaskProps) => {
  const [form, setForm] = useState<TaskFormState>({
    title: "",
    description: "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const title = form.title.trim();
      const description = form.description.trim();

      if (!title) return;

      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: title,
        description: description,
        userId: `userId-${Date.now()}`,
        status: "TODO",
      };

      addNewTask(newTask);
      setForm({ title: "", description: "" });
    },
    [form, addNewTask]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg p-4 mb-4 space-y-3 bg-gray-100 rounded-sm"
    >
      <input
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        className="w-full px-3 py-2 text-sm border rounded"
      />
      <textarea
        value={form.description}
        onChange={handleChange}
        placeholder="Task description"
        className="w-full px-3 py-2 text-sm border rounded"
      />
      <button
        type="submit"
        disabled={!form.title.trim()}
        className="px-4 py-2 text-sm text-white rounded bg-primary disabled:opacity-50"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddNewTask;
