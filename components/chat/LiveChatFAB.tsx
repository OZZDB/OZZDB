import React from 'react';
import { ChatBubbleIcon, CloseIcon } from '../icons';

interface LiveChatFABProps {
  onToggleChat: () => void;
  isChatOpen: boolean;
}

export const LiveChatFAB: React.FC<LiveChatFABProps> = ({ onToggleChat, isChatOpen }) => {
  return (
    <button
      onClick={onToggleChat}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[1000] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#5F476B] to-[#431F54] text-white shadow-xl flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#151226] focus:ring-[#7B6187]"
      aria-label={isChatOpen ? "Close live chat" : "Open live chat"}
      aria-expanded={isChatOpen}
    >
      {isChatOpen ? (
        <CloseIcon className="w-7 h-7 sm:w-8 sm:h-8" />
      ) : (
        <ChatBubbleIcon className="w-7 h-7 sm:w-8 sm:h-8" />
      )}
    </button>
  );
};