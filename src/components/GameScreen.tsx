
import React, { useRef, useEffect } from 'react';
import Character from './Character';
import MathProblem from './MathProblem';
import GameOverScreen from './GameOverScreen';
import { useGameLogic } from '../hooks/useGameLogic';
import GameBackground from './game/GameBackground';
import GameHUD from './game/GameHUD';
import JumpControls from './game/JumpControls';
import ComboDisplay from './game/ComboDisplay';
import JumpInstructions from './game/JumpInstructions';
import KeyboardControls from './game/KeyboardControls';
import { toast } from "sonner";

interface GameScreenProps {
  onReturnHome: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onReturnHome }) => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  const {
    gameState,
    isJumping,
    jumpHeight,
    isGameOver,
    comboDisplay,
    handleJump,
    handleRestart
  } = useGameLogic();
  
  // Show game instructions when the component mounts
  useEffect(() => {
    toast.info("Use Space/↑ for low jump, ↓ for medium jump, or Shift for high jump!", {
      duration: 5000,
    });
    
    // Make sure keyboard focus is set
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, []);

  return (
    <div 
      className="game-container" 
      tabIndex={0} 
      ref={gameContainerRef}
      onKeyDown={(e) => {
        // Prevent scrolling with arrow keys
        if (['ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
          e.preventDefault();
        }
      }}
    >
      {/* Background elements */}
      <GameBackground />
      
      {/* Game HUD */}
      <GameHUD
        score={gameState.score}
        combo={gameState.combo}
        lives={gameState.lives}
      />
      
      {/* Game area with running path */}
      <div className="relative w-full h-full flex flex-col overflow-hidden">
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
        <JumpControls onJump={handleJump} />
        
        {/* Keyboard controls */}
        <KeyboardControls 
          onJump={handleJump} 
          isActive={gameState.isRunning && !isGameOver}
        />
        
        {/* Combo display */}
        <ComboDisplay
          show={comboDisplay.show}
          value={comboDisplay.value}
          position={comboDisplay.position}
        />
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
      <JumpInstructions />
    </div>
  );
};

export default GameScreen;
