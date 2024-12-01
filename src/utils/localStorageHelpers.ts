import { Task } from "../types/store.types";
import { isDeadlineOver } from "./dateFormater";

export const getTasksFromLocalStorage = (): Task[] => {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const updatedTasks = tasks.map((task: Task) => {
      if (isDeadlineOver(task.deadline) && task.status !== "overdue") {
        return { ...task, status: "overdue" };
      }
      return task;
    });
    setTasksToLocalStorage(updatedTasks);
    return updatedTasks;
  } catch {
    return [];
  }
};
export const setTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getTaskById = (id: number): Task | undefined => {
  const tasks = getTasksFromLocalStorage();
  return tasks.find((task) => task.id === id);
};
