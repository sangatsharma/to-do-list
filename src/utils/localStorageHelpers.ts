import { Task } from "../types/store.types";

// Utility functions to interact with localStorage
export const getTasksFromLocalStorage = (): Task[] => {
    try {
      return JSON.parse(localStorage.getItem("tasks") || "[]");
    } catch {
      return [];
    }
  };
  
  export const setTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };