import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Book a Free Call',
    description:
      '15 minutes. Tell Eloy what you\'re building, who you\'re reaching, and what\'s not working. No pitch, no pressure.',
  },
  {
    number: '02',
    title: 'Get a Custom Content Plan',
    description:
      'You\'ll receive a scope, timeline, and pricing tailored to your project — legal drafting, copy, strategy, or all three.',
  },
  {
    number: '03',
    title: 'Words That Work',
    description:
      'You get content ready to publish, pitch, or file. Bilingual by default. Precise by design.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="space-y-12 md:space-y-16 py-12 md:py-16">
      <h2 className="font-['Quattrocento'] text-4xl sm:text-5xl md:text-6xl text-center font-bold text-gradient text-gradient-secondary">
        Three Steps. Zero Guesswork.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-0 md:gap-x-8">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`flex flex-col items-center text-center space-y-4 ${
              index > 0 ? 'md:border-l md:border-[#5F476B] md:pl-8' : 'md:pr-4'
            }`}
          >
            <span className="font-['Inria_Serif'] text-5xl md:text-6xl font-bold text-gradient text-gradient-primary opacity-40">
              {step.number}
            </span>
            <h3 className="font-['Sedan'] text-2xl md:text-3xl tracking-wide text-gradient text-gradient-primary">
              {step.title}
            </h3>
            <p className="font-['Quattrocento'] text-base sm:text-lg leading-relaxed text-gray-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center pt-4">
        <a
          href="https://calendly.com/eloytext/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-[rgba(255,255,255,0.831)] border border-[#0057FF] rounded-full transition-transform duration-200 ease-in-out hover:scale-105"
        >
          <span className="font-['Nunito_Sans']">Book Your Free 15-Min Call →</span>
        </a>
      </div>
    </section>
  );
};
