
import React from 'react';
import { MathProblem as MathProblemType } from '../utils/mathUtils';

interface MathProblemProps {
  problem: MathProblemType;
  show: boolean;
}

const MathProblem: React.FC<MathProblemProps> = ({ problem, show }) => {
  return (
    <div className={`absolute top-10 left-0 right-0 z-30 transition-all duration-300 ${show ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'}`}>
      <div className="temple-block bg-amber-800 bg-opacity-90 p-3 mx-auto max-w-xs shadow-lg border-4 border-amber-900 animate-bounce-slow">
        <h3 className="text-4xl font-bold text-amber-100 mb-2 pixel-text">{problem.question}</h3>
      </div>
      <div className="mt-8 flex justify-center space-x-2 relative">
        {problem.options.map((option, index) => (
          <div
            key={index}
            className="answer-option temple-coin text-2xl font-bold text-amber-100 bg-gradient-to-br from-amber-500 to-amber-700 w-12 h-12 flex items-center justify-center rounded-full"
            style={{ 
              right: '-100px',
              bottom: `${(index + 1) * 100}px`,
              position: 'absolute',
              animation: `move-left-pixel 8s linear forwards, float-${index} 2s infinite alternate ease-in-out`
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
