"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setTasks(data.tasks || []);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });

    const data = await res.json();
    setTasks([data, ...tasks]);
    setTitle("");
  };

  const toggleTask = async (id: number) => {
    await fetch(`http://localhost:5000/tasks/${id}/toggle`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>
          <button
            onClick={logout}
            className="px-4 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="px-5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-center text-slate-500 text-sm">
              No tasks yet. Add your first task 👆
            </p>
          )}

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between px-4 py-3 border rounded-lg bg-slate-50 hover:bg-slate-100 transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span
                  className={`text-sm ${
                    task.completed
                      ? "line-through text-slate-400"
                      : "text-slate-800"
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 text-lg"
                title="Delete task"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
