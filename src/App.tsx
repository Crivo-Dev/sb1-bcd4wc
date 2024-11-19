import React, { useState } from 'react';
import { Header } from './components/Header';
import { HabitList } from './components/HabitList';
import { AddHabitModal } from './components/AddHabitModal';
import { DateSelector } from './components/DateSelector';
import { HistoryModal } from './components/HistoryModal';
import type { Habit } from './types';

const initialHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Exercise',
    description: '30 minutes of cardio or strength training',
    frequency: 'daily',
    target: 1,
    completed: 0,
    streak: 3,
    color: '#4F46E5',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Read Books',
    description: 'Read for at least 20 minutes',
    frequency: 'daily',
    target: 1,
    completed: 1,
    streak: 5,
    color: '#10B981',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Meditation',
    description: '10 minutes of mindfulness meditation',
    frequency: 'daily',
    target: 1,
    completed: 0,
    streak: 1,
    color: '#F59E0B',
    createdAt: new Date(),
  },
];

function App() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [completedHabits, setCompletedHabits] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleToggleHabit = (habitId: string) => {
    setCompletedHabits((prev) => {
      const next = new Set(prev);
      if (next.has(habitId)) {
        next.delete(habitId);
      } else {
        next.add(habitId);
      }
      return next;
    });
  };

  const handleAddHabit = (newHabit: Omit<Habit, 'id' | 'completed' | 'streak' | 'createdAt'>) => {
    const habit: Habit = {
      ...newHabit,
      id: crypto.randomUUID(),
      completed: 0,
      streak: 0,
      createdAt: new Date(),
    };
    setHabits((prev) => [...prev, habit]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onAddHabit={() => setIsAddModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Your Habits</h2>
              <p className="mt-1 text-sm text-gray-500">
                Track your daily progress and maintain your streak
              </p>
            </div>
            <DateSelector 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
        </div>
        
        <HabitList
          habits={habits}
          completedHabits={completedHabits}
          onToggleHabit={handleToggleHabit}
        />
      </main>

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddHabit}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        habits={habits}
        completedHabits={completedHabits}
      />
    </div>
  );
}

export default App;