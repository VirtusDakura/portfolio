import React from 'react';

/**
 * MobileTechMarquee
 * - Mobile-only, infinite right-to-left auto-scrolling marquee of tech logos/names
 * - Pauses on touch/hover
 * - Responsive and performant
 */
const techItems = [
  { name: 'React', img: '/src/assets/Project1.png' },
  { name: 'Vite', img: '/src/assets/Project2.png' },
  { name: 'Tailwind', img: '/src/assets/Project3.png' },
  { name: 'Node', img: '/src/assets/hero-image.png' },
  { name: 'Express', img: '/src/assets/About.jpg' },
  { name: 'TypeScript', img: '/src/assets/Project1.png' },
  { name: 'Jest', img: '/src/assets/Project2.png' },
  { name: 'GraphQL', img: '/src/assets/Project3.png' }
];

const MobileTechMarquee = () => {
  // Duplicate the array twice for seamless looping
  const duplicated = [...techItems, ...techItems];

  return (
    <div className="mobile-marquee block lg:hidden overflow-hidden mt-6">
      <div className="marquee-track will-change-transform flex items-center gap-6"
           role="list"
           aria-label="Technologies I use">
        {duplicated.map((t, i) => (
          <div key={`${t.name}-${i}`} className="marquee-item flex items-center gap-3 px-2">
            <img src={t.img} alt={t.name} className="w-8 h-8 object-contain rounded" />
            <span className="text-xs text-gray-200">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileTechMarquee;
