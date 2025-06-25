import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SendIcon, CloseIcon } from '../icons';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isApiKeyMissing, setIsApiKeyMissing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Access API_KEY using process.env
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.warn("API_KEY is missing. Please ensure it is set as an environment variable. Chat functionality will be disabled.");
      setIsApiKeyMissing(true);
      return;
    }
    setIsApiKeyMissing(false);
    if (isOpen && !chat) {
      try {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash-preview-04-17',
          config: {
            systemInstruction: "You are EloyText's friendly and helpful AI assistant. Your purpose is to provide information about EloyText's services (Legal Drafting, Copywriting, Content Strategy), help users understand how EloyText can benefit their business, and guide them on how to get started or schedule a consultation. Keep responses concise and professional. If a question is outside your scope, politely state that and suggest contacting EloyText directly or scheduling a consultation. Do not use markdown formatting in your responses.",
          },
        });
        setChat(newChat);
        setMessages([
          { 
            id: 'initial-greeting', 
            role: 'model', 
            text: "Hello! I'm the EloyText AI assistant. How can I help you today regarding our legal-grade copywriting services?", 
            timestamp: new Date() 
          }
        ]);

      } catch (e) {
        console.error("Failed to initialize chat:", e);
        setError("Could not initialize chat service. Please try again later.");
        // If initialization fails, it might be due to an invalid key or other issues, treat as if key is problematic for UI.
        setIsApiKeyMissing(true); 
      }
    }
  }, [isOpen, chat]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading || !chat || isApiKeyMissing) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + '-user',
      role: 'user',
      text: trimmedInput,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    const modelTypingId = Date.now().toString() + '-model-typing';
    setMessages(prev => [...prev, { id: modelTypingId, role: 'model', text: 'EloyText is typing...', timestamp: new Date() }]);

    try {
      const stream = await chat.sendMessageStream({ message: trimmedInput });
      let streamedText = '';
      let firstChunkReceived = false;
      let currentModelMessageId = '';


      for await (const chunk of stream) {
        if (!firstChunkReceived) {
          setMessages(prev => prev.filter(msg => msg.id !== modelTypingId));
          currentModelMessageId = Date.now().toString() + '-model';
           setMessages(prev => [...prev, { id: currentModelMessageId, role: 'model', text: '', timestamp: new Date() }]);
          firstChunkReceived = true;
        }
        streamedText += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === currentModelMessageId
              ? { ...msg, text: streamedText }
              : msg
          )
        );
      }
      if (!firstChunkReceived) { 
         setMessages(prev => prev.filter(msg => msg.id !== modelTypingId));
      }

    } catch (apiError: any) {
      console.error('Error sending message:', apiError);
      setError('Sorry, something went wrong. Please try again.');
      setMessages(prev => prev.filter(msg => msg.id !== modelTypingId)); 
      setMessages(prev => [...prev, {id: Date.now().toString() + '-error', role: 'model', text: 'Sorry, I encountered an error. Please try again.', timestamp: new Date()}]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[1005] flex items-end justify-end sm:p-6" 
      aria-modal="true" 
      role="dialog"
      aria-labelledby="chat-modal-title"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 flex flex-col w-full h-full max-h-[90vh] sm:max-h-[75vh] sm:max-w-md bg-[#17254A] shadow-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden transition-all duration-300 ease-out transform translate-y-full opacity-0 data-[open=true]:translate-y-0 data-[open=true]:opacity-100" data-open={isOpen}>
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-[#5F476B]">
          <h2 id="chat-modal-title" className="text-lg font-semibold text-gradient text-gradient-primary font-['Nunito_Sans']">
            EloyText Live Chat
          </h2>
          <button
            onClick={onClose}
            className="text-[#A464A1] hover:text-white transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7B6187]"
            aria-label="Close chat"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {isApiKeyMissing && (
             <div className="p-3 my-2 text-sm text-yellow-200 bg-yellow-700/50 rounded-md">
              Live chat is temporarily unavailable. The API key is not configured.
            </div>
          )}
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-xl ${
                  msg.role === 'user'
                    ? 'bg-[#5F476B] text-white rounded-br-none'
                    : 'bg-[#431F54] text-white rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-gray-300' : 'text-gray-400'} text-opacity-70`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {error && !isApiKeyMissing && (
          <div className="p-3 mx-4 mb-2 text-sm text-red-200 bg-red-700/50 rounded-md">
            {error}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-[#5F476B] bg-[#151226]">
          <div className="flex items-center space-x-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isApiKeyMissing ? "Chat unavailable (API key missing)" : "Type your message..."}
              className="flex-1 p-2.5 bg-[#2A2E45] border border-[#5F476B] rounded-lg resize-none focus:ring-2 focus:ring-[#7B6187] focus:border-[#7B6187] focus:outline-none text-sm placeholder-gray-400 text-white min-h-[44px] max-h-28"
              rows={1}
              disabled={isLoading || isApiKeyMissing}
              aria-label={isApiKeyMissing ? "Chat input disabled due to missing API key" : "Type your message"}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim() || isApiKeyMissing}
              className="p-2.5 rounded-full bg-[#0057FF] text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#151226] focus:ring-[#0057FF]"
              aria-label="Send message"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};