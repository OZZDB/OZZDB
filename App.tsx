
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { SectionImage } from './components/SectionImage';
import { EmpowerSection } from './components/EmpowerSection';
import { CallToActionBanner } from './components/CallToActionBanner';
import { ContactForm } from './components/ContactForm'; // Import ContactForm
import { LiveChatFAB } from './components/chat/LiveChatFAB';
import { ChatModal } from './components/chat/ChatModal';

// Custom hook for visibility with delay
const useVisibility = (delayMs: number): boolean => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);
  return isVisible;
};

const App: React.FC = () => {
  // Visibility states for staggered loading
  const heroVisible = useVisibility(100); 
  const conceptualImageVisible = useVisibility(400);
  const empowerVisible = useVisibility(800);
  const servicesVisible = useVisibility(1200);
  const ctaVisible = useVisibility(1600);
  const aboutVisible = useVisibility(2000);
  const contactFormVisible = useVisibility(2200); // Added for ContactForm
  const footerVisible = useVisibility(2600); // Adjusted Footer delay

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <div>
      <main className="flex flex-col items-center overflow-x-hidden">
        <div className="w-full max-w-[68rem] px-6 sm:px-8 md:px-12 py-16 sm:py-24 md:py-36 space-y-10 md:space-y-16 lg:space-y-24">
          
          <div className={`transition-opacity duration-[375ms] ease-in-out ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Hero />
          </div>
          
          <hr className="border-t border-[#5F476B] w-full" />
          
          <div className={`transition-opacity duration-[375ms] ease-in-out ${conceptualImageVisible ? 'opacity-100' : 'opacity-0'}`}>
            <SectionImage 
              src="https://lh3.googleusercontent.com/d/1RVIwf5K1LMvqLLIjgvMsyZFOxbEIlLkR" 
              alt="Conceptual image representing global impact and clarity"
              className="w-full max-w-[66.125rem] h-auto md:h-[21.625rem]" // Added explicit className
            />
          </div>

          <div className={`transition-opacity duration-[375ms] ease-in-out ${empowerVisible ? 'opacity-100' : 'opacity-0'}`}>
            <EmpowerSection />
          </div>
          
          <div className={`transition-opacity duration-[375ms] ease-in-out ${servicesVisible ? 'opacity-100' : 'opacity-0'}`}>
            <ServicesSection />
          </div>

          <div className={`transition-opacity duration-[375ms] ease-in-out ${ctaVisible ? 'opacity-100' : 'opacity-0'}`}>
            <CallToActionBanner />
          </div>

          <div className={`transition-opacity duration-[375ms] ease-in-out ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
            <AboutSection />
          </div>

          <div className={`transition-opacity duration-[375ms] ease-in-out ${contactFormVisible ? 'opacity-100' : 'opacity-0'}`}>
            <ContactForm />
          </div>

          <div className={`transition-opacity duration-[375ms] ease-in-out ${footerVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Footer />
          </div>
        </div>
      </main>
      <LiveChatFAB onToggleChat={toggleChat} isChatOpen={isChatOpen} />
      <ChatModal isOpen={isChatOpen} onClose={toggleChat} />
    </div>
  );
};

export default App;
