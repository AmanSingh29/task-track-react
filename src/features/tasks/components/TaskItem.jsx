import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTask, updateTask } from "../tasksSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    touchAction: "none",
  };

  function handleToggle(e) {
    e.stopPropagation();
    dispatch(toggleComplete(task.id));
  }

  function handleDelete(e) {
    e.stopPropagation();
    if (confirm("Delete this task?")) {
      dispatch(deleteTask(task.id));
    }
  }

  function handleEditClick(e) {
    e.stopPropagation();
    setEditing((prev) => !prev);
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
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-between p-3 bg-white border rounded shadow-sm cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-90 shadow-lg" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          aria-label={`Mark ${task.title} as ${
            task.completed ? "incomplete" : "complete"
          }`}
          className="cursor-pointer"
        />

        <div>
          {editing ? (
            <input
              className="p-1 border rounded cursor-text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              autoFocus
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
          className="px-2 py-1 text-sm border rounded cursor-pointer hover:bg-gray-50"
          onClick={handleEditClick}
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {editing ? "Cancel" : "Edit"}
        </button>
        <button
          className="px-2 py-1 text-sm bg-red-600 text-white rounded cursor-pointer hover:bg-red-700"
          onClick={handleDelete}
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
