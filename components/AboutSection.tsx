
import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="border border-[#5F476B] rounded-[2rem] p-8 sm:p-12 md:p-16 lg:p-24">
        <div className="max-w-2xl mx-auto text-left space-y-4">
          <p className="font-['Nunito'] text-lg sm:text-xl font-light tracking-wide leading-relaxed text-[rgba(223,242,238,0.961)]">
            <strong>About Me</strong>
          </p>
          <p className="font-['Nunito'] text-base sm:text-lg font-light tracking-wide leading-relaxed text-[rgba(223,242,238,0.961)]">
            I'm Eloy, founder of EloyText, Legal Drafter-Copywriter blending legal precision with creativity strategy to craft bilingual content that resonates globally, drives results, and aligns with the emerging language trends in tech and AI.
          </p>
          <p className="font-['Nunito'] text-base sm:text-lg font-light tracking-wide leading-relaxed text-[rgba(223,242,238,0.961)]">
            I've worked with international teams, startups, NGOs, and service professionals across borders. Legal writing doesn't have to be dull; I make it sharp, engaging, and impactful. Let’s craft language that works for you.
          </p>
        </div>
      </div>
    </section>
  );
};
