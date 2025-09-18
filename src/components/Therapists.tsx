import React, { useState } from 'react';
import { Star, MapPin, Clock, DollarSign, Video, MessageCircle, Calendar, Filter } from 'lucide-react';
import type { Screen } from '../App';

interface TherapistsProps {
  user: any;
  setCurrentScreen: (screen: Screen) => void;
}

export function Therapists({ user, setCurrentScreen }: TherapistsProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialties: ["Anxiety", "Depression", "Student Life"],
      rating: 4.9,
      reviews: 156,
      experience: "Recent Graduate - 2 years",
      location: "Online",
      rate: "$45/session",
      availability: "Available today",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
      languages: ["English", "Spanish"],
      approach: "Cognitive Behavioral Therapy (CBT)",
      isAffordable: true
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialties: ["ADHD", "Social Anxiety", "Academic Stress"],
      rating: 4.8,
      reviews: 203,
      experience: "Recent Graduate - 1 year",
      location: "Online",
      rate: "$40/session",
      availability: "Available tomorrow",
      image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
      languages: ["English", "Mandarin"],
      approach: "Mindfulness-Based Therapy",
      isAffordable: true
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialties: ["Trauma", "PTSD", "Relationship Issues"],
      rating: 4.9,
      reviews: 89,
      experience: "Recent Graduate - 1 year",
      location: "Online",
      rate: "$50/session",
      availability: "Available this week",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
      languages: ["English", "Spanish", "Portuguese"],
      approach: "Trauma-Informed Care",
      isAffordable: true
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialties: ["OCD", "Panic Disorders", "Perfectionism"],
      rating: 4.7,
      reviews: 134,
      experience: "Recent Graduate - 2 years",
      location: "Online",
      rate: "$48/session",
      availability: "Available next week",
      image: "https://images.pexels.com/photos/6749779/pexels-photo-6749779.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
      languages: ["English"],
      approach: "Exposure and Response Prevention",
      isAffordable: true
    }
  ];

  const filters = [
    { id: 'all', label: 'All Therapists', count: therapists.length },
    { id: 'anxiety', label: 'Anxiety', count: 3 },
    { id: 'depression', label: 'Depression', count: 1 },
    { id: 'affordable', label: 'Under $50', count: 4 },
    { id: 'available', label: 'Available Today', count: 1 }
  ];

  const filteredTherapists = therapists.filter(therapist => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'anxiety') return therapist.specialties.some(s => s.includes('Anxiety'));
    if (selectedFilter === 'depression') return therapist.specialties.includes('Depression');
    if (selectedFilter === 'affordable') return parseInt(therapist.rate.replace('$', '')) < 50;
    if (selectedFilter === 'available') return therapist.availability.includes('today');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Therapist</h1>
        <p className="text-gray-600">Connect with certified, recently graduated therapists at affordable rates</p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === filter.id
                  ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-200 hover:text-purple-600'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Therapist Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredTherapists.map((therapist) => (
          <div key={therapist.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={therapist.image}
                alt={therapist.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">{therapist.name}</h3>
                  {therapist.isAffordable && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Affordable
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{therapist.approach}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{therapist.rating}</span>
                    <span>({therapist.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {therapist.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{therapist.experience}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>{therapist.rate}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{therapist.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{therapist.availability}</span>
              </div>
            </div>

            {/* Languages */}
            <div className="mb-4">
              <span className="text-sm text-gray-600">Languages: </span>
              <span className="text-sm text-gray-900">{therapist.languages.join(', ')}</span>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentScreen('chat')}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start Chat</span>
              </button>
              <button 
                onClick={() => setCurrentScreen('scheduling')}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center"
              >
                <CalendarPlus className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:border-purple-300 hover:text-purple-600 transition-colors flex items-center justify-center">
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Can't find the right therapist?</h2>
        <p className="mb-6 text-purple-100">Our AI-powered matching system can help you find the perfect fit based on your specific needs and preferences.</p>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
          Get Personalized Recommendations
        </button>
      </div>
    </div>
  );
}