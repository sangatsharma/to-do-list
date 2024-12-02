import { TTask } from "../types/store.types";
import { isDeadlineOver } from "./dateFormater";

export const playNotificationSound = (text:string) => {
  const audio = new Audio(`/sounds/${text}.wav`);
  audio.play().catch((error) => console.error("Error playing sound:", error));
};

export const checkDeadlineAhead = (todo: TTask) => {
  if (todo.notified) return false;
  if (todo.status === "completed") return false;
  if (isDeadlineOver(todo.deadline)) return false;
  const now = new Date();
  const date = new Date(todo.deadline);
  const timeDiff = date.getTime() - now.getTime();
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  return minutesDiff <= 10;
};
