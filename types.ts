export enum GameId {
  PRESENTE = 'presente',
  PERFECTO = 'perfecto',
  IMPERFECTO = 'imperfecto',
  HORA = 'hora',
  AUDIO = 'audio',
  PREPOSICIONES = 'preposiciones',
  PUZZLE = 'puzzle',
  VOCABULARY = 'vocabulary',
  SURVEY = 'survey',
  DIALOGUE = 'dialogue'
}

export interface Question {
  id: string;
  questionArm: string;
  questionSp?: string;
  options?: string[];
  correctAnswer: string;
  explanationArm: string;
  explanationEng?: string; // Compares with English
  audioPhrase?: string; // String for speech synthesis
}

export interface PuzzleQuestion {
  id: string;
  sentenceArm: string;
  wordsSp: string[]; // Shuffled words to form sentence
  correctSentenceSp: string;
  explanationArm: string;
  explanationEng?: string;
}

export interface VocabularyPair {
  id: string;
  sp: string;
  arm: string;
  category: string;
}

export interface DialogueNode {
  id: string;
  characterArm: string;
  characterSp: string;
  textSp: string;
  textArm: string;
  options: {
    textArm: string;
    textSp: string;
    isCorrect: boolean;
  }[];
  explanationArm: string;
}

export interface PlayerStats {
  points: number;
  completedGames: { [key in GameId]?: boolean };
  currentGameScore: { [key in GameId]?: number };
  unlockedFeatures: string[];
}
