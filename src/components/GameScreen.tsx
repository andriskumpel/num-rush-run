
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
      {/* Temple Run Background */}
      <GameBackground />
      
      {/* Game HUD */}
      <GameHUD
        score={gameState.score}
        combo={gameState.combo}
        lives={gameState.lives}
      />
      
      {/* Temple Run Path */}
      <div className="relative w-full h-full flex flex-col overflow-hidden">
        {/* Add Temple Ruins */}
        <div className="temple-ruins absolute left-0 w-full z-10" style={{ bottom: '100px' }}>
          <div className="temple-column absolute left-[5%] h-32 w-8 bg-amber-800"></div>
          <div className="temple-column absolute left-[15%] h-40 w-8 bg-amber-800"></div>
          <div className="temple-column absolute left-[45%] h-36 w-8 bg-amber-800"></div>
          <div className="temple-column absolute left-[65%] h-28 w-8 bg-amber-800"></div>
          <div className="temple-column absolute left-[80%] h-32 w-8 bg-amber-800"></div>
        </div>
        
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
