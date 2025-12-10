import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../tasksSlice";
import { v4 as uuidv4 } from "uuid";

export default function TaskEditor() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const id = uuidv4();
    const now = new Date().toISOString();
    const task = {
      id,
      title: title.trim(),
      description: "",
      completed: false,
      priority,
      categories: category ? [category] : [],
      order: 0,
      createdAt: now,
      updatedAt: now,
    };
    dispatch(addTask(task));
    setTitle("");
    setCategory("");
    setPriority("medium");
  }

  return (
    <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2">
      <input
        className="flex-1 p-2 border rounded"
        placeholder="Add new task (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="p-2 border rounded w-36"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <select
        className="p-2 border rounded w-32"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}
