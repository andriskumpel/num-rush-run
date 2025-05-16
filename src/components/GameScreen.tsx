
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Character from './Character';
import MathProblem from './MathProblem';
import GameOverScreen from './GameOverScreen';
import { INITIAL_GAME_STATE, GameState, checkAnswer, generateNewProblem } from '../utils/gameUtils';

interface GameScreenProps {
  onReturnHome: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onReturnHome }) => {
  const [gameState, setGameState] = useState<GameState>({
    ...INITIAL_GAME_STATE,
    isRunning: true,
    currentProblem: generateNewProblem(0)
  });

  const [isJumping, setIsJumping] = useState(false);
  const [jumpHeight, setJumpHeight] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const jumpTimeoutRef = useRef<number | null>(null);
  
  const [comboDisplay, setComboDisplay] = useState<{ show: boolean; value: number; position: number }>({
    show: false,
    value: 0,
    position: 0
  });

  const [isGameOver, setIsGameOver] = useState(false);
  const [answerOptions, setAnswerOptions] = useState<{value: number, height: number}[]>([]);

  // Setup answer options positions
  useEffect(() => {
    if (gameState.currentProblem) {
      const newOptions = gameState.currentProblem.options.map((option, index) => ({
        value: option,
        height: (index + 1) * 100
      }));
      setAnswerOptions(newOptions);
    }
  }, [gameState.currentProblem]);

  const handleJump = useCallback((height: number) => {
    if (!isJumping && gameState.isRunning && !isGameOver) {
      setIsJumping(true);
      setTargetHeight(height);
      
      // Jump animation
      let jumpFrame = 0;
      const totalFrames = 20;
      const jumpInterval = setInterval(() => {
        jumpFrame++;
        if (jumpFrame <= totalFrames / 2) {
          // Going up
          setJumpHeight(height * (jumpFrame / (totalFrames / 2)));
        } else {
          // Coming down
          setJumpHeight(height * (1 - (jumpFrame - totalFrames / 2) / (totalFrames / 2)));
        }
        
        // Check for collision with answer options
        if (jumpFrame === totalFrames / 2) {
          const targetOption = answerOptions.find(option => 
            Math.abs(option.height - height) < 30
          );
          
          if (targetOption) {
            // Check if answer is correct
            const { isCorrect, newState } = checkAnswer(
              targetOption.value,
              gameState.currentProblem!,
              gameState
            );
            
            setGameState(newState);
            
            if (isCorrect) {
              setComboDisplay({
                show: true,
                value: newState.combo,
                position: 50
              });
              
              // Reset combo display
              setTimeout(() => {
                setComboDisplay(prev => ({ ...prev, show: false }));
              }, 1000);
            }
            
            // Check for game over
            if (newState.lives <= 0) {
              setIsGameOver(true);
              return;
            }
          }
        }
        
        if (jumpFrame >= totalFrames) {
          clearInterval(jumpInterval);
          setIsJumping(false);
          setJumpHeight(0);
        }
      }, 25);
      
      return () => {
        clearInterval(jumpInterval);
      };
    }
  }, [answerOptions, gameState, isGameOver, isJumping]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      // Small jump
      handleJump(100);
    } else if (e.code === 'ArrowDown') {
      e.preventDefault();
      // Medium jump
      handleJump(200);
    } else if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      e.preventDefault();
      // Large jump
      handleJump(300);
    }
  }, [handleJump]);

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
      // Hide problem temporarily
      setGameState(prev => ({ ...prev, showProblem: false }));
      
      // Generate new problem after a delay
      setTimeout(() => {
        const nextProblem = generateNewProblem(gameState.score);
        setGameState(prev => ({
          ...prev,
          currentProblem: nextProblem,
          showProblem: true
        }));
      }, 1000);
      
    }, 10000 / gameState.speed); // Problem interval decreases as speed increases
    
    return () => {
      clearInterval(problemInterval);
    };
  }, [gameState.isRunning, gameState.score, gameState.speed, isGameOver]);

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
    setIsJumping(false);
    setJumpHeight(0);
    setComboDisplay({ show: false, value: 0, position: 0 });
    setGameState({
      ...INITIAL_GAME_STATE,
      isRunning: true,
      currentProblem: generateNewProblem(0)
    });
  };

  const handleTouchJump = (height: number) => {
    handleJump(height);
  };

  // Add animated background with ground
  useEffect(() => {
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // Random size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 3 + Math.random() * 7;
        star.style.setProperty('--duration', `${duration}s`);
        
        starsContainer.appendChild(star);
      }
    }
  }, []);

  return (
    <div className="game-container">
      {/* Animated background */}
      <div className="stars"></div>
      <div className="scrolling-ground"></div>
      
      {/* Game HUD */}
      <div className="absolute top-0 left-0 right-0 flex justify-between p-4 z-40 bg-gradient-to-b from-black/80 to-transparent">
        <div className="text-white">
          <div className="text-lg">Pontos: <span className="font-bold">{gameState.score}</span></div>
          <div className="text-sm">Combo: <span className="font-bold text-yellow-300">{gameState.combo}x</span></div>
        </div>
        
        <div className="flex items-center">
          {[...Array(gameState.lives)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-red-500 rounded-full mx-1 animate-pulse"></div>
          ))}
        </div>
      </div>
      
      {/* Game area with running path */}
      <div className="relative w-full h-full flex flex-col overflow-hidden">
        {/* Running path */}
        <div className="running-path"></div>
        
        {/* Character */}
        <Character 
          isRunning={gameState.isRunning} 
          isJumping={isJumping} 
          jumpHeight={jumpHeight} 
        />
        
        {/* Math Problem */}
        {gameState.currentProblem && (
          <MathProblem 
            problem={gameState.currentProblem} 
            show={gameState.showProblem}
          />
        )}
        
        {/* Jump controls for mobile */}
        <div className="jump-controls absolute bottom-4 right-4 z-40 flex flex-col gap-2">
          <button 
            className="p-4 bg-indigo-500 rounded-full opacity-70 text-white"
            onClick={() => handleTouchJump(300)}
          >
            Alto
          </button>
          <button 
            className="p-4 bg-indigo-500 rounded-full opacity-70 text-white"
            onClick={() => handleTouchJump(200)}
          >
            Médio
          </button>
          <button 
            className="p-4 bg-indigo-500 rounded-full opacity-70 text-white"
            onClick={() => handleTouchJump(100)}
          >
            Baixo
          </button>
        </div>
        
        {/* Combo display */}
        {comboDisplay.show && (
          <div 
            className="combo-text text-yellow-300"
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
      
      {/* Jump instructions */}
      <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 rounded-full px-3 py-1 text-xs">
        Use Espaço/↑ (Jump Baixo), ↓ (Jump Médio) ou Shift (Jump Alto)
      </div>
    </div>
  );
};

export default GameScreen;
