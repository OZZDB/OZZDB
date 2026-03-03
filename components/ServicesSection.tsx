import React from 'react';
import { ServiceCard, ServiceCardProps } from './ServiceCard';

const services: ServiceCardProps[] = [
  {
    title: 'Legal Drafting',
    description: [
      { text: 'Legally Sound. Strategically Sharp.', isBold: true },
      { text: 'Contracts, policies, intake forms, and compliance copy — drafted with the precision of a lawyer and the clarity of a copywriter. No jargon. No liability gaps. No second-guessing.' },
      { text: 'Pleadings, motions, discovery documents, terms & conditions, disclaimers, and privacy policies. Every document meticulously designed for clarity, precision, and strategic impact.', className: 'mt-3' },
      { text: 'Ideal for: Law Firms · Immigration Practices · Fintech Platforms · SaaS Companies', isMarked: true, markColor: 'text-white', className: 'mt-4' },
    ],
  },
  {
    title: 'Copywriting',
    description: [
      { text: 'Copy That Earns Trust Before You Say a Word.', isBold: true },
      { text: 'Landing pages, pitch decks, investor updates, and brand messaging — crafted in English and Spanish to move your audience from interested to convinced.' },
      { text: 'Bilingual precision. Zero dilution. SEO-optimized to solidify trust and expand reach.', isBold: true, className: 'mt-3' },
      { text: 'Ideal for: Startups · E-commerce Brands · Service Professionals · NGOs', isMarked: true, markColor: 'text-white', className: 'mt-4' },
    ],
  },
  {
    title: 'Content Strategy',
    description: [
      { text: 'Built for Scale. Designed to Cross Borders.', isBold: true },
      { text: 'A content strategy aligned with where your industry is going — AI, global markets, bilingual audiences. High-impact Spanish-English content for SaaS platforms, fintech innovators, and digital ventures.' },
      { text: 'We map your message to your market, then build the content system to sustain it.', isBold: true, className: 'mt-3' },
      { text: 'Ideal for: Scaling Startups · International Teams · Founders with a 12-Month Growth Horizon', isMarked: true, markColor: 'text-white', className: 'mt-4' },
    ],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="space-y-12 md:space-y-16 py-0">
      <h2 className="font-['Quattrocento'] text-4xl sm:text-5xl md:text-6xl text-center font-bold text-gradient text-gradient-secondary">
        What We Offer
      </h2>
      <div className="border-t border-b border-[#5F476B] py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:gap-x-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              className={index > 0 ? 'md:border-l md:border-[#5F476B] md:pl-8' : 'md:pr-4'}
              titleClassName="font-['Sedan'] text-3xl md:text-4xl tracking-wider leading-snug text-gradient text-gradient-primary mb-6 text-center"
              paragraphClassName="font-['Quattrocento'] text-base sm:text-lg leading-relaxed text-gradient text-gradient-primary text-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
