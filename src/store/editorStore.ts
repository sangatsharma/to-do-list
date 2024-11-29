import { create } from "zustand";
import { Store, Task } from "../types/store.types";
import {
  getTasksFromLocalStorage,
  setTasksToLocalStorage,
} from "../utils/localStorageHelpers";

// Zustand store
const useStore = create<Store>((set) => ({
  tasks: getTasksFromLocalStorage(),

  addTask: (task: Task) =>
    set((state) => {
      const updatedTasks = [...state.tasks, task];
      setTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    }),

  deleteTask: (id: number) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      console.log("deleting task with id", id);
      setTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    }),

  editTask: (task: Task) =>
    set((state) => {
      console.log("editing task with id", task.id, task);
      const updatedTasks = state.tasks.map((t) =>
        t.id === task.id ? task : t
      );
      setTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    }),
}));

export default useStore;
