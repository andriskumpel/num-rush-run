
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
        width: '48px',
        height: '48px',
        transition: 'bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: 30
      }}
    >
      <div className="character-container">
        <div className={`character-body flex items-center justify-center ${isJumping ? 'rotate-character' : ''}`}>
          {/* Temple Run style character */}
          <div className="pixel-character relative w-12 h-12">
            {/* Head */}
            <div className="absolute top-0 left-2 w-8 h-4 bg-amber-700"></div>
            
            {/* Explorer Hat */}
            <div className="absolute top-0 left-2 w-8 h-2 bg-amber-800 rounded-t-lg"></div>
            <div className="absolute top-0 left-1 w-10 h-1 bg-amber-900 rounded-t-lg"></div>
            
            {/* Face */}
            <div className="absolute top-2 left-3 w-2 h-1 bg-amber-200"></div>
            <div className="absolute top-2 right-3 w-2 h-1 bg-amber-200"></div>
            
            {/* Body - Temple Explorer */}
            <div className="absolute top-4 left-2 w-8 h-4 bg-amber-600"></div>
            
            {/* Arms */}
            <div className="absolute top-4 left-0 w-2 h-3 bg-amber-700"></div>
            <div className="absolute top-4 right-0 w-2 h-3 bg-amber-700"></div>
            
            {/* Pants */}
            <div className="absolute top-8 left-2 w-8 h-2 bg-amber-900"></div>
            
            {/* Legs */}
            <div className="absolute bottom-0 left-3 w-2 h-2 bg-amber-800"></div>
            <div className="absolute bottom-0 right-3 w-2 h-2 bg-amber-800"></div>
            
            {/* Backpack */}
            <div className="absolute top-5 right-0 w-2 h-3 bg-amber-500"></div>
          </div>
        </div>
        
        {isJumping && (
          <div className="jump-trail absolute w-full h-full">
            <div className="w-3 h-3 bg-amber-200 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-70"></div>
            <div className="w-2 h-2 bg-amber-200 rounded-full absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-50"></div>
            <div className="w-1 h-1 bg-amber-200 rounded-full absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-30"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Character;
