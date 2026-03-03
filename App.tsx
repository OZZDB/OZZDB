import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { SectionImage } from './components/SectionImage';
import { EmpowerSection } from './components/EmpowerSection';
import { CallToActionBanner } from './components/CallToActionBanner';
import { ContactForm } from './components/ContactForm';
import { HowItWorks } from './components/HowItWorks';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LiveChatFAB } from './components/chat/LiveChatFAB';
import { ChatModal } from './components/chat/ChatModal';

const useVisibility = (delayMs: number): boolean => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);
  return isVisible;
};

const App: React.FC = () => {
  const heroVisible           = useVisibility(100);
  const imageVisible          = useVisibility(400);
  const empowerVisible        = useVisibility(700);
  const servicesVisible       = useVisibility(1000);
  const howItWorksVisible     = useVisibility(1300);
  const testimonialsVisible   = useVisibility(1600);
  const ctaVisible            = useVisibility(1900);
  const aboutVisible          = useVisibility(2100);
  const contactVisible        = useVisibility(2300);
  const footerVisible         = useVisibility(2500);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen(prev => !prev);

  return (
    <div>
      <main className="flex flex-col items-center overflow-x-hidden">
        <div className="w-full max-w-[68rem] px-6 sm:px-8 md:px-12 py-16 sm:py-24 md:py-36 space-y-6 md:space-y-10 lg:space-y-12">

          {/* HERO */}
          <div className={`transition-opacity duration-[375ms] ease-in-out ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Hero />
          </div>

          <hr className="border-t border-[#5F476B] w-full" />

          {/* SECTION IMAGE */}
          <div className={`transition-opacity duration-[375ms] ease-in-out ${imageVisible ? 'opacity-100' : 'opacity-0'}`}>
            <SectionImage
              src="./images/Conceptual_image_representing_global_impact_and_clarity.jpg"
              alt="Conceptual image representing global impact and clarity"
              className="w-full max-w-[66.125rem] h-auto md:h-[21.625rem]"
            />
          </div>

          {/* EMPOWER + TRUST STATS */}
          <div className={`transition-opacity duration-[375ms] ease-in-out ${empowerVisible ? 'opacity-100' : 'opacity-0'}`}>
            <EmpowerSection />
          </div>

          <hr className="border-t border-[#5F476B] w-full" />

          {/* SERVICES */}
          <div className={`transition-opacity duration-[375ms] ease-in-out ${servicesVisible ? 'opacity-100' : 'opacity-0'}`}>
            <ServicesSection />
          </div>

          <hr className="border-t border-[#5F476B] w-full" />

          {/* HOW IT WORKS */}
          <div className={`transition-opacity duration-[375ms] ease-in-out ${howItWorksVisible ? 'opacity-100' : 'opacity-0'}`}>
            <HowItWorks />
          </div>

          <hr className="border-t border-[#5F476B] w-full" />

          {/* TESTIMONIALS */}
          <div className={`transition-opacity duration-[375ms] ease-in-out ${testimonialsVisible ? 'opacity-100' : 'opacity-0'}`}>
            <TestimonialsSection />
          </div>

          {/* CTA BANNER */}
          <div className={`transition-opacity duration-[375ms] ease-in-out ${ctaVisible ? 'opacity-100' : 'opacity-0'}`}>
            <CallToActionBanner />
          </div>

          <hr className="border-t border-[#5F476B] w-full" />

          {/* ABOUT */}
          <div className={`transition-opacity duration-[375ms] ease-in-out ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
            <AboutSection />
          </div>

          {/* CONTACT FORM */}
          <div className={`transition-opacity duration-[375ms] ease-in-out ${contactVisible ? 'opacity-100' : 'opacity-0'}`}>
            <ContactForm />
          </div>

          {/* FOOTER */}
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
