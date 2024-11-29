export const playNotificationSound = () => {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  audio.play().catch(error => console.error('Error playing sound:', error));
};

export const checkDeadlines = (todos: Todo[]) => {
  const now = new Date();
  return todos.filter(todo => {
    if (todo.completed) return false;
    const timeDiff = todo.deadline.getTime() - now.getTime();
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    return minutesDiff <= 10 && minutesDiff > 0;
  });
};