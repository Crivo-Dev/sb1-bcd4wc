import React, { useMemo } from 'react';
import { X, Flame, Trophy, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { format, startOfWeek, eachDayOfInterval, subDays, differenceInDays } from 'date-fns';
import type { Habit } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  habits: Habit[];
  completedHabits: Set<string>;
}

export function HistoryModal({ isOpen, onClose, habits, completedHabits }: HistoryModalProps) {
  if (!isOpen) return null;

  const stats = useMemo(() => {
    const totalHabits = habits.length;
    const completedToday = completedHabits.size;
    const completionRate = totalHabits ? (completedToday / totalHabits) * 100 : 0;
    const longestStreak = Math.max(...habits.map(h => h.streak));
    
    return {
      totalHabits,
      completedToday,
      completionRate,
      longestStreak,
    };
  }, [habits, completedHabits]);

  // Calculate weekly progress
  const weekDays = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: new Date(),
  });

  const achievements = [
    {
      icon: <Flame className="w-8 h-8 text-orange-500" />,
      title: "Current Streak",
      value: `${stats.longestStreak} days`,
      description: "Keep the momentum going!",
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      title: "Completion Rate",
      value: `${Math.round(stats.completionRate)}%`,
      description: "Of today's habits completed",
    },
    {
      icon: <Target className="w-8 h-8 text-indigo-500" />,
      title: "Total Habits",
      value: stats.totalHabits.toString(),
      description: "Active habits being tracked",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 overflow-hidden">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-indigo-600" />
            Your Journey
          </h2>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  {achievement.icon}
                  <span className="text-3xl font-bold text-gray-900">
                    {achievement.value}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>

          {/* Habit Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
              Habit Progress
            </h3>
            <div className="space-y-4">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: habit.color }}
                      />
                      <h4 className="font-medium text-gray-900">{habit.name}</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm font-medium text-gray-600">
                        {habit.streak} day streak
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(habit.completed / habit.target) * 100}%`,
                        backgroundColor: habit.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Message */}
          <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your Dedication is Inspiring!
            </h3>
            <p className="text-gray-600">
              Every small step counts. Keep building those positive habits, and watch as they transform your life.
              You're already {Math.round(stats.completionRate)}% closer to your goals today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}