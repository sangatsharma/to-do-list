export interface Task {
  id: number;
  task: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | undefined;
  isUpdated: boolean;
  deadline: Date;
  priority: "low" | "medium" | "high";
  status: "todo" | "inprogress" | "completed" | "overdue" | string;
  notified: boolean;
  warn: boolean;
}

export interface Store {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  editTask: (task: Task) => void;
}
