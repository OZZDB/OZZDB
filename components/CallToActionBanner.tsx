
import React from 'react';
import { ArrowRightIcon } from './icons';

export const CallToActionBanner: React.FC = () => {
  return (
    <div className="text-center space-y-8 py-8">
      <p className="font-['Quattrocento'] text-xl sm:text-2xl md:text-3xl leading-relaxed text-gradient text-gradient-primary">
        <strong>Trusted by Startups and Legal Professionals Worldwide</strong><br />
        <strong>20+ Businesses secured their legal framework with this bundle</strong>
      </p>
      <a 
        href="https://www.canva.com/design/DAGq1dFdoU0/evsXElgl1waNW2PLF5vC6Q/view" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center px-10 py-4 text-lg sm:text-xl font-medium text-[rgba(255,255,255,0.831)] border border-[#0057FF] rounded-full transition-transform duration-200 ease-in-out hover:scale-105"
      >
        <span className="font-['Nunito_Sans']">Get started today!</span>
        <ArrowRightIcon className="ml-3 h-6 w-6 fill-[#0057FF] group-hover:fill-white transition-colors" />
      </a>
    </div>
  );
};
