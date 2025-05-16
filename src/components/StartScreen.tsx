
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-game-background to-purple-900 animate-fade-in relative">
      {/* Animated background */}
      <div className="stars absolute inset-0"></div>
      
      <div className="text-center mb-10 z-10">
        <div className="flex justify-center mb-6">
          <div className="w-64 h-auto animate-scale-in relative">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-2">NumRush</h1>
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl rounded-lg"></div>
          </div>
        </div>
        <p className="text-xl text-white mb-8">Resolva problemas matemáticos enquanto corre!</p>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-b from-indigo-900/80 to-purple-900/80 p-6 rounded-lg max-w-md mx-auto border border-indigo-400">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Como jogar:</h2>
            <ul className="text-left text-white space-y-3">
              <li className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 mr-2 text-white">1</span> 
                Problemas matemáticos aparecerão na tela
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 mr-2 text-white">2</span> 
                Mova-se para a pista com a resposta correta
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 mr-2 text-white">3</span> 
                Acumule pontos e aumente seus combos
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 mr-2 text-white">4</span> 
                Erros reduzem suas vidas
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onStart}
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-8 text-xl rounded-full shadow-lg hover:scale-105 transition-transform flex items-center space-x-2"
            >
              <span>INICIAR JOGO</span>
              <Play className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
