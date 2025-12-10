// src/features/tasks/components/TaskItem.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTask, updateTask } from "../tasksSlice";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  function handleToggle() {
    dispatch(toggleComplete(task.id));
  }

  function handleDelete() {
    if (confirm("Delete this task?")) {
      dispatch(deleteTask(task.id));
    }
  }

  function saveEdit() {
    if (!title.trim()) return;
    dispatch(updateTask({ id: task.id, changes: { title: title.trim() } }));
    setEditing(false);
  }

  const priorityClass =
    task.priority === "high"
      ? "text-red-600"
      : task.priority === "low"
      ? "text-green-600"
      : "text-yellow-600";
  const titleClass = task.completed
    ? "line-through text-gray-400"
    : "text-gray-900";

  return (
    <li className="flex items-center justify-between p-3 bg-white border rounded shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />
        <div>
          {editing ? (
            <input
              className="p-1 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className={`font-medium ${titleClass}`}>{task.title}</span>
              <span className={`text-xs ${priorityClass} ml-2`}>
                ● {task.priority}
              </span>
            </div>
          )}
          {task.categories && task.categories.length > 0 && (
            <div className="text-xs text-gray-500">
              {task.categories.join(", ")}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 text-sm border rounded"
          onClick={() => setEditing((e) => !e)}
        >
          {editing ? "Cancel" : "Edit"}
        </button>
        <button
          className="px-2 py-1 text-sm bg-red-600 text-white rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
