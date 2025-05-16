
import React from 'react';

const JumpInstructions: React.FC = () => {
  return (
    <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-70 pixel-border px-2 py-1 text-xs z-50">
      <span className="pixel-text">Space/↑ (Low Jump) | ↓ (Medium Jump) | Shift (High Jump)</span>
    </div>
  );
};

export default JumpInstructions;
