import React from 'react';

const stats = [
  { value: '5+', label: 'Years of Legal & Copy Expertise' },
  { value: 'EN · ES', label: 'English & Spanish' },
  { value: '3', label: 'Verticals: Fintech · Immigration · E-commerce' },
];

export const EmpowerSection: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h2 className="font-['Quattrocento'] text-3xl sm:text-4xl md:text-5xl leading-snug font-bold text-gradient text-gradient-secondary">
          <strong>Legally Sound.<br />Strategically Sharp.<br />Globally Fluent.</strong>
        </h2>
        <p className="font-['Quattrocento'] text-xl sm:text-2xl md:text-3xl leading-relaxed md:leading-loose text-gradient text-gradient-secondary max-w-4xl mx-auto">
          Eloy is a lawyer and bilingual copywriter. That means your content isn't just engaging — it's accurate, compliant, and built to hold up under scrutiny. From pitch decks to immigration intake pages to fintech landing pages, EloyText crafts content that closes.
        </p>
      </div>

      {/* Trust Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border border-[#5F476B] rounded-[1.5rem] px-8 py-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center space-y-2 ${index > 0 ? 'sm:border-l sm:border-[#5F476B] sm:pl-6' : ''}`}
          >
            <span className="font-['Inria_Serif'] text-3xl sm:text-4xl font-bold text-gradient text-gradient-primary">
              {stat.value}
            </span>
            <span className="font-['Nunito_Sans'] text-sm sm:text-base text-gray-300 leading-snug">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
