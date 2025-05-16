
import React from 'react';
import { MathProblem as MathProblemType } from '../utils/mathUtils';

interface MathProblemProps {
  problem: MathProblemType;
  show: boolean;
}

const MathProblem: React.FC<MathProblemProps> = ({ problem, show }) => {
  return (
    <div className={`absolute top-20 left-0 right-0 z-30 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white bg-opacity-90 rounded-xl p-4 mx-auto max-w-xs shadow-lg animate-scale-in">
        <h3 className="text-4xl font-bold text-game-background mb-2">{problem.question}</h3>
      </div>
      <div className="mt-6 flex justify-center space-x-2">
        {problem.options.map((option, index) => (
          <div
            key={index}
            className="text-2xl font-bold text-white bg-game-blue bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center"
            style={{ 
              left: `${index === 0 ? 25 : index === 1 ? 50 : 75}%`,
              transform: 'translateX(-50%)',
              position: 'absolute'
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MathProblem;
