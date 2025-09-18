import React, { useState } from 'react';
import { Calendar, Clock, Video, MessageCircle, User, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { Screen } from '../App';

interface SchedulingProps {
  user: any;
  setCurrentScreen: (screen: Screen) => void;
}

export function Scheduling({ user, setCurrentScreen }: SchedulingProps) {
  const [selectedTherapist, setSelectedTherapist] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [sessionType, setSessionType] = useState<'video' | 'chat'>('video');
  const [step, setStep] = useState<'therapist' | 'datetime' | 'confirmation'>('therapist');
  const [isBooked, setIsBooked] = useState(false);

  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialties: ["Anxiety", "Depression", "Student Life"],
      rating: 4.9,
      rate: "$45/session",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      availability: "Available today"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialties: ["ADHD", "Social Anxiety", "Academic Stress"],
      rating: 4.8,
      rate: "$40/session",
      image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      availability: "Available tomorrow"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialties: ["Trauma", "PTSD", "Relationship Issues"],
      rating: 4.9,
      rate: "$50/session",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      availability: "Available this week"
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBookSession = () => {
    setIsBooked(true);
    setTimeout(() => {
      setCurrentScreen('dashboard');
    }, 2000);
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  if (isBooked) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Booked Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your session with {selectedTherapist?.name} is confirmed for {formatDate(selectedDate)} at {selectedTime}.
          </p>
          <div className="animate-pulse text-purple-600">
            Redirecting to dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule a Session</h1>
        <p className="text-gray-600">Book your next therapy session in just a few steps</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[
            { id: 'therapist', label: 'Choose Therapist', icon: User },
            { id: 'datetime', label: 'Select Date & Time', icon: Calendar },
            { id: 'confirmation', label: 'Confirm Booking', icon: Check }
          ].map((stepItem, index) => {
            const Icon = stepItem.icon;
            const isActive = step === stepItem.id;
            const isCompleted = 
              (step === 'datetime' && stepItem.id === 'therapist') ||
              (step === 'confirmation' && (stepItem.id === 'therapist' || stepItem.id === 'datetime'));
            
            return (
              <div key={stepItem.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-500 text-white' :
                  isActive ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  isActive ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {stepItem.label}
                </span>
                {index < 2 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Choose Therapist */}
      {step === 'therapist' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Your Therapist</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {therapists.map((therapist) => (
              <div
                key={therapist.id}
                onClick={() => setSelectedTherapist(therapist)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTherapist?.id === therapist.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{therapist.name}</h3>
                    <p className="text-sm text-gray-600">{therapist.rate}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {therapist.specialties.slice(0, 2).map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600">{therapist.availability}</span>
                  <span className="text-yellow-500">★ {therapist.rating}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setStep('datetime')}
              disabled={!selectedTherapist}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select Date & Time */}
      {step === 'datetime' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Select Date</h2>
              <div className="flex items-center space-x-2">
                <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-medium">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(selectedDate).map((day, index) => (
                <div key={index} className="aspect-square">
                  {day && (
                    <button
                      onClick={() => setSelectedDate(day)}
                      disabled={!isDateAvailable(day)}
                      className={`w-full h-full rounded-lg text-sm transition-colors ${
                        selectedDate.toDateString() === day.toDateString()
                          ? 'bg-purple-500 text-white'
                          : isDateAvailable(day)
                          ? 'hover:bg-purple-100 text-gray-900'
                          : 'text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Time & Session Type */}
          <div className="space-y-6">
            {/* Session Type */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Type</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSessionType('video')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    sessionType === 'video'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Video className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-sm font-medium">Video Call</div>
                </button>
                <button
                  onClick={() => setSessionType('chat')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    sessionType === 'chat'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <MessageCircle className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-sm font-medium">Text Chat</div>
                </button>
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Times</h3>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedTime === time
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep('therapist')}
                className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:border-purple-300 hover:text-purple-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('confirmation')}
                disabled={!selectedTime}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 'confirmation' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Confirm Your Booking</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={selectedTherapist?.image}
                  alt={selectedTherapist?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedTherapist?.name}</h3>
                  <p className="text-sm text-gray-600">{selectedTherapist?.rate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Date</span>
                  </div>
                  <p className="text-gray-900">{formatDate(selectedDate)}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Time</span>
                  </div>
                  <p className="text-gray-900">{selectedTime}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  {sessionType === 'video' ? (
                    <Video className="w-4 h-4 text-purple-600" />
                  ) : (
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700">Session Type</span>
                </div>
                <p className="text-gray-900 capitalize">{sessionType} Session</p>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep('datetime')}
                className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:border-purple-300 hover:text-purple-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleBookSession}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}