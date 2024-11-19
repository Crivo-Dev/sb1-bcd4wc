export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  target: number;
  completed: number;
  streak: number;
  color: string;
  createdAt: Date;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: Date;
  completed: boolean;
}