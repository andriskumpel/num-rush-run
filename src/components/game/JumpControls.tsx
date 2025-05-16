
import React from 'react';

interface JumpControlsProps {
  onJump: (height: number) => void;
}

const JumpControls: React.FC<JumpControlsProps> = ({ onJump }) => {
  return (
    <div className="jump-controls absolute bottom-4 right-4 z-40 flex flex-col gap-2">
      <button 
        className="p-4 bg-indigo-500 rounded-full opacity-70 text-white"
        onClick={() => onJump(300)}
      >
        Alto
      </button>
      <button 
        className="p-4 bg-indigo-500 rounded-full opacity-70 text-white"
        onClick={() => onJump(200)}
      >
        Médio
      </button>
      <button 
        className="p-4 bg-indigo-500 rounded-full opacity-70 text-white"
        onClick={() => onJump(100)}
      >
        Baixo
      </button>
    </div>
  );
};

export default JumpControls;
