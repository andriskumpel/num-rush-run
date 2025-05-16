
import React, { useState, useEffect, useCallback } from 'react';
import Character from './Character';
import MathProblem from './MathProblem';
import GameOverScreen from './GameOverScreen';
import { INITIAL_GAME_STATE, GameState, checkAnswer, generateNewProblem, getLanePosition } from '../utils/gameUtils';

interface GameScreenProps {
  onReturnHome: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onReturnHome }) => {
  const [gameState, setGameState] = useState<GameState>({
    ...INITIAL_GAME_STATE,
    isRunning: true,
    currentProblem: generateNewProblem(0)
  });

  const [laneStates, setLaneStates] = useState<('neutral' | 'correct' | 'wrong')[]>([
    'neutral', 'neutral', 'neutral'
  ]);
  
  const [comboDisplay, setComboDisplay] = useState<{ show: boolean; value: number; position: number }>({
    show: false,
    value: 0,
    position: 0
  });

  const [isGameOver, setIsGameOver] = useState(false);

  const handleMoveLane = useCallback((newLane: number) => {
    if (newLane >= 0 && newLane <= 2 && gameState.isRunning && !isGameOver) {
      setGameState(prevState => ({ ...prevState, lane: newLane }));
    }
  }, [gameState.isRunning, isGameOver]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        handleMoveLane(Math.max(0, gameState.lane - 1));
        break;
      case 'ArrowRight':
        handleMoveLane(Math.min(2, gameState.lane + 1));
        break;
      default:
        break;
    }
  }, [gameState.lane, handleMoveLane]);

  // Set up key listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Game logic for generating problems
  useEffect(() => {
    if (!gameState.isRunning || isGameOver) return;
    
    const problemInterval = setInterval(() => {
      if (gameState.currentProblem) {
        // Check answer based on current lane
        const { isCorrect, newState } = checkAnswer(gameState.lane, gameState.currentProblem, gameState);
        
        setGameState(newState);
        
        // Visual feedback for correct/wrong answer
        const newLaneStates = [...laneStates];
        newLaneStates[gameState.lane] = isCorrect ? 'correct' : 'wrong';
        setLaneStates(newLaneStates);
        
        if (isCorrect) {
          setComboDisplay({
            show: true,
            value: newState.combo,
            position: getLanePosition(gameState.lane)
          });
          
          // Reset combo display
          setTimeout(() => {
            setComboDisplay(prev => ({ ...prev, show: false }));
          }, 1000);
        }
        
        // Reset lane states after feedback
        setTimeout(() => {
          setLaneStates(['neutral', 'neutral', 'neutral']);
        }, 500);
        
        // Check for game over
        if (newState.lives <= 0) {
          setIsGameOver(true);
          return;
        }
        
        // Hide problem temporarily
        setGameState(prev => ({ ...prev, showProblem: false }));
        
        // Generate new problem after a delay
        setTimeout(() => {
          const nextProblem = generateNewProblem(newState.score);
          setGameState(prev => ({
            ...prev,
            currentProblem: nextProblem,
            showProblem: true
          }));
        }, 1000);
      }
    }, 3000 / gameState.speed); // Problem interval decreases as speed increases
    
    return () => {
      clearInterval(problemInterval);
    };
  }, [gameState.currentProblem, gameState.isRunning, gameState.lane, gameState.speed, isGameOver, laneStates]);

  // Initial setup - show first problem
  useEffect(() => {
    if (gameState.isRunning && !isGameOver) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, showProblem: true }));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.isRunning, isGameOver]);

  const handleRestart = () => {
    setIsGameOver(false);
    setLaneStates(['neutral', 'neutral', 'neutral']);
    setComboDisplay({ show: false, value: 0, position: 0 });
    setGameState({
      ...INITIAL_GAME_STATE,
      isRunning: true,
      currentProblem: generateNewProblem(0)
    });
  };

  const handleTouchLane = (laneIndex: number) => {
    handleMoveLane(laneIndex);
  };

  const laneClass = (index: number, state: 'neutral' | 'correct' | 'wrong') => {
    return `lane ${state === 'correct' ? 'correct' : state === 'wrong' ? 'wrong' : ''}`;
  };

  return (
    <div className="game-container">
      {/* Game HUD */}
      <div className="absolute top-0 left-0 right-0 flex justify-between p-4 z-40 bg-black bg-opacity-50">
        <div className="text-white">
          <div className="text-lg">Pontos: <span className="font-bold">{gameState.score}</span></div>
          <div className="text-sm">Combo: <span className="font-bold text-game-orange">{gameState.combo}x</span></div>
        </div>
        
        <div className="flex items-center">
          {[...Array(gameState.lives)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-game-red rounded-full mx-1"></div>
          ))}
        </div>
      </div>
      
      {/* Game area */}
      <div className="relative w-full h-full flex overflow-hidden">
        {/* Lanes */}
        <div className={laneClass(0, laneStates[0])} style={{ width: '33.33%' }} onClick={() => handleTouchLane(0)}></div>
        <div className={laneClass(1, laneStates[1])} style={{ width: '33.33%' }} onClick={() => handleTouchLane(1)}></div>
        <div className={laneClass(2, laneStates[2])} style={{ width: '33.33%' }} onClick={() => handleTouchLane(2)}></div>
        
        {/* Character */}
        <Character lane={gameState.lane} isRunning={gameState.isRunning} />
        
        {/* Math Problem */}
        {gameState.currentProblem && (
          <MathProblem 
            problem={gameState.currentProblem} 
            show={gameState.showProblem}
          />
        )}
        
        {/* Combo display */}
        {comboDisplay.show && (
          <div 
            className="combo-text text-game-green"
            style={{ left: `${comboDisplay.position}%`, transform: 'translateX(-50%)', bottom: '45%' }}
          >
            {comboDisplay.value > 1 ? `Combo ${comboDisplay.value}x!` : 'Correto!'}
          </div>
        )}
      </div>
      
      {/* Game over screen */}
      {isGameOver && (
        <GameOverScreen 
          score={gameState.score} 
          onRestart={handleRestart}
          onHome={onReturnHome}
        />
      )}
    </div>
  );
};

export default GameScreen;
