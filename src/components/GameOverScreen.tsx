
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onHome: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart, onHome }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-game-background p-8 rounded-xl shadow-xl max-w-md w-full text-center animate-scale-in">
        <h2 className="text-4xl font-bold text-white mb-4">Fim de Jogo!</h2>
        
        <div className="my-8">
          <p className="text-lg text-white mb-2">Sua pontuação:</p>
          <p className="text-5xl font-bold text-game-orange">{score}</p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={onRestart}
            className="w-full bg-game-green hover:bg-game-green/90 text-white font-bold py-3 px-6 text-lg rounded-full"
          >
            Jogar Novamente
          </Button>
          
          <Button
            onClick={onHome}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 text-lg rounded-full"
          >
            Voltar ao Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
