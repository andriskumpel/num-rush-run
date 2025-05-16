
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
      {/* Personagem baseado no menino da logo */}
      <div className="character-body relative w-16 h-16">
        {/* Corpo */}
        <div className="absolute bottom-0 w-14 h-12 bg-blue-500 rounded-t-full mx-auto left-1"></div>
        
        {/* Cabeça */}
        <div className="absolute bottom-8 w-12 h-12 bg-amber-300 rounded-full mx-auto left-2">
          {/* Rosto */}
          <div className="flex justify-center items-center h-full">
            {/* Olhos */}
            <div className="flex space-x-4 mt-3">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
          </div>
          
          {/* Cabelo */}
          <div className="absolute top-0 w-12 h-6 bg-black rounded-t-full"></div>
        </div>
        
        {/* Braços */}
        <div className="absolute left-0 bottom-4 w-2 h-6 bg-amber-300 rounded-full rotate-12"></div>
        <div className="absolute right-0 bottom-4 w-2 h-6 bg-amber-300 rounded-full -rotate-12"></div>
        
        {/* Pernas */}
        <div className={`absolute left-3 bottom-0 w-2 h-6 bg-blue-700 ${isRunning ? 'animate-bounce' : ''}`}></div>
        <div className={`absolute right-3 bottom-0 w-2 h-6 bg-blue-700 ${isRunning ? 'animate-bounce delay-100' : ''}`}></div>
      </div>
    </div>
  );
};

export default Character;
