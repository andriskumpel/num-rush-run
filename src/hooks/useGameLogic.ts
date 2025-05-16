
import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, INITIAL_GAME_STATE, checkAnswer, generateNewProblem } from '../utils/gameUtils';
import { toast } from "sonner";

interface GameLogicReturn {
  gameState: GameState;
  isJumping: boolean;
  jumpHeight: number;
  targetHeight: number;
  isGameOver: boolean;
  comboDisplay: {
    show: boolean;
    value: number;
    position: number;
  };
  answerOptions: {value: number, height: number}[];
  handleJump: (height: number) => void;
  handleRestart: () => void;
}

export const useGameLogic = (onGameOver?: () => void): GameLogicReturn => {
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
    position: 50
  });

  const [isGameOver, setIsGameOver] = useState(false);
  const [answerOptions, setAnswerOptions] = useState<{value: number, height: number}[]>([]);
  const [lastProblemTime, setLastProblemTime] = useState(Date.now());

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
      const totalFrames = 30; // Increased for smoother animation
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
            Math.abs(option.height - height) < 50 // Increased collision threshold
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
              
              // Feedback for correct answer
              toast.success(`Correto! +${10 + Math.floor(newState.combo * 5)} pontos`);
              
              // Reset combo display
              setTimeout(() => {
                setComboDisplay(prev => ({ ...prev, show: false }));
              }, 1500);
            } else {
              // Feedback for wrong answer
              toast.error("Incorreto! -1 vida");
            }
            
            // Check for game over
            if (newState.lives <= 0) {
              setIsGameOver(true);
              toast.error("Fim de jogo!");
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

  // Game logic for generating problems
  useEffect(() => {
    if (!gameState.isRunning || isGameOver) return;
    
    const minProblemInterval = 8000; // At least 8 seconds between problems
    
    const problemInterval = setInterval(() => {
      const now = Date.now();
      
      // Only generate a new problem if enough time has passed
      if (now - lastProblemTime > minProblemInterval / gameState.speed) {
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
          setLastProblemTime(now);
        }, 1000);
      }
    }, 2000); // Check more frequently, but only generate problems on the right interval
    
    return () => {
      clearInterval(problemInterval);
    };
  }, [gameState.isRunning, gameState.score, gameState.speed, isGameOver, lastProblemTime]);

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
    setComboDisplay({ show: false, value: 0, position: 50 });
    setLastProblemTime(Date.now());
    setGameState({
      ...INITIAL_GAME_STATE,
      isRunning: true,
      currentProblem: generateNewProblem(0)
    });
    toast.info("Novo jogo iniciado!");
  };

  return {
    gameState,
    isJumping,
    jumpHeight,
    targetHeight,
    isGameOver,
    comboDisplay,
    answerOptions,
    handleJump,
    handleRestart
  };
};
