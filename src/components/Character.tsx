
import React from 'react';
import Character3D from './Character3D';

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
        left: `calc(${leftPosition} - 3rem)`, 
        width: '6rem',
        height: '8rem'
      }}
    >
      <Character3D isRunning={isRunning} />
    </div>
  );
};

export default Character;
