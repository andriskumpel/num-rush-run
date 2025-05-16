
import React from 'react';
import { MathProblem as MathProblemType } from '../utils/mathUtils';

interface MathProblemProps {
  problem: MathProblemType;
  show: boolean;
}

const MathProblem: React.FC<MathProblemProps> = ({ problem, show }) => {
  return (
    <div className={`absolute top-10 left-0 right-0 z-30 transition-all duration-300 ${show ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'}`}>
      <div className="bg-white bg-opacity-90 rounded-xl p-4 mx-auto max-w-xs shadow-lg border-4 border-indigo-400 animate-bounce-slow">
        <h3 className="text-4xl font-bold text-indigo-800 mb-2">{problem.question}</h3>
      </div>
      <div className="mt-8 flex justify-center space-x-2 relative">
        {problem.options.map((option, index) => (
          <div
            key={index}
            className="answer-option text-2xl font-bold text-white bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-2 border-white"
            style={{ 
              right: '-100px',
              bottom: `${(index + 1) * 100}px`,
              position: 'absolute',
              animation: `move-left 10s linear forwards, float-${index} 2s infinite alternate ease-in-out`
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
