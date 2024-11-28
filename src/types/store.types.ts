export interface Task {
  id: number;
  task: string;
  description: string | undefined;
  createdAt: Date;
  updatedAt: Date | undefined;
  isUpdated: boolean;
}

export interface Store {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  editTask: (task: Task) => void;
}
