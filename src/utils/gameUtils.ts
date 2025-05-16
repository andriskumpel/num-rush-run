
import { generateMathProblem, generateDifficulty, getOperationByPreference, MathProblem } from './mathUtils';

export interface GameState {
  score: number;
  combo: number;
  lives: number;
  speed: number;
  lane: number;
  isRunning: boolean;
  currentProblem: MathProblem | null;
  showProblem: boolean;
}

export const INITIAL_GAME_STATE: GameState = {
  score: 0,
  combo: 0,
  lives: 3,
  speed: 1,
  lane: 1, // 0, 1, 2 for left, center, right
  isRunning: false,
  currentProblem: null,
  showProblem: false
};

export const getLanePosition = (lane: number, totalLanes: number = 3): number => {
  const positions = [25, 50, 75]; // percentage from left
  return positions[Math.min(Math.max(0, lane), totalLanes - 1)];
};

export const generateNewProblem = (score: number): MathProblem => {
  const difficulty = generateDifficulty(score);
  const preferredOperation = getOperationByPreference(score);
  return generateMathProblem(difficulty, preferredOperation);
};

export const calculatePoints = (combo: number): number => {
  // Base score + bonus for combos
  return 10 + Math.floor(combo * 5);
};

export const checkAnswer = (
  selectedLane: number,
  problem: MathProblem,
  state: GameState
): { isCorrect: boolean; newState: GameState } => {
  const selectedAnswer = problem.options[selectedLane];
  const isCorrect = selectedAnswer === problem.correctAnswer;
  
  let newState = { ...state };
  
  if (isCorrect) {
    const newCombo = state.combo + 1;
    const pointsGained = calculatePoints(state.combo);
    
    newState = {
      ...newState,
      score: state.score + pointsGained,
      combo: newCombo,
      speed: Math.min(2, 1 + newCombo * 0.05) // Cap speed at 2x
    };
  } else {
    newState = {
      ...newState,
      combo: 0,
      lives: state.lives - 1,
      speed: Math.max(1, state.speed - 0.2)
    };
  }
  
  return { isCorrect, newState };
};
