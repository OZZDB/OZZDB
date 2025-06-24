
import React from 'react';
import { ServiceCard, ServiceCardProps } from './ServiceCard';

const services: ServiceCardProps[] = [
  {
    title: "Legal Drafting",
    description: [
      { text: "Position Your Brand for Legal & Global Success", isBold: true },
      { text: "Lay the foundation for a professional, credible, and scalable brand with our done-for-you Elite Legal Drafting & Copywriting Bundle designed to secure investor trust, ensure compliance, and drive sustainable growth. Backed by expertise in litigation support and legal drafting, we craft contracts, pleadings, motions, discovery documents, and compliance-driven agreements, including terms & conditions, disclaimers, and privacy policies. Every document is meticulously designed for clarity, precision, and strategic impact." },
      { text: "With the precision of a Legal Drafter - Copywriter.", isMarked: true, markColor: "text-white" }
    ]
  },
  {
    title: "Copywriting",
    description: [
      { text: "We can craft content that is clear, persuasive, compliant, and conversion-focused, whether for your website, policy, or pitch deck." },
      { text: "Persuasive Copywriting for Investor Confidence", isBold: true, className:"mt-4" },
      { text: "Refined brand messaging to establish authority, attract funding, and drive engagement." },
      { text: "💼 Enhance your brand visibility", isBold: true, className:"mt-4" },
      { text: "SEO-optimized to solidify trust and expand reach." isBold: true, className:"mt-4" },
      { text: "With the precision your brand deserves and your audience craves.", isMarked: true, markColor: "text-white" , className:"mt-4"}
    ]
  },
  {
    title: "Content Strategy",
    description: [
      { text: "Built for vision. Designed to scale. Content aligned with innovation and global growth.", isBold: true },
      { text: "We craft high-impact Spanish-English copywriting for SaaS platforms, fintech innovators, and AI-powered digital ventures, delivering search-intelligent blog content and precision-calibrated tone-of-voice consulting that amplify engagement, streamline messaging, and position your brand at the forefront of your industry." },
      { text: "We align your content strategy with innovation-driven growth and global market positioning.", isBold: true, className:"mt-4" },
      { text: "Crafted to seamlessly connect, convert, and elevate your business across borders.", isMarked: true, markColor: "text-white", className:"mt-4" }
    ]
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="space-y-12 md:space-y-16 py-12 md:py-16">
      <h2 className="font-['Quattrocento'] text-4xl sm:text-5xl md:text-6xl text-center font-bold text-gradient text-gradient-secondary">
        What We Offer
      </h2>
      <div className="border-t border-b border-[#5F476B] py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:gap-x-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title}
              title={service.title}
              description={service.description}
              className={index > 0 ? "md:border-l md:border-[#5F476B] md:pl-8" : "md:pr-4"}
              titleClassName="font-['Sedan'] text-3xl md:text-4xl tracking-wider leading-snug text-gradient text-gradient-primary mb-6"
              paragraphClassName="font-['Quattrocento'] text-base sm:text-lg leading-relaxed text-gradient text-gradient-primary text-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
