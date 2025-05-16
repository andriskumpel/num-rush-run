
import React from 'react';

const JumpInstructions: React.FC = () => {
  return (
    <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-70 rounded-full px-4 py-1 text-xs z-50">
      Espaço/↑ (Salto Baixo), ↓ (Salto Médio) ou Shift (Salto Alto)
    </div>
  );
};

export default JumpInstructions;
