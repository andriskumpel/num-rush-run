
import React from 'react';

interface CharacterProps {
  isRunning: boolean;
  isJumping: boolean;
  jumpHeight: number;
}

const Character: React.FC<CharacterProps> = ({ isRunning, isJumping, jumpHeight }) => {
  return (
    <div 
      className={`character ${isRunning ? 'animate-character-run' : ''} ${isJumping ? 'jumping' : ''}`}
      style={{ 
        bottom: `${jumpHeight}px`,
        left: '20%',
        width: '4rem',
        height: '5rem',
        transition: 'bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: 30
      }}
    >
      <div className="character-container">
        <div className={`character-body bg-blue-500 rounded-full flex items-center justify-center ${isJumping ? 'rotate-character' : ''}`}>
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
        {isJumping && (
          <div className="jump-trail absolute w-full h-full">
            <div className="w-3 h-3 bg-blue-300 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-70"></div>
            <div className="w-2 h-2 bg-blue-200 rounded-full absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-50"></div>
            <div className="w-1 h-1 bg-blue-100 rounded-full absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-30"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Character;
