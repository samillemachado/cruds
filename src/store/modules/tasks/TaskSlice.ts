import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../../types";

const initialState: Task = {
  userId: 0,
  id: 0,
  title: "",
  completed: false,
};

export const getTask = createAsyncThunk(
  "tasks/getTask", //nome que vai aparecer no dev tools
  async (id: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    return response.data;
  }
);

const TaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    create(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTask.fulfilled, (state, action) => {
      return { ...action.payload };
    });
  },
});

export const { create, clear } = TaskSlice.actions;
export default TaskSlice.reducer;
