// src/features/tasks/components/TaskFilters.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../tasksSlice";

export default function TaskFilters() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);

  function setStatus(s) {
    dispatch(setFilter({ status: s }));
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setStatus("all")}
          className={`px-3 py-1 rounded ${
            filter.status === "all"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setStatus("active")}
          className={`px-3 py-1 rounded ${
            filter.status === "active"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setStatus("completed")}
          className={`px-3 py-1 rounded ${
            filter.status === "completed"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Completed
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          className="p-2 border rounded"
          placeholder="Search tasks..."
          value={filter.search}
          onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
        />
      </div>
    </div>
  );
}
