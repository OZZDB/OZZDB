import React from 'react';

const testimonials = [
  {
    quote:
      'Eloy rewrote our entire investor deck narrative. We closed our seed round two weeks after the new version went live. The bilingual capability alone was worth it — half our investors were Spanish-speaking.',
    name: 'Carlos M.',
    title: 'Co-founder, Fintech Startup',
    location: 'Miami, FL',
  },
  {
    quote:
      'We needed our immigration intake forms and client-facing website to be warm, accurate, and compliant. Eloy delivered all three. Our client conversion from inquiry to retained went up significantly.',
    name: 'Patricia R.',
    title: 'Managing Attorney, Immigration Law Firm',
    location: 'Houston, TX',
  },
  {
    quote:
      'Our Shopify store had traffic but no conversions. Eloy rebuilt our product descriptions, homepage copy, and email sequences. Revenue is up, bounce rate is down, and we\'re expanding to LATAM next quarter.',
    name: 'Diego F.',
    title: 'Founder, E-commerce Brand',
    location: 'Bogotá / New York',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="space-y-12 md:space-y-16 py-12 md:py-16">
      <h2 className="font-['Quattrocento'] text-4xl sm:text-5xl md:text-6xl text-center font-bold text-gradient text-gradient-secondary">
        Trusted by Startups and Legal Professionals Worldwide
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-0 md:gap-x-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className={`flex flex-col space-y-4 ${
              index > 0 ? 'md:border-l md:border-[#5F476B] md:pl-8' : 'md:pr-4'
            }`}
          >
            <p className="font-['Quattrocento'] text-base sm:text-lg leading-relaxed text-gray-300 italic">
              "{t.quote}"
            </p>
            <div className="mt-auto pt-4 border-t border-[#5F476B]">
              <p className="font-['Nunito_Sans'] font-semibold text-gradient text-gradient-primary text-sm">
                — {t.name}
              </p>
              <p className="font-['Nunito_Sans'] text-xs text-gray-400 mt-1">
                {t.title} · {t.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
