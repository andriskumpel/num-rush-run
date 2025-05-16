
import React from 'react';
import { Coins } from 'lucide-react';

interface GameHUDProps {
  score: number;
  combo: number;
  lives: number;
}

const GameHUD: React.FC<GameHUDProps> = ({ score, combo, lives }) => {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between p-4 z-40">
      <div className="text-white pixel-border bg-black bg-opacity-70 p-2">
        <div className="flex items-center">
          <Coins className="w-5 h-5 mr-1 text-yellow-300" />
          <span className="text-lg pixel-text">{score}</span>
        </div>
        <div className="text-sm pixel-text">Combo: <span className="font-bold text-yellow-300">{combo}x</span></div>
      </div>
      
      <div className="flex items-center pixel-border bg-black bg-opacity-70 p-2">
        {[...Array(lives)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-red-500 mx-1 pixel-heart"></div>
        ))}
      </div>
    </div>
  );
};

export default GameHUD;
