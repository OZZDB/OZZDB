import React, { useState, useEffect, useRef, FormEvent } from 'react';
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Show greeting when chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'initial-greeting',
          role: 'model',
          text: "Hey! I'm Eloy's AI assistant. What are you working on? Tell me about your project and I'll point you in the right direction.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + '-user',
      role: 'user',
      text: trimmedInput,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    const typingId = Date.now().toString() + '-typing';
    setMessages(prev => [
      ...prev,
      { id: typingId, role: 'model', text: 'Typing...', timestamp: new Date() },
    ]);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages
            .filter(m => m.id !== 'initial-greeting')
            .map(m => ({ role: m.role, text: m.text })),
        }),
      });

      setMessages(prev => prev.filter(m => m.id !== typingId));

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.text || 'Sorry, I could not generate a response.';

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '-model',
          role: 'model',
          text: replyText,
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages(prev => prev.filter(m => m.id !== typingId));
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '-error',
          role: 'model',
          text: 'Sorry, something went wrong. Please try again or email eloytext@gmail.com directly.',
          timestamp: new Date(),
        },
      ]);
      setError('Could not reach the chat service. Please try again.');
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
      <div className="relative z-10 flex flex-col w-full h-full max-h-[90vh] sm:max-h-[75vh] sm:max-w-md bg-[#17254A] shadow-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden transition-all duration-300 ease-out">

        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-[#5F476B]">
          <div>
            <h2 id="chat-modal-title" className="text-lg font-semibold text-gradient text-gradient-primary font-['Nunito_Sans']">
              Chat with Eloy's AI
            </h2>
            <p className="text-xs text-gray-400 font-['Nunito_Sans'] mt-0.5">Typically replies instantly</p>
          </div>
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
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-3 rounded-xl ${
                  msg.role === 'user'
                    ? 'bg-[#5F476B] text-white rounded-br-none'
                    : 'bg-[#431F54] text-white rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-gray-300' : 'text-gray-400'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="p-3 mx-4 mb-2 text-sm text-red-200 bg-red-700/50 rounded-md">{error}</div>
        )}

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-[#5F476B] bg-[#151226]">
          <div className="flex items-center space-x-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 p-2.5 bg-[#2A2E45] border border-[#5F476B] rounded-lg resize-none focus:ring-2 focus:ring-[#7B6187] focus:border-[#7B6187] focus:outline-none text-sm placeholder-gray-400 text-white min-h-[44px] max-h-28"
              rows={1}
              disabled={isLoading}
              aria-label="Type your message"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
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
