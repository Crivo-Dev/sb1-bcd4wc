import React from 'react';
import { HabitCard } from './HabitCard';
import type { Habit } from '../types';

interface HabitListProps {
  habits: Habit[];
  completedHabits: Set<string>;
  onToggleHabit: (habitId: string) => void;
}

export function HabitList({ habits, completedHabits, onToggleHabit }: HabitListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          isCompleted={completedHabits.has(habit.id)}
          onToggle={onToggleHabit}
        />
      ))}
    </div>
  );
}