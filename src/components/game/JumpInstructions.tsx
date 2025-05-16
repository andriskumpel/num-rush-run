
import React from 'react';

const JumpInstructions: React.FC = () => {
  return (
    <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 rounded-full px-3 py-1 text-xs">
      Use Espaço/↑ (Jump Baixo), ↓ (Jump Médio) ou Shift (Jump Alto)
    </div>
  );
};

export default JumpInstructions;
