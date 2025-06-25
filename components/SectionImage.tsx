

import React, { useState, useEffect } from 'react';

interface SectionImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string; // This will dictate object-fit primarily
  rounded?: string;
  animateZoom?: boolean;
  zoomDelayMs?: number;
  zoomDurationMs?: number;
  targetScale?: number;
}

export const SectionImage: React.FC<SectionImageProps> = ({
  src,
  alt,
  className = "w-full h-auto", // Default to responsive width and auto height
  imageClassName = "object-cover", // Default to object-cover
  rounded = "rounded-[1.875rem]", // Default rounding for images
  animateZoom = false,
  zoomDelayMs = 0,
  zoomDurationMs = 3000,
  targetScale = 1.2
}) => {
  const [currentScale, setCurrentScale] = useState(1);

  useEffect(() => {
    if (animateZoom) {
      const timer = setTimeout(() => {
        setCurrentScale(targetScale);
      }, zoomDelayMs);
      return () => clearTimeout(timer);
    }
  }, [animateZoom, zoomDelayMs, targetScale]);

  // Determine the final object-fit class.
  // If imageClassName is explicitly 'object-contain', use that.
  // Otherwise, default to 'object-cover object-center'.
  const finalObjectFitClass = imageClassName.includes('object-contain') 
    ? 'object-contain' 
    : 'object-cover object-center';

  return (
    <div className={`mx-auto overflow-hidden ${rounded} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${rounded} ${finalObjectFitClass} ${animateZoom ? 'transition-transform ease-in-out' : ''}`}
        style={{
          transform: `scale(${animateZoom ? currentScale : 1})`,
          transitionDuration: animateZoom ? `${zoomDurationMs}ms` : undefined,
        }}
      />
    </div>
  );
};
