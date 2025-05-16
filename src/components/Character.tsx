
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
      style={{ 
        left: `calc(${leftPosition} - 2rem)`, 
        width: '4rem',
        height: '5rem'
      }}
    >
      <div className="character-container">
        <div className="character-body bg-blue-500 rounded-full flex items-center justify-center">
          <div className="character-face">
            <div className="eyes flex justify-center space-x-1">
              <div className="eye bg-white rounded-full w-2 h-2 flex items-center justify-center">
                <div className="bg-black rounded-full w-1 h-1"></div>
              </div>
              <div className="eye bg-white rounded-full w-2 h-2 flex items-center justify-center">
                <div className="bg-black rounded-full w-1 h-1"></div>
              </div>
            </div>
            <div className="mouth bg-red-400 rounded-full w-3 h-1 mt-1 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
