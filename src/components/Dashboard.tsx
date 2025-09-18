import React from 'react';
import { Calendar, Target, Trophy, Users, MessageCircle, Bot, TrendingUp, Star, Flame, Zap } from 'lucide-react';
import type { Screen } from '../App';

interface DashboardProps {
  userStats: any;
  setUserStats: (stats: any) => void;
  setCurrentScreen: (screen: Screen) => void;
}

export function Dashboard({ userStats, setUserStats, setCurrentScreen }: DashboardProps) {
  const quickActions = [
    { id: 'chat', label: 'Message Therapist', icon: MessageCircle, color: 'from-blue-500 to-blue-600', screen: 'chat' as Screen },
    { id: 'aibot', label: 'AI Support Chat', icon: Bot, color: 'from-purple-500 to-purple-600', screen: 'aibot' as Screen },
    { id: 'therapists', label: 'Find Therapist', icon: Users, color: 'from-green-500 to-green-600', screen: 'therapists' as Screen },
    { id: 'progress', label: 'View Progress', icon: TrendingUp, color: 'from-pink-500 to-pink-600', screen: 'progress' as Screen },
  ];

  const achievements = [
    { title: 'First Session', icon: '🎯', unlocked: true },
    { title: 'Week Streak', icon: '🔥', unlocked: true },
    { title: 'Mood Tracker', icon: '📊', unlocked: true },
    { title: 'Helper', icon: '🤝', unlocked: false },
  ];

  const dailyChallenges = [
    { title: 'Log your mood', completed: true, xp: 10 },
    { title: 'Practice gratitude', completed: false, xp: 15 },
    { title: 'Complete breathing exercise', completed: false, xp: 20 },
  ];

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
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
        <p className="text-gray-600">Ready to continue your mental health journey?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{userStats.level}</p>
              <p className="text-sm text-gray-600">Level</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{userStats.streak}</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{userStats.xp}</p>
              <p className="text-sm text-gray-600">XP Points</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-lg">{getMoodEmoji(userStats.mood)}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 capitalize">{userStats.mood}</p>
              <p className="text-sm text-gray-600">Current Mood</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => setCurrentScreen(action.screen)}
                    className={`p-4 rounded-xl bg-gradient-to-r ${action.color} text-white hover:scale-105 transform transition-all duration-200 group`}
                  >
                    <Icon className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-medium">{action.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Challenges */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Daily Challenges</h2>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-3">
              {dailyChallenges.map((challenge, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    challenge.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300'
                  }`}>
                    {challenge.completed && <span className="text-white text-xs">✓</span>}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${challenge.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {challenge.title}
                    </p>
                    <p className="text-sm text-purple-600">+{challenge.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Progress Ring */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Level Progress</h2>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(userStats.xp % 200) / 200 * 251.2} 251.2`}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{userStats.level}</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">
                {userStats.xp % 200} / 200 XP
              </p>
              <p className="text-xs text-gray-500">
                {200 - (userStats.xp % 200)} XP to next level
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-3 rounded-lg border-2 text-center transition-all ${
                  achievement.unlocked
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}>
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <p className="text-xs font-medium text-gray-700">{achievement.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Completed mood check-in</span>
                <span className="text-gray-400">2h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Chat session with Dr. Sarah</span>
                <span className="text-gray-400">1d ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Achieved 7-day streak</span>
                <span className="text-gray-400">2d ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}