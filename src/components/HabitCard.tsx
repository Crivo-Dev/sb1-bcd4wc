import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  isCompleted: boolean;
}

export function HabitCard({ habit, onToggle, isCompleted }: HabitCardProps) {
  return (
    <div 
      className="relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
      style={{ borderLeft: `4px solid ${habit.color}` }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{habit.name}</h3>
          <button 
            onClick={() => onToggle(habit.id)}
            className="text-gray-600 hover:text-green-500 transition-colors"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {habit.description && (
          <p className="mt-1 text-sm text-gray-600">{habit.description}</p>
        )}
        
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 rounded-full bg-gray-100">
              <span className="text-gray-600">
                {habit.frequency === 'daily' ? 'Daily' : 'Weekly'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-medium text-gray-700">{habit.streak}</span>
            <span className="text-gray-500">day streak</span>
          </div>
        </div>
        
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(habit.completed / habit.target) * 100}%`,
              backgroundColor: habit.color
            }}
          />
        </div>
      </div>
    </div>
  );
}