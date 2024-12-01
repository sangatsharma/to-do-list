import { format } from "date-fns";

export const dateToString = (date: Date) => {
  const dateString = format(date, "yyyy-MM-dd HH:mm:ss a");
  return dateString;
};

export const isDeadlineOver = (date: Date) => {
  const currentDate = new Date();
  const deadline = new Date(date);
  return currentDate > deadline;
};
