
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
        width: '32px',
        height: '32px',
        transition: 'bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: 30
      }}
    >
      <div className="character-container">
        <div className={`character-body flex items-center justify-center ${isJumping ? 'rotate-character' : ''}`}>
          {/* Pixel Art Character */}
          <div className="pixel-character w-8 h-8 relative">
            {/* Head */}
            <div className="absolute top-0 left-0 w-8 h-4 bg-red-500"></div>
            
            {/* Face */}
            <div className="absolute top-1 left-1 w-2 h-1 bg-[#F97316]"></div>
            <div className="absolute top-1 right-1 w-2 h-1 bg-[#F97316]"></div>
            
            {/* Body */}
            <div className="absolute top-4 left-1 w-6 h-3 bg-red-600"></div>
            
            {/* Arms */}
            <div className="absolute top-4 left-0 w-1 h-3 bg-[#F97316]"></div>
            <div className="absolute top-4 right-0 w-1 h-3 bg-[#F97316]"></div>
            
            {/* Pants */}
            <div className="absolute top-7 left-1 w-6 h-1 bg-blue-600"></div>
            
            {/* Legs */}
            <div className="absolute bottom-0 left-1 w-2 h-2 bg-[#8B5CF6]"></div>
            <div className="absolute bottom-0 right-1 w-2 h-2 bg-[#8B5CF6]"></div>
          </div>
        </div>
        
        {isJumping && (
          <div className="jump-trail absolute w-full h-full">
            <div className="w-2 h-2 bg-white rounded-sm absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-70"></div>
            <div className="w-1 h-1 bg-white rounded-sm absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-50"></div>
            <div className="w-1 h-1 bg-white rounded-sm absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-30"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Character;
