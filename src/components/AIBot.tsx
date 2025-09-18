import React, { useState } from 'react';
import { Send, Bot, Lightbulb, Heart, Brain } from 'lucide-react';

interface AIBotProps {
  user: any;
}

export function AIBot({ user }: AIBotProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      content: `Hi ${user.name}! I'm Luna, your AI mental health companion. I'm here 24/7 to provide support, coping strategies, and helpful resources. How are you feeling today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'greeting'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickSuggestions = [
    "I'm feeling anxious",
    "I need help sleeping",
    "I'm stressed about school",
    "Can you teach me breathing exercises?",
    "I feel overwhelmed",
    "Help me with positive thinking"
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.content);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        content: aiResponse.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: aiResponse.type
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('anxious') || message.includes('anxiety')) {
      return {
        content: "I understand you're feeling anxious. That's completely valid. Let's try a quick grounding exercise: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This can help bring you back to the present moment. Would you like me to guide you through some breathing exercises as well?",
        type: 'support'
      };
    }
    
    if (message.includes('sleep') || message.includes('sleeping')) {
      return {
        content: "Sleep issues can really affect our mental health. Here are some tips: 1) Try to go to bed at the same time each night, 2) Avoid screens 1 hour before bed, 3) Practice deep breathing or progressive muscle relaxation, 4) Keep your room cool and dark. Would you like me to guide you through a sleep meditation?",
        type: 'advice'
      };
    }
    
    if (message.includes('stress') || message.includes('overwhelmed')) {
      return {
        content: "Feeling stressed is tough, especially as a student. Let's break this down: What's the main source of your stress right now? Sometimes talking through our worries can help us see them more clearly. Remember, you don't have to handle everything at once. What's one small step you could take today?",
        type: 'support'
      };
    }
    
    if (message.includes('breathing')) {
      return {
        content: "Great idea! Let's do the 4-7-8 breathing technique: 1) Breathe in through your nose for 4 counts, 2) Hold your breath for 7 counts, 3) Exhale through your mouth for 8 counts. Repeat this 3-4 times. This activates your parasympathetic nervous system and helps reduce anxiety. Ready to try it together?",
        type: 'exercise'
      };
    }

    if (message.includes('sad') || message.includes('depressed') || message.includes('down')) {
      return {
        content: "I'm sorry you're feeling this way. Your feelings are valid and it's okay to not be okay sometimes. Remember that this feeling is temporary. Some things that might help: reaching out to a friend, doing a small activity you enjoy, getting some sunlight, or journaling. Would you like to talk about what's making you feel this way?",
        type: 'support'
      };
    }

    return {
      content: "Thank you for sharing that with me. I'm here to listen and support you. Everyone's mental health journey is unique, and it's brave of you to reach out. Is there something specific you'd like to work on or talk about today? I can help with coping strategies, mindfulness exercises, or just be here to listen.",
      type: 'general'
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'support': return <Heart className="w-4 h-4 text-pink-500" />;
      case 'advice': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'exercise': return <Brain className="w-4 h-4 text-blue-500" />;
      default: return <Bot className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Luna - AI Mental Health Companion</h2>
            <p className="text-sm text-green-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Always Available
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Available 24/7 • Confidential
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-xs lg:max-w-2xl ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                }`}
              >
                {message.sender === 'bot' && message.type && (
                  <div className="flex items-center space-x-2 mb-2">
                    {getMessageIcon(message.type)}
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {message.type}
                    </span>
                  </div>
                )}
                <p className="leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="px-6 py-3 bg-white border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Try asking Luna about:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Share what's on your mind..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
            disabled={!newMessage.trim() || isTyping}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Luna provides support and resources but is not a replacement for professional therapy.
        </p>
      </div>
    </div>
  );
}