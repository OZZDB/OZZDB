
import React from 'react';

export const EmpowerSection: React.FC = () => {
  return (
    <div className="text-center space-y-6">
      <h2 className="font-['Quattrocento'] text-3xl sm:text-4xl md:text-5xl leading-snug font-bold text-gradient text-gradient-secondary">
        <mark className="bg-transparent text-inherit">
          <strong>Empower Your Business<br />&amp;<br />Scale With Confidence</strong>
        </mark>
      </h2>
      <p className="font-['Quattrocento'] text-xl sm:text-2xl md:text-3xl leading-relaxed md:leading-loose text-gradient text-gradient-secondary max-w-4xl mx-auto">
        My Team and I specialize in turning convoluted legal jargon into plain language that empowers customers to agree with confidence, accelerating your sales cycle and building a foundation of trust from day one.
      </p>
    </div>
  );
};
