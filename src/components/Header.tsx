import React from 'react';
import { Calendar, Plus, TrendingUp } from 'lucide-react';

interface HeaderProps {
  onAddHabit: () => void;
  onOpenHistory: () => void;
}

export function Header({ onAddHabit, onOpenHistory }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Habit Tracker</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenHistory}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              <span className="ml-2">History</span>
            </button>
            
            <button
              onClick={onAddHabit}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <Plus className="h-5 w-5 mr-1" />
              New Habit
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}