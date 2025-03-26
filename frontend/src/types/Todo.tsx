export interface Todo {
    id: number;
    title: string;
    description?: string;
    mood: number;
    isCompleted: boolean;
    dueDate: string;
    isOverdue?: boolean;
  }