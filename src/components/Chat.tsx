import React, { useState } from 'react';
import { Send, Phone, Video, MoreVertical, Calendar } from 'lucide-react';

interface ChatProps {
  user: any;
}

export function Chat({ user }: ChatProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'therapist',
      content: "Hi there! I'm Dr. Sarah, your therapist. How are you feeling today?",
      timestamp: '2:30 PM',
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 2,
      sender: 'user',
      content: "Hi Dr. Sarah! I'm feeling a bit anxious about my upcoming exams.",
      timestamp: '2:32 PM'
    },
    {
      id: 3,
      sender: 'therapist',
      content: "I understand. Exam anxiety is very common among students. Let's work through some coping strategies together. Have you tried any breathing exercises before?",
      timestamp: '2:33 PM',
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate therapist response
    setTimeout(() => {
      const responses = [
        "That's a great question. Let me think about that...",
        "I hear you. That sounds challenging. Can you tell me more?",
        "That's completely valid to feel that way. Many people experience similar feelings.",
        "Let's explore that together. What do you think might help in this situation?"
      ];
      const response = {
        id: Date.now() + 1,
        sender: 'therapist',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2"
            alt="Dr. Sarah"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-900">Dr. Sarah Johnson</h2>
            <p className="text-sm text-green-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Online
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
            <Calendar className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              {message.sender === 'therapist' && (
                <img
                  src={message.avatar}
                  alt="Therapist"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50"
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        {/* Quick Replies */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            "I'm feeling anxious",
            "Can we schedule a call?",
            "I need help with stress",
            "Thank you for your help"
          ].map((reply, index) => (
            <button
              key={index}
              onClick={() => setNewMessage(reply)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-purple-50 hover:text-purple-600 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}