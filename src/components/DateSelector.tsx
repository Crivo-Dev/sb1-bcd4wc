import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isToday, addDays, isSameDay } from 'date-fns';

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  const handlePreviousDay = () => {
    onDateChange(addDays(selectedDate, -1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(selectedDate, 1));
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handlePreviousDay}
        className="p-2 hover:bg-gray-100 rounded-full"
        aria-label="Previous day"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-600">
          {format(selectedDate, 'EEEE')}
        </span>
        <span className="text-lg font-semibold">
          {format(selectedDate, 'MMM d, yyyy')}
        </span>
      </div>

      <button
        onClick={handleNextDay}
        className="p-2 hover:bg-gray-100 rounded-full"
        aria-label="Next day"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>

      {!isToday(selectedDate) && (
        <button
          onClick={handleToday}
          className="ml-2 px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
        >
          Today
        </button>
      )}
    </div>
  );
}