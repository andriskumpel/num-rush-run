
import React from 'react';
import { Button } from '@/components/ui/button';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-game-background animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-bold mb-4 text-white">
          <span className="text-game-blue">Num</span>
          <span className="text-game-green">Rush</span>
        </h1>
        <p className="text-xl text-white mb-8">Resuelva problemas matemáticos mientras corre!</p>
        
        <div className="space-y-4">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-game-orange mb-4">Como jogar:</h2>
            <ul className="text-left text-white space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-game-green">1.</span> 
                Problemas matemáticos aparecerão na tela
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-game-green">2.</span> 
                Move para a pista com a resposta correta
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-game-green">3.</span> 
                Acumule pontos e aumente seus combos
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-game-green">4.</span> 
                Erros reduzem suas vidas
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onStart}
              className="bg-game-green hover:bg-game-green/90 text-white font-bold py-3 px-8 text-xl rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              INICIAR JOGO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
