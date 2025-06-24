
import React from 'react';
import { CalendarIcon, EmailIcon } from './icons'; // Assuming linkedIn is not in the original HTML SVGs

export const Footer: React.FC = () => {
  return (
    <footer className="text-center space-y-8 pt-12 pb-8">
      <ul className="flex justify-center items-center space-x-6 text-3xl text-[#5F476B]">
        <li>
          <a 
            href="https://calendly.com/eloycrafting/15min" // Original site links to "#" but this is more functional
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block h-10 w-10 p-1 rounded-full hover:scale-110 transition-transform"
            aria-label="Schedule a meeting on Calendly"
          >
            <CalendarIcon className="h-full w-full fill-[#5F476B] group-hover:fill-[#7B6187] transition-colors" />
          </a>
        </li>
        <li>
          <a 
            href="mailto:eloytext@gmail.com" // Placeholder email
            className="group block h-10 w-10 p-1 rounded-full hover:scale-110 transition-transform"
            aria-label="Send an email"
          >
            <EmailIcon className="h-full w-full fill-[#5F476B] group-hover:fill-[#7B6187] transition-colors" />
          </a>
        </li>
      </ul>
      <p className="font-['Inter'] text-sm text-[#5F476B]">
        © Untitled. All rights reserved.
      </p>
      <div className="text-center">
        <span className="inline-block relative group">
          <a target= "_blank" rel="noopener noreferrer" className="text-xs text-[rgba(255,255,255,0.498)] px-2 py-1 transition-all duration-250 ease-in-out group-hover:text-white group-hover:scale-110 group-hover:translate-y-[-0.05rem] relative z-10">
            <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-250 ease-in-out">(</span>
            Made by EloyText
            <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-250 ease-in-out">)</span>
          </a>
          <span className="absolute inset-[-1px] bg-gradient-to-r from-[#A464A1] via-[#7063AD] to-[#3B5DAD] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 group-hover:translate-y-[-0.05rem] shadow-[0_0.25em_1.25em_0_rgba(0,0,0,0.25)] transition-all duration-250 ease-in-out pointer-events-none"></span>
        </span>
      </div>
    </footer>
  );
};
