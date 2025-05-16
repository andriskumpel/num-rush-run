
import React from 'react';

interface CharacterProps {
  lane: number;
  isRunning: boolean;
}

const Character: React.FC<CharacterProps> = ({ lane, isRunning }) => {
  const leftPosition = `${lane === 0 ? 25 : lane === 1 ? 50 : 75}%`;
  
  return (
    <div 
      className={`character ${isRunning ? 'animate-character-run' : ''}`}
      style={{ left: `calc(${leftPosition} - 2rem)` }}
    >
      <div className="character-body w-16 h-16 rounded-full bg-game-blue flex items-center justify-center">
        <div className="character-face w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <div className="character-eyes flex space-x-2">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
