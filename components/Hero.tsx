import React from 'react';
import { ArrowRightIcon, CalendarIcon } from './icons';
import { SectionImage } from './SectionImage';

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-10 md:space-y-12">
      <SectionImage
        src="./images/EloyText_visual_concept.svg"
        alt="EloyText visual concept"
        className="w-full max-w-[1200px] h-[400px] md:h-[500px] object-cover transform scale-[1.2] transition-transform duration-[3000ms] delay-[1000ms] relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]"
        imageClassName="object-cover"
        rounded="rounded-[1.5rem]"
        animateZoom={true}
        zoomDelayMs={1000}
        zoomDurationMs={3000}
        targetScale={1.2}
      />
      <h1 className="font-['Inria_Serif'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-normal text-gradient text-gradient-primary tracking-tighter">
        The Copywriter Who Reads the Fine Print.
      </h1>
      <div className="flex flex-col items-center space-y-3 max-w-3xl lg:max-w-4xl">
        <p className="font-['Quattrocento'] text-base sm:text-lg md:text-xl leading-relaxed text-gradient text-gradient-primary opacity-80">
          Bilingual copy for law firms, fintech startups, immigration practices, and e-commerce brands.
        </p>
        <p className="font-['Inria_Serif'] text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-gradient text-gradient-primary">
          Precision. Persuasion. One voice.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
        
          href="https://calendly.com/eloytext/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base sm:text-lg font-medium text-[rgba(255,255,255,0.831)] border border-[#0057FF] rounded-full transition-transform duration-200 ease-in-out hover:scale-105"
        >
          <span className="font-['Nunito_Sans']">Schedule Your Free Consultation</span>
          <CalendarIcon className="ml-3 h-5 w-5 fill-[#0057FF] group-hover:fill-white transition-colors" />
        </a>
        
          href="#services"
          className="group inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base sm:text-lg font-medium text-[rgba(255,255,255,0.831)] border border-[#5F476B] rounded-full transition-transform duration-200 ease-in-out hover:scale-105"
        >
          <span className="font-['Nunito_Sans']">See What We Offer</span>
          <ArrowRightIcon className="ml-3 h-5 w-5 fill-[#5F476B] group-hover:fill-white transition-colors" />
        </a>
      </div>
    </div>
  );
};