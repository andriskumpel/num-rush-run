
import React from 'react';

interface GameHUDProps {
  score: number;
  combo: number;
  lives: number;
}

const GameHUD: React.FC<GameHUDProps> = ({ score, combo, lives }) => {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between p-4 z-40 bg-gradient-to-b from-black/80 to-transparent">
      <div className="text-white">
        <div className="text-lg">Pontos: <span className="font-bold">{score}</span></div>
        <div className="text-sm">Combo: <span className="font-bold text-yellow-300">{combo}x</span></div>
      </div>
      
      <div className="flex items-center">
        {[...Array(lives)].map((_, i) => (
          <div key={i} className="w-6 h-6 bg-red-500 rounded-full mx-1 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
};

export default GameHUD;
