export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  job?: string;
  goal?: string;
};

export type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  icon: string;
};

export type Goal = {
  id: string;
  title: string;
  category: 'emergency' | 'freedom' | 'generosity' | 'legacy' | 'education';
  current: number;
  target: number;
  deadline: string;
  completed?: boolean;
};

export type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  completed?: boolean;
};
