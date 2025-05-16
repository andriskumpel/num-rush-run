
import React, { useEffect } from 'react';

const GameBackground: React.FC = () => {
  // Create torches in the background
  useEffect(() => {
    const cloudsContainer = document.querySelector('.clouds');
    if (cloudsContainer) {
      cloudsContainer.innerHTML = ''; // Clear existing clouds
      
      for (let i = 0; i < 10; i++) {
        const torch = document.createElement('div');
        torch.classList.add('temple-torch');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 40;
        torch.style.left = `${x}%`;
        torch.style.top = `${y}%`;
        
        // Random speed for parallax effect
        const speed = 15 + Math.random() * 40;
        torch.style.setProperty('--torch-speed', `${speed}s`);
        
        cloudsContainer.appendChild(torch);
      }
    }
  }, []);

  return (
    <>
      <div className="temple-background">
        <div className="temple-sky"></div>
        <div className="temple-mountains"></div>
      </div>
      <div className="temple-torches"></div>
      <div className="scrolling-temple-ground"></div>
      <div className="temple-path"></div>
    </>
  );
};

export default GameBackground;
