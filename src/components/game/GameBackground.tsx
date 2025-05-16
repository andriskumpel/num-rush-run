
import React, { useEffect } from 'react';

const GameBackground: React.FC = () => {
  // Create stars in the background
  useEffect(() => {
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // Random size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 3 + Math.random() * 7;
        star.style.setProperty('--duration', `${duration}s`);
        
        starsContainer.appendChild(star);
      }
    }
  }, []);

  return (
    <>
      <div className="stars"></div>
      <div className="scrolling-ground"></div>
      <div className="running-path"></div>
    </>
  );
};

export default GameBackground;
