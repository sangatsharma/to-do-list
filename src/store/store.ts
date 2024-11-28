import { create } from "zustand";

interface task {
  task: string;
  description: string;
}
interface Store {
  tasks: task[];
  addTask: (task: task) => void;
  deleteTask: (task: task) => void;
  editTask: (task: task) => void;
}
const getTaskFromLocalStorage = (): task[] => {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
};
const setTaskToLocalStorage = (tasks: task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const useStore = create<Store>((set) => ({
  tasks: getTaskFromLocalStorage(),
  addTask: (task: task) => {
    setTaskToLocalStorage([...getTaskFromLocalStorage(), task]);
    set((state: Store) => ({ tasks: [...state.tasks, task] }));
  },
  deleteTask: (task: task) =>
    set((state: Store) => ({
      tasks: state.tasks.filter((t: task) => t.task !== task.task),
    })),
  editTask: (task: task) =>
    set((state: Store) => ({
      tasks: state.tasks.map((t: task) => (t.task === task.task ? task : t)),
    })),
}));

export default useStore;
