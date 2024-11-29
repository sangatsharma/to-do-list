import { Task } from "../types/store.types";

export const playNotificationSound = () => {
  const audio = new Audio(
    "/sounds/notification.wav"
  );
  audio.play().catch((error) => console.error("Error playing sound:", error));
};

export const checkDeadlines = (todos: Task[]) => {
  console.log("Checking todos",todos);
  const now = new Date();
  return todos.filter((todo) => {
    if (todo.completed) return false;
    const date = new Date(todo.deadline);
    console.log("todo deadline:",todo.deadline,date,"time now:",date.getTime());
    const timeDiff = date.getTime() - now.getTime();
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    return minutesDiff <= 10 && minutesDiff > 0;
  });
};
