
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

  // Create stars in the background on component mount
  useEffect(() => {
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
      // Clear existing stars first
      starsContainer.innerHTML = '';
      
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
  }, [gameScreen]);

  return (
    <div className="bg-gradient-to-b from-game-background to-purple-900 min-h-screen w-screen overflow-hidden relative">
      <div className="stars"></div>
      
      {gameScreen === 'start' ? (
        <StartScreen onStart={handleStartGame} />
      ) : (
        <GameScreen onReturnHome={handleReturnHome} />
      )}
      
      {/* Game instructions - make more visible */}
      {gameScreen === 'play' && (
        <div className="absolute bottom-2 right-2 text-white bg-black bg-opacity-70 rounded-full px-3 py-1 text-xs z-40">
          <span className="font-bold">🎮 Game Controls:</span> Use arrow keys to play
        </div>
      )}
    </div>
  );
};

export default Index;
