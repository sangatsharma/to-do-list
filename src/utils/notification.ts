import { Task } from "../types/store.types";
import { isDeadlineOver } from "./dateFormater";

export const playNotificationSound = () => {
  const audio = new Audio("/sounds/notification.wav");
  audio.play().catch((error) => console.error("Error playing sound:", error));
};

export const checkDeadlineAhead = (todo: Task) => {
  const now = new Date();
  if (todo.notified) return false;
  if (todo.status === "completed") return false;
  if (isDeadlineOver(todo.deadline)) return false;
  const date = new Date(todo.deadline);
  const timeDiff = date.getTime() - now.getTime();
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  return minutesDiff <= 10;
};
