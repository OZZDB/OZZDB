import React from 'react';
import { CalendarIcon } from './icons';

export const CallToActionBanner: React.FC = () => {
  return (
    <div className="text-center space-y-6 py-8 border border-[#5F476B] rounded-[2rem] px-8 sm:px-12 md:px-16">
      <h2 className="font-['Quattrocento'] text-3xl sm:text-4xl md:text-5xl font-bold text-gradient text-gradient-secondary leading-snug">
        Your audience is waiting.<br />Let's give them something worth reading.
      </h2>
      <p className="font-['Quattrocento'] text-lg sm:text-xl text-gradient text-gradient-primary max-w-2xl mx-auto">
        Law firms, startups, and brands across borders trust EloyText to get it right — in both languages.
      </p>
      <a
        href="https://calendly.com/eloycrafting/15min"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center px-10 py-4 text-lg sm:text-xl font-medium text-[rgba(255,255,255,0.831)] border border-[#0057FF] rounded-full transition-transform duration-200 ease-in-out hover:scale-105"
      >
        <span className="font-['Nunito_Sans']">Book Your Free 15-Min Call</span>
        <CalendarIcon className="ml-3 h-6 w-6 fill-[#0057FF] group-hover:fill-white transition-colors" />
      </a>
    </div>
  );
};
