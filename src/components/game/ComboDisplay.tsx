
import React from 'react';

interface ComboDisplayProps {
  show: boolean;
  value: number;
  position: number;
}

const ComboDisplay: React.FC<ComboDisplayProps> = ({ show, value, position }) => {
  if (!show) return null;
  
  return (
    <div 
      className="combo-text text-yellow-300 text-shadow-lg absolute z-50"
      style={{ left: `${position}%`, transform: 'translateX(-50%)', bottom: '45%' }}
    >
      {value > 1 ? `Combo ${value}x!` : 'Correto!'}
    </div>
  );
};

export default ComboDisplay;
