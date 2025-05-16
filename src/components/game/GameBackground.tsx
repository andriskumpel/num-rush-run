
import React, { useEffect } from 'react';

const GameBackground: React.FC = () => {
  // Create cloud blocks in the background
  useEffect(() => {
    const cloudsContainer = document.querySelector('.clouds');
    if (cloudsContainer) {
      cloudsContainer.innerHTML = ''; // Clear existing clouds
      
      for (let i = 0; i < 10; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 40;
        cloud.style.left = `${x}%`;
        cloud.style.top = `${y}%`;
        
        // Random speed for parallax effect
        const speed = 15 + Math.random() * 40;
        cloud.style.setProperty('--cloud-speed', `${speed}s`);
        
        cloudsContainer.appendChild(cloud);
      }
    }
  }, []);

  return (
    <>
      <div className="clouds"></div>
      <div className="scrolling-ground"></div>
      <div className="running-path"></div>
      <div className="pixel-mountains"></div>
    </>
  );
};

export default GameBackground;
