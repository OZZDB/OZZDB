
import React from 'react';

interface DescriptionPart {
  text: string;
  isBold?: boolean;
  isMarked?: boolean;
  markColor?: string; // e.g., "text-blue-400"
  className?: string;
}

export interface ServiceCardProps {
  title: string;
  description: DescriptionPart[];
  className?: string;
  titleClassName?: string;
  paragraphClassName?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, className, titleClassName, paragraphClassName }) => {
  return (
    <div className={`flex flex-col items-center ${className || ''}`}>
      <h3 className={`${titleClassName || "text-2xl font-semibold mb-4 text-gradient text-gradient-primary"}`}>
        {title}
      </h3>
      <div className={`${paragraphClassName || "text-center text-sm leading-relaxed text-gray-300"} space-y-3`}>
        {description.map((part, index) => (
          <p key={index} className={`${part.isBold ? 'font-bold' : ''} ${part.className || ''}`}>
            {part.isMarked ? (
              <mark className={`bg-transparent ${part.markColor || 'text-inherit'}`}>
                {part.text}
              </mark>
            ) : (
              part.text
            )}
          </p>
        ))}
      </div>
    </div>
  );
};
