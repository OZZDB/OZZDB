import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="border border-[#5F476B] rounded-[2rem] p-8 sm:p-12 md:p-16 lg:p-24">
        <div className="max-w-2xl mx-auto text-left space-y-5">
          <p className="font-['Nunito'] text-lg sm:text-xl font-semibold tracking-wide leading-relaxed text-[rgba(223,242,238,0.961)]">
            About Eloy
          </p>
          <p className="font-['Nunito'] text-base sm:text-lg font-light tracking-wide leading-relaxed text-[rgba(223,242,238,0.961)]">
            I'm Eloy — lawyer, copywriter, and founder of EloyText. I blend legal precision with creative strategy to craft bilingual content that resonates globally, drives results, and aligns with the emerging language trends in tech and AI.
          </p>
          <p className="font-['Nunito'] text-base sm:text-lg font-light tracking-wide leading-relaxed text-[rgba(223,242,238,0.961)]">
            I've worked with international teams, startups, NGOs, and service professionals across borders — in English and Spanish. My background in law means your content isn't just engaging; it's accurate, compliant, and built to hold up under scrutiny.
          </p>
          <p className="font-['Nunito'] text-base sm:text-lg font-light tracking-wide leading-relaxed text-[rgba(223,242,238,0.961)]">
            Legal writing doesn't have to be dull. I make it sharp, engaging, and impactful. Let's craft language that works for you.
          </p>
          <div className="pt-4">
            <a
              href="https://calendly.com/eloytext/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-['Nunito_Sans'] text-sm font-medium text-[rgba(255,255,255,0.7)] border border-[#5F476B] rounded-full px-6 py-2.5 transition-transform duration-200 ease-in-out hover:scale-105 hover:border-[#7B6187]"
            >
              Let's work together →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
