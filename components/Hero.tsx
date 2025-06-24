
import React from 'react';
import { ArrowRightIcon, CalendarIcon } from './icons';
import { SectionImage } from './SectionImage';

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-10 md:space-y-12">
      <SectionImage 
        src="https://lh3.googleusercontent.com/d/1MH8k7vEQ1h1ogXMO45cEX9NaKEHGZ4z6" 
        alt="EloyText visual concept" 
        className="w-full md:w-[66.125rem] h-auto md:h-[21.625rem] mx-auto" // Updated to specific dimensions
        imageClassName="object-contain" 
        rounded="rounded-[1.875rem]"
        animateZoom={true}
        zoomDelayMs={1000} // 1 second delay
        zoomDurationMs={3000} // 3 seconds duration
        targetScale={1.2} // Target scale for zoom
      />
      <h1 className="font-['Inria_Serif'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-normal text-gradient text-gradient-primary tracking-tighter">
        Copy That Builds Trust
      </h1>
      <p className="font-['Quattrocento'] text-lg sm:text-xl md:text-2xl leading-relaxed md:leading-loose text-gradient text-gradient-primary max-w-3xl lg:max-w-4xl">
        We craft powerful, engaging copy that seamlessly bridges languages, borders, and contracts, empowering businesses, law firms, e-commerce brands, startups and entrepreneurs to effortlessly connect with their target audience.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
        <a 
          href="https://www.canva.com/design/DAGq1dFdoU0/evsXElgl1waNW2PLF5vC6Q/view" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base sm:text-lg font-medium text-[rgba(255,255,255,0.831)] border border-[#0057FF] rounded-full transition-transform duration-200 ease-in-out hover:scale-105"
        >
          <span className="font-['Nunito_Sans']">Get Started Today!</span>
          <ArrowRightIcon className="ml-3 h-5 w-5 fill-[#0057FF] group-hover:fill-white transition-colors" />
        </a>
        <a 
          href="https://calendly.com/eloycrafting/15min" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base sm:text-lg font-medium text-[rgba(255,255,255,0.831)] border border-[#5F476B] rounded-full transition-transform duration-200 ease-in-out hover:scale-105"
        >
          <span className="font-['Nunito_Sans']">Schedule Your Free Consultation.</span>
          <CalendarIcon className="ml-3 h-5 w-5 fill-[#5F476B] group-hover:fill-white transition-colors" />
        </a>
      </div>
    </div>
  );
};
