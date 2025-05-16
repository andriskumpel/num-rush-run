
import React from 'react';

const JumpInstructions: React.FC = () => {
  return (
    <div className="absolute bottom-2 left-2 text-white bg-black pixel-border px-2 py-1 text-xs z-50">
      <span className="pixel-text">Espaço/↑ (Pulo Baixo) ↓ (Pulo Médio) Shift (Pulo Alto)</span>
    </div>
  );
};

export default JumpInstructions;
