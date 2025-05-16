
import React from 'react';
import { Award } from 'lucide-react';

interface ComboDisplayProps {
  show: boolean;
  value: number;
  position: number;
}

const ComboDisplay: React.FC<ComboDisplayProps> = ({ show, value, position }) => {
  if (!show) return null;
  
  return (
    <div 
      className="combo-text pixel-text text-yellow-300 absolute z-50"
      style={{ left: `${position}%`, transform: 'translateX(-50%)', bottom: '45%' }}
    >
      {value > 1 ? (
        <div className="flex items-center">
          <Award className="w-5 h-5 mr-1 text-yellow-300" />
          <span className="pixel-text">x{value}!</span>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="pixel-text">+10!</span>
        </div>
      )}
    </div>
  );
};

export default ComboDisplay;
