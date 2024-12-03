export type TTask = {
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
};

export type TStore = {
  tasks: TTask[];
  addTask: (task: TTask) => void;
  deleteTask: (id: number) => void;
  editTask: (task: TTask) => void;
};
