
import { useEffect, useCallback } from 'react';

interface KeyboardControlsProps {
  onJump: (height: number) => void;
  isActive: boolean;
}

const KeyboardControls: React.FC<KeyboardControlsProps> = ({ onJump, isActive }) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isActive) return;
    
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      // Small jump
      onJump(100);
    } else if (e.code === 'ArrowDown') {
      e.preventDefault();
      // Medium jump
      onJump(200);
    } else if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      e.preventDefault();
      // Large jump
      onJump(300);
    }
  }, [onJump, isActive]);

  // Set up key listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return null; // This component doesn't render anything
};

export default KeyboardControls;
