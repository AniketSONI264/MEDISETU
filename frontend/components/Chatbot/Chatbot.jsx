"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, X, Stethoscope, Calendar, User, Video, CreditCard, Phone } from "lucide-react";
import { useAdminAccess } from "@/hooks/useAdminAccess";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { isAdmin, isLoading: adminLoading } = useAdminAccess();

  const quickActions = [
    {
      text: "Book Appointment",
      icon: Calendar,
      query: "How do I book an appointment?"
    },
    {
      text: "Find Doctor",
      icon: User,
      query: "How can I find a doctor?"
    },
    {
      text: "Video Consultation",
      icon: Video,
      query: "How does video consultation work?"
    },
    {
      text: "Consultation Fees",
      icon: CreditCard,
      query: "What are the consultation fees?"
    },
    {
      text: "Emergency Help",
      icon: Phone,
      query: "What should I do in case of emergency?"
    }
  ];

  // Add initial greeting message with quick actions
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: "bot",
          content: "Hello! I'm your MediSetu assistant. How can I help you today?",
        },
      ]);
    }
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickAction = (query) => {
    setInput(query);
    handleSubmit(new Event('submit'), query);
  };

  const simulateTyping = async (response) => {
    setIsTyping(true);
    const words = response.split(' ');
    let currentMessage = '';
    
    for (let i = 0; i < words.length; i++) {
      currentMessage += words[i] + ' ';
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = currentMessage.trim();
        return newMessages;
      });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    setIsTyping(false);
  };

  const handleBotResponse = async (message) => {
    try {
      const response = await fetch("/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [
        ...prev,
        { type: "bot", content: "" }
      ]);

      // Simulate typing effect
      await simulateTyping(data.response);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          type: "bot",
          content: error.message || "I apologize, but I'm having trouble connecting. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e, quickActionQuery = null) => {
    e?.preventDefault();
    const message = quickActionQuery || input.trim();
    
    if (!message || isLoading || isTyping) return;

    // Add user message
    setMessages(prev => [...prev, { type: "user", content: message }]);
    setInput('');
    setIsLoading(true);

    // Handle bot response
    await handleBotResponse(message);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setInput('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <Stethoscope size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-semibold">MediSetu Assistant</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {(isLoading || isTyping) && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            {messages.length === 1 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                    className="flex items-center space-x-2 p-2 bg-gradient-to-br from-teal-50 to-blue-50 hover:from-teal-100 hover:to-blue-100 text-gray-700 rounded-lg transition-all duration-300 border border-teal-100 hover:shadow-md"
                    disabled={isLoading || isTyping}
                  >
                    <action.icon className="w-4 h-4 text-teal-600" />
                    <span className="text-xs sm:text-sm">{action.text}</span>
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isLoading || isTyping}
              />
              <button
                type="submit"
                disabled={isLoading || isTyping || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 