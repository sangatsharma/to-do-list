export const dateToString = (date: Date) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleString("en-US");
};

export const isDeadlineOver = (date: Date) => {
  const currentDate = new Date();
  const deadline = new Date(date);
  return currentDate > deadline;
};
