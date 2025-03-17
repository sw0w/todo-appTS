export type Todo = {
  _id: string;
  todo: string;
  completed: boolean;
  isEditing?: boolean;
  userId: number;
};

export type TemporaryText = {
  _id: string;
  text: string;
};
