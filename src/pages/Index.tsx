
import React, { useState, useEffect } from 'react';
import StartScreen from '@/components/StartScreen';
import GameScreen from '@/components/GameScreen';

const Index = () => {
  const [gameScreen, setGameScreen] = useState<'start' | 'play'>('start');

  const handleStartGame = () => {
    setGameScreen('play');
  };

  const handleReturnHome = () => {
    setGameScreen('start');
  };

  // Create temple fire particles in the background
  useEffect(() => {
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
      // Clear existing stars first
      starsContainer.innerHTML = '';
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Random size
        const size = Math.random() * 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 3 + Math.random() * 7;
        particle.style.setProperty('--duration', `${duration}s`);
        
        starsContainer.appendChild(particle);
      }
    }
  }, [gameScreen]);

  return (
    <div className="bg-gradient-to-b from-amber-900 to-amber-800 min-h-screen w-screen overflow-hidden relative">
      <div className="stars"></div>
      
      {gameScreen === 'start' ? (
        <StartScreen onStart={handleStartGame} />
      ) : (
        <GameScreen onReturnHome={handleReturnHome} />
      )}
      
      {/* Game instructions - make more visible */}
      {gameScreen === 'play' && (
        <div className="absolute bottom-2 right-2 text-amber-200 bg-amber-900 bg-opacity-70 rounded-full px-3 py-1 text-xs z-40">
          <span className="font-bold">🏃 Temple Run:</span> Use Space/↑/↓/Shift keys to jump
        </div>
      )}
    </div>
  );
};

export default Index;
