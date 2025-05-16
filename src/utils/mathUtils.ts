
export type Operation = 'addition' | 'subtraction' | 'multiplication';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface MathProblem {
  question: string;
  correctAnswer: number;
  options: number[];
  operation: Operation;
}

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateWrongAnswers = (correctAnswer: number, count: number): number[] => {
  const wrongAnswers: number[] = [];
  const range = Math.max(5, Math.floor(correctAnswer / 2));
  
  while (wrongAnswers.length < count) {
    const wrongAnswer = correctAnswer + getRandomInt(-range, range);
    if (wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer) && wrongAnswer > 0) {
      wrongAnswers.push(wrongAnswer);
    }
  }
  
  return wrongAnswers;
};

export const generateMathProblem = (
  difficulty: Difficulty,
  preferredOperation?: Operation
): MathProblem => {
  // Define ranges based on difficulty
  const ranges = {
    easy: { min: 1, max: 10 },
    medium: { min: 5, max: 20 },
    hard: { min: 10, max: 50 }
  };
  
  const range = ranges[difficulty];
  
  // Select operation
  const operations: Operation[] = ['addition', 'subtraction', 'multiplication'];
  const operation = preferredOperation || operations[getRandomInt(0, operations.length - 1)];
  
  // Generate numbers for the problem
  let num1: number, num2: number, correctAnswer: number;
  
  switch (operation) {
    case 'addition':
      num1 = getRandomInt(range.min, range.max);
      num2 = getRandomInt(range.min, range.max);
      correctAnswer = num1 + num2;
      break;
    case 'subtraction':
      num1 = getRandomInt(range.min, range.max);
      num2 = getRandomInt(range.min, Math.min(num1, range.max));
      correctAnswer = num1 - num2;
      break;
    case 'multiplication':
      num1 = getRandomInt(range.min, Math.floor(range.max / 2));
      num2 = getRandomInt(range.min, Math.floor(range.max / 2));
      correctAnswer = num1 * num2;
      break;
    default:
      num1 = getRandomInt(range.min, range.max);
      num2 = getRandomInt(range.min, range.max);
      correctAnswer = num1 + num2;
      operation = 'addition';
  }
  
  // Create question string
  const questionSymbols: Record<Operation, string> = {
    addition: '+',
    subtraction: '-',
    multiplication: '×'
  };
  
  const question = `${num1} ${questionSymbols[operation]} ${num2} = ?`;
  
  // Generate options (1 correct, 2 wrong)
  const wrongAnswers = generateWrongAnswers(correctAnswer, 2);
  const options = shuffleArray([correctAnswer, ...wrongAnswers]);
  
  return {
    question,
    correctAnswer,
    options,
    operation
  };
};

export const generateDifficulty = (score: number): Difficulty => {
  if (score < 5) return 'easy';
  if (score < 15) return 'medium';
  return 'hard';
};

export const getOperationByPreference = (score: number): Operation | undefined => {
  // Initially focus more on addition, gradually introduce other operations
  if (score < 3) return 'addition';
  if (score < 5) return Math.random() > 0.3 ? 'addition' : 'subtraction';
  if (score < 10) {
    const rand = Math.random();
    if (rand < 0.5) return 'addition';
    if (rand < 0.8) return 'subtraction';
    return 'multiplication';
  }
  return undefined; // Let it be completely random after score 10
};
