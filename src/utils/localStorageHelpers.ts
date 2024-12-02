import { ITask } from "../types/store.types";
import { isDeadlineOver } from "./dateFormater";

export const getTasksFromLocalStorage = (): ITask[] => {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const updatedTasks = tasks.map((task: ITask) => {
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
export const setTasksToLocalStorage = (tasks: ITask[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getTaskById = (id: number): ITask | undefined => {
  const tasks = getTasksFromLocalStorage();
  return tasks.find((task) => task.id === id);
};
