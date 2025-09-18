import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AuthScreen } from './components/AuthScreen';

// Lazy load components
const Chat = lazy(() => import('./components/Chat').then(module => ({ default: module.Chat })));
const Therapists = lazy(() => import('./components/Therapists').then(module => ({ default: module.Therapists })));
const Profile = lazy(() => import('./components/Profile').then(module => ({ default: module.Profile })));
const AIBot = lazy(() => import('./components/AIBot').then(module => ({ default: module.AIBot })));
const Progress = lazy(() => import('./components/Progress').then(module => ({ default: module.Progress })));
const Scheduling = lazy(() => import('./components/Scheduling').then(module => ({ default: module.Scheduling })));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
);

export type Screen = 'auth' | 'dashboard' | 'chat' | 'therapists' | 'profile' | 'aibot' | 'progress' | 'scheduling';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [user, setUser] = useState<any>(null);
  const [userStats, setUserStats] = useState({
    level: 1,
    xp: 120,
    streak: 7,
    totalSessions: 15,
    mood: 'good' as 'excellent' | 'good' | 'okay' | 'struggling'
  });

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('auth');
  };

  if (!user && currentScreen !== 'auth') {
    setCurrentScreen('auth');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {user && (
        <Header 
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          user={user}
          userStats={userStats}
          onLogout={handleLogout}
        />
      )}
      
      <main className={user ? 'pt-16' : ''}>
        {currentScreen === 'auth' && (
          <AuthScreen onLogin={handleLogin} />
        )}
        {currentScreen === 'dashboard' && (
          <Dashboard 
            userStats={userStats}
            setUserStats={setUserStats}
            setCurrentScreen={setCurrentScreen}
          />
        )}
        <Suspense fallback={<LoadingSpinner />}>
          {currentScreen === 'chat' && (
            <Chat user={user} />
          )}
          {currentScreen === 'therapists' && (
            <Therapists user={user} setCurrentScreen={setCurrentScreen} />
          )}
          {currentScreen === 'profile' && (
            <Profile user={user} userStats={userStats} />
          )}
          {currentScreen === 'aibot' && (
            <AIBot user={user} />
          )}
          {currentScreen === 'progress' && (
            <Progress userStats={userStats} />
          )}
          {currentScreen === 'scheduling' && (
            <Scheduling user={user} setCurrentScreen={setCurrentScreen} />
          )}
        </Suspense>
      </main>
    </div>
  );
}

export default App;