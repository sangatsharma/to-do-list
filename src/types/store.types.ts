export interface Task {
  id: number;
  task: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | undefined;
  isUpdated: boolean;
  deadline: Date;
  completed: boolean;
}

export interface Store {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  editTask: (task: Task) => void;
}

