import { TTask } from '../types/store.types';
import { isDeadlineOver } from './dateFormater';

export const getTasksFromLocalStorage = (): TTask[] => {
  try {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    const updatedTasks = tasks.map((task: TTask) => {
      if (isDeadlineOver(task.deadline) && task.status !== 'overdue') {
        return { ...task, status: 'overdue' };
      }
      return task;
    });
    setTasksToLocalStorage(updatedTasks);
    return updatedTasks;
  } catch {
    setTasksToLocalStorage([]);
    return [];
  }
};
export const setTasksToLocalStorage = (tasks: TTask[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const getTaskById = (id: number): TTask | undefined => {
  const tasks = getTasksFromLocalStorage();
  return tasks.find((task) => task.id === id);
};
