export const dateToString = (date: Date) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleString("en-US");
};
