import { createSlice } from "@reduxjs/toolkit";
import { getTaskList } from "../../api";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    taskList: null,
  },
  reducers: {
    getAllTaskList(state, action) {
      state.taskList = action.payload;
    },
    removeTask(state, { payload }) {
      let taskList = state.taskList;
      if (!Array.isArray(taskList)) return;
      state.taskList = taskList.filter((item) => {
        return +item.id !== +payload;
      });
    },
    updateTask(state, { payload }) {
      let taskList = state.taskList;
      if (!Array.isArray(taskList)) return;
      state.taskList = taskList.map((item) => {
        if (+item.id === +payload) {
          item.state = 2;
          item.complete = new Date().toLocaleString("zh-CN");
        }
        return item;
      });
    },
  },
});

export let { getAllTaskList, removeTask, updateTask } = taskSlice.actions;

export const removeTaskAction = removeTask;
export const updateTaskAction = updateTask;

export const getAllTaskListAsync = () => {
  return async (dispatch) => {
    let list = [];
    try {
      let result = await getTaskList(0);
      if (+result.code === 0) {
        list = result.list;
      }
    } catch (_) {}
    dispatch(getAllTaskList(list));
  };
};

export default taskSlice.reducer;
