export interface TodoItem {
  id?: number; // Optional because we don't have an ID when creating a new item
  title: string;
  isCompleted: boolean;
}