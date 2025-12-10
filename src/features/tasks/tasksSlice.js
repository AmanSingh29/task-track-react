import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
  allIds: [],
  filter: {
    status: "all",
    search: "",
    category: null,
    priority: null,
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      const t = action.payload;
      state.byId[t.id] = t;
      state.allIds.push(t.id);
    },
    updateTask(state, action) {
      const { id, changes } = action.payload;
      if (state.byId[id]) {
        state.byId[id] = {
          ...state.byId[id],
          ...changes,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteTask(state, action) {
      const id = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter((x) => x !== id);
    },
    toggleComplete(state, action) {
      const id = action.payload;
      const t = state.byId[id];
      if (t) t.completed = !t.completed;
    },
    reorderTasks(state, action) {
      state.allIds = action.payload;
      state.allIds.forEach((id, idx) => {
        if (state.byId[id]) state.byId[id].order = idx;
      });
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    loadState(state, action) {
      return action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleComplete,
  reorderTasks,
  setFilter,
  loadState,
} = tasksSlice.actions;

export default tasksSlice.reducer;
