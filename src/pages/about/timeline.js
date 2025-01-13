import React, { useEffect, useRef, useState } from 'react';

export const Timeline = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !lineRef.current) return;

      const targetY = window.innerHeight * 0.8;
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const sections = timelineRef.current.querySelectorAll('.timeline__section');
      
      // Update line height
      const dist = targetY - timelineRect.top;
      if (dist > 0) {
        lineRef.current.style.height = `${Math.min(dist, timelineRef.current.offsetHeight)}px`;
      }

      // Update visible sections
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top + section.offsetHeight / 5 < targetY) {
          setVisibleSections(prev => Array.from(new Set([...prev, index])));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineData = [
    {
      year: "1902",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut enim sunt modi qui cum eveniet magni iure laudantium vitae."
    },
    {
      year: "1934",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut enim sunt modi qui cum eveniet magni iure laudantium vitae."
    },
    {
      year: "1999",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut enim sunt modi qui cum eveniet magni iure laudantium vitae."
    },
    {
      year: "2001",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut enim sunt modi qui cum eveniet magni iure laudantium vitae."
    },
    {
      year: "2005",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut enim sunt modi qui cum eveniet magni iure laudantium vitae."
    }
  ];

  return (
    <div className="timeline-container">
      <div className="timeline-top-section">
        <h1 className="timeline-heading">Animated Timeline</h1>
        <p className="timeline-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam accusantium cumque quos.</p>
      </div>
      
      <div className="timeline" ref={timelineRef}>
        <div className="timeline__line" ref={lineRef} />
        
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`timeline__section ${visibleSections.includes(index) ? 'show-me' : ''}`}
            style={{
              opacity: visibleSections.includes(index) ? 1 : 0,
              transform: visibleSections.includes(index) 
                ? 'none' 
                : `translateX(${index % 2 === 0 ? '-100%' : '100%'})`
            }}
          >
            <div className="timeline__section__bead" />
            <div className="timeline__section__content">
              <h2 className="timeline-year">{item.year}</h2>
              <p className="timeline-content">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;