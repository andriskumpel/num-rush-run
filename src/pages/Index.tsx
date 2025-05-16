
import React, { useState } from 'react';
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

  return (
    <div className="bg-game-background min-h-screen w-screen overflow-hidden">
      {gameScreen === 'start' ? (
        <StartScreen onStart={handleStartGame} />
      ) : (
        <GameScreen onReturnHome={handleReturnHome} />
      )}
      
      {/* Game instructions - small icon at bottom */}
      {gameScreen === 'play' && (
        <div className="absolute bottom-2 left-2 text-white opacity-50 text-xs">
          Use as setas ← → para mover
        </div>
      )}
    </div>
  );
};

export default Index;
