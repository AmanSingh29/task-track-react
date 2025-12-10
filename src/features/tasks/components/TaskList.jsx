import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { reorderTasks } from "../tasksSlice";

function selectFilteredTasks(state) {
  const { byId, allIds, filter } = state.tasks;
  const q = (filter.search || "").toLowerCase();
  const status = filter.status;
  const list = allIds
    .map((id) => byId[id])
    .filter(Boolean)
    .filter((t) => {
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
    });

  list.sort((a, b) => {
    const oa = typeof a.order === "number" ? a.order : 0;
    const ob = typeof b.order === "number" ? b.order : 0;
    if (oa !== ob) return oa - ob;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return list;
}

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const allIds = tasks.map((t) => t.id);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // fine for mouse
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = allIds.indexOf(active.id);
    const newIndex = allIds.indexOf(over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(allIds, oldIndex, newIndex);
    dispatch(reorderTasks(newOrder));
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-gray-500 py-6">
        No tasks found. Add your first task above.
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={allIds} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
