import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, Award, BarChart3, PieChart, Activity } from 'lucide-react';

interface ProgressProps {
  userStats: any;
}

export function Progress({ userStats }: ProgressProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const moodData = [
    { day: 'Mon', mood: 'good', value: 7 },
    { day: 'Tue', mood: 'excellent', value: 9 },
    { day: 'Wed', mood: 'okay', value: 6 },
    { day: 'Thu', mood: 'good', value: 8 },
    { day: 'Fri', mood: 'struggling', value: 4 },
    { day: 'Sat', mood: 'good', value: 7 },
    { day: 'Sun', mood: 'excellent', value: 9 }
  ];

  const goals = [
    { id: 1, title: 'Daily Mood Check-in', progress: 85, target: 100, icon: '🎯' },
    { id: 2, title: 'Therapy Sessions', progress: 3, target: 4, icon: '💬' },
    { id: 3, title: 'Mindfulness Minutes', progress: 120, target: 150, icon: '🧘' },
    { id: 4, title: 'Journal Entries', progress: 5, target: 7, icon: '📝' }
  ];

  const achievements = [
    { id: 1, title: 'First Week Complete', date: '2 weeks ago', icon: '🎉', earned: true },
    { id: 2, title: '7-Day Streak', date: '1 week ago', icon: '🔥', earned: true },
    { id: 3, title: 'Mood Master', date: '3 days ago', icon: '😊', earned: true },
    { id: 4, title: '30-Day Challenge', date: 'In progress', icon: '🏆', earned: false }
  ];

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'okay': return 'bg-yellow-500';
      case 'struggling': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'excellent': return '😊';
      case 'good': return '🙂';
      case 'okay': return '😐';
      case 'struggling': return '😔';
      default: return '🙂';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
        <p className="text-gray-600">Track your mental health journey and celebrate your achievements</p>
      </div>

      {/* Period Selector */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'week', label: 'This Week' },
            { id: 'month', label: 'This Month' },
            { id: 'year', label: 'This Year' }
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Stats Overview */}
        <div className="lg:col-span-2 space-y-8">
          {/* Mood Tracking Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <span>Mood Timeline</span>
              </h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Excellent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Good</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Okay</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Struggling</span>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between space-x-2 h-40">
              {moodData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div
                    className={`w-8 rounded-t-md ${getMoodColor(data.mood)} transition-all hover:scale-105`}
                    style={{ height: `${(data.value / 10) * 100}%` }}
                  ></div>
                  <div className="text-center">
                    <div className="text-lg mb-1">{getMoodEmoji(data.mood)}</div>
                    <div className="text-xs text-gray-600">{data.day}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700">
                <strong>Insight:</strong> You've had 4 good or excellent days this week! Your mood tends to improve on weekends. Consider what activities help boost your mood.
              </p>
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Weekly Goals</span>
            </h2>

            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{goal.icon}</span>
                      <span className="font-medium text-gray-900">{goal.title}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {goal.progress}/{goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((goal.progress / goal.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {Math.round((goal.progress / goal.target) * 100)}% complete
                    </span>
                    {goal.progress >= goal.target && (
                      <span className="text-xs text-green-600 font-medium">✓ Completed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Level Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Level Progress</span>
            </h2>

            <div className="text-center mb-4">
              <div className="relative inline-block">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(userStats.xp % 200) / 200 * 219.9} 219.9`}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">{userStats.level}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {userStats.xp % 200}/200 XP to Level {userStats.level + 1}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total XP</span>
                <span className="font-medium">{userStats.xp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">This Week</span>
                <span className="font-medium text-green-600">+85 XP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Average</span>
                <span className="font-medium">12 XP</span>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span>Achievements</span>
            </h2>

            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-3 rounded-lg border-2 transition-all ${
                  achievement.earned
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                    {achievement.earned && (
                      <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span>This Week</span>
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sessions Attended</span>
                <span className="font-bold text-2xl text-blue-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mood Check-ins</span>
                <span className="font-bold text-2xl text-green-600">6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Exercises Completed</span>
                <span className="font-bold text-2xl text-purple-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Streak Days</span>
                <span className="font-bold text-2xl text-orange-600">{userStats.streak}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}