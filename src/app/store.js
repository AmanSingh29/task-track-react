import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";

function loadFromLocalStorage() {
  try {
    const s = localStorage.getItem("tasks");
    return s ? JSON.parse(s) : undefined;
  } catch (e) {
    console.warn("Failed to load from localStorage", e);
    return undefined;
  }
}

const preloadedState = {
  tasks: loadFromLocalStorage(),
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  } catch (e) {
    console.warn("Failed to save to localStorage", e);
  }
});

export default store;
