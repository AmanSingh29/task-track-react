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
    touchAction: "pan-y",
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

  function saveEdit() {
    if (!title.trim()) return;
    dispatch(updateTask({ id: task.id, changes: { title: title.trim() } }));
    setEditing(false);
  }

  const priorityColors = {
    high: "bg-red-50 text-red-700 border-red-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low: "bg-green-50 text-green-700 border-green-200",
  };

  const priorityDots = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-green-500",
  };

  const titleClass = task.completed
    ? "line-through text-gray-400"
    : "text-gray-800";

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg transition-all duration-200 cursor-grab active:cursor-grabbing hover:border-blue-300 hover:shadow-md ${
        isDragging ? "opacity-60 shadow-2xl scale-105 rotate-2" : ""
      } ${task.completed ? "bg-gray-50" : ""}`}
    >
      {`${editing}`}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="shrink-0 pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all"
            aria-label={`Mark ${task.title} as ${
              task.completed ? "incomplete" : "complete"
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg cursor-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
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
            <>
              <div className="flex items-start gap-2 flex-wrap">
                <span
                  className={`font-medium text-sm sm:text-base wrap-break-word ${titleClass}`}
                  style={{ wordBreak: "break-word" }}
                >
                  {task.title}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${
                    priorityColors[task.priority]
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      priorityDots[task.priority]
                    }`}
                  ></span>
                  {task.priority}
                </span>
              </div>

              {task.categories && task.categories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {task.categories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-block px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded border border-blue-200"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
        <button
          className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
          onClick={(e) => {
            if (editing) {
              saveEdit();
            } else {
              setEditing(true);
            }
          }}
        >
          {editing ? "Save" : "Edit"}
        </button>
        <button
          className="px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-red-600 border border-red-600 rounded-lg cursor-pointer hover:bg-red-700 hover:border-red-700 active:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
          onClick={handleDelete}
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          Delete
        </button>
      </div>

      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gray-300 rounded-r opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </li>
  );
}
