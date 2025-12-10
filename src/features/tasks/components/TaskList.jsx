// src/features/tasks/components/TaskList.jsx
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

function selectFilteredTasks(state) {
  const { byId, allIds, filter } = state.tasks;
  const q = filter.search?.toLowerCase?.() || "";
  const status = filter.status;
  return allIds
    .map((id) => byId[id])
    .filter((t) => {
      if (!t) return false;
      if (status === "active" && t.completed) return false;
      if (status === "completed" && !t.completed) return false;
      if (
        q &&
        !t.title.toLowerCase().includes(q) &&
        !(t.description || "").toLowerCase().includes(q)
      )
        return false;
      if (filter.priority && t.priority !== filter.priority) return false;
      if (
        filter.category &&
        (!t.categories || !t.categories.includes(filter.category))
      )
        return false;
      return true;
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export default function TaskList() {
  const tasks = useSelector(selectFilteredTasks);

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-gray-500 py-6">
        No tasks found. Add your first task above.
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
