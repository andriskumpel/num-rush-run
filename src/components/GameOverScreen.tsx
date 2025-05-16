
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onHome: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart, onHome }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-gradient-to-b from-indigo-800 to-purple-900 p-8 rounded-xl shadow-2xl max-w-md w-full text-center animate-scale-in border-4 border-indigo-300">
        <h2 className="text-4xl font-bold text-white mb-4">Fim de Jogo!</h2>
        
        <div className="my-8">
          <div className="flex justify-center mb-4">
            <Trophy className="text-yellow-400 w-16 h-16" />
          </div>
          <p className="text-lg text-white mb-2">Sua pontuação:</p>
          <p className="text-6xl font-bold text-yellow-300">{score}</p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-6 text-lg rounded-full"
          >
            Jogar Novamente
          </Button>
          
          <Button
            onClick={onHome}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-3 px-6 text-lg rounded-full"
          >
            Voltar ao Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
