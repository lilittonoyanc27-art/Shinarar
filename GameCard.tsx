import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Clock,
  LayoutGrid,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react';
import { GameId, Question, PuzzleQuestion, VocabularyPair, DialogueNode } from './types';
import {
  PRESENTE_QUESTIONS,
  PERFECTO_QUESTIONS,
  IMPERFECTO_QUESTIONS,
  HORA_QUESTIONS,
  AUDIO_QUESTIONS,
  PREPOSICIONES_QUESTIONS,
  PUZZLE_QUESTIONS,
  VOCABULARY_WORDS,
  SURVEY_QUESTIONS,
  DIALOGUE_STEPS
} from './lessons';
import { speakSpanish, playCorrectSound, playIncorrectSound, playHammerSound } from './audio';

interface GameCardProps {
  gameId: GameId;
  onCorrectAnswer: (pointsEarned: number, logMessage: string) => void;
  onBackToDashboard: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ gameId, onCorrectAnswer, onBackToDashboard }) => {
  // Question navigation states
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Vocabulary specific states
  const [vocabCards, setVocabCards] = useState<{ id: string; text: string; lang: 'sp' | 'arm'; matched: boolean }[]>([]);
  const [selectedVocabCard, setSelectedVocabCard] = useState<number | null>(null); // Index in vocabCards
  const [vocabMatchesCount, setVocabMatchesCount] = useState<number>(0);

  // Puzzle specific states
  const [puzzleSelectedWords, setPuzzleSelectedWords] = useState<string[]>([]);
  const [puzzleAvailableWords, setPuzzleAvailableWords] = useState<string[]>([]);

  // Score stats for the current session
  const [localScore, setLocalScore] = useState<number>(0);
  const [completedGameSession, setCompletedGameSession] = useState<boolean>(false);

  // Load / Setup current game questions
  const getQuestionsList = (): any[] => {
    switch (gameId) {
      case GameId.PRESENTE: return PRESENTE_QUESTIONS;
      case GameId.PERFECTO: return PERFECTO_QUESTIONS;
      case GameId.IMPERFECTO: return IMPERFECTO_QUESTIONS;
      case GameId.HORA: return HORA_QUESTIONS;
      case GameId.AUDIO: return AUDIO_QUESTIONS;
      case GameId.PREPOSICIONES: return PREPOSICIONES_QUESTIONS;
      case GameId.PUZZLE: return PUZZLE_QUESTIONS;
      case GameId.SURVEY: return SURVEY_QUESTIONS;
      case GameId.DIALOGUE: return DIALOGUE_STEPS;
      default: return [];
    }
  };

  const questions = getQuestionsList();
  const currentQuestion = questions[currentIdx];

  // Initialize helper state for specific games
  useEffect(() => {
    resetQuestionState();
    
    // Setup Vocabulary Matching Game
    if (gameId === GameId.VOCABULARY) {
      setupVocabularyGame();
    }
  }, [gameId, currentIdx]);

  // Special audio cue on Audio Game load
  useEffect(() => {
    if (gameId === GameId.AUDIO && currentQuestion && !isAnswered) {
      // Small timeout to give user moment to focus
      const timer = setTimeout(() => {
        handlePlayTTS((currentQuestion as Question).audioPhrase || '');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [gameId, currentIdx]);

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowExplanation(false);
    
    // If Puzzle Game, setup word lists
    if (gameId === GameId.PUZZLE && currentQuestion) {
      const q = currentQuestion as PuzzleQuestion;
      setPuzzleSelectedWords([]);
      // Shuffle wordsSp
      setPuzzleAvailableWords([...q.wordsSp].sort(() => Math.random() - 0.5));
    }
  };

  const setupVocabularyGame = () => {
    // Pick 5 random words from Vocab List
    const shuffled = [...VOCABULARY_WORDS].sort(() => Math.random() - 0.5).slice(0, 5);
    const cardsList: typeof vocabCards = [];
    
    shuffled.forEach(item => {
      cardsList.push({ id: item.id, text: item.sp, lang: 'sp', matched: false });
      cardsList.push({ id: item.id, text: item.arm, lang: 'arm', matched: false });
    });

    // Shuffle cards complete list
    setVocabCards(cardsList.sort(() => Math.random() - 0.5));
    setVocabMatchesCount(0);
    setSelectedVocabCard(null);
    setCompletedGameSession(false);
  };

  const handlePlayTTS = (phrase: string) => {
    speakSpanish(phrase);
  };

  // Standard multi choice selection submit
  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (isAnswered || !selectedOption) return;

    const answer = currentQuestion.correctAnswer;
    const isAnsCorrect = selectedOption === answer;

    setIsCorrect(isAnsCorrect);
    setIsAnswered(true);
    setShowExplanation(true);

    if (isAnsCorrect) {
      playCorrectSound();
      setLocalScore(prev => prev + 1);
      // Construct a fun construction message
      const items = ['Աղյուս դրվեց', 'Ցեմենտ լցվեց', 'Դուռը չափվեց', 'Տանիքի սալիկ դրվեց', 'Հիմքն ամրացավ'];
      const randomItem = items[Math.floor(Math.random() * items.length)];
      onCorrectAnswer(12, `✅ Ճիշտ է: ${randomItem}! (+12% Շինարարություն)`);
    } else {
      playIncorrectSound();
    }
  };

  // Puzzle tiles management
  const handleWordTileClick = (word: string, fromSelected: boolean) => {
    if (isAnswered) return;
    playHammerSound();
    if (fromSelected) {
      setPuzzleSelectedWords(prev => prev.filter(w => w !== word));
      setPuzzleAvailableWords(prev => [...prev, word]);
    } else {
      setPuzzleAvailableWords(prev => prev.filter(w => w !== word));
      setPuzzleSelectedWords(prev => [...prev, word]);
    }
  };

  const handleSubmitPuzzle = () => {
    if (isAnswered) return;
    const q = currentQuestion as PuzzleQuestion;
    const formedSentence = puzzleSelectedWords.join(' ');
    const isAnsCorrect = formedSentence.trim().toLowerCase() === q.correctSentenceSp.trim().toLowerCase();

    setIsCorrect(isAnsCorrect);
    setIsAnswered(true);
    setShowExplanation(true);

    if (isAnsCorrect) {
      playCorrectSound();
      setLocalScore(prev => prev + 1);
      onCorrectAnswer(15, '🧱 Ճիշտ է: Պատի նոր շարք կառուցվեց: (+15% Շինարարություն)');
    } else {
      playIncorrectSound();
    }
  };

  // Vocab card matching logic
  const handleVocabCardClick = (idx: number) => {
    if (vocabCards[idx].matched) return;
    playHammerSound();

    if (selectedVocabCard === null) {
      setSelectedVocabCard(idx);
    } else {
      const firstCard = vocabCards[selectedVocabCard];
      const secondCard = vocabCards[idx];

      if (selectedVocabCard === idx) {
        // Toggle off
        setSelectedVocabCard(null);
        return;
      }

      // If matching different language systems with same ID
      if (firstCard.id === secondCard.id && firstCard.lang !== secondCard.lang) {
        // MATCH found!
        playCorrectSound();
        const updated = [...vocabCards];
        updated[selectedVocabCard].matched = true;
        updated[idx].matched = true;
        setVocabCards(updated);
        setSelectedVocabCard(null);
        setVocabMatchesCount(prev => {
          const newCount = prev + 1;
          if (newCount === 5) {
            setCompletedGameSession(true);
            onCorrectAnswer(20, '🏗️ Հիանալի է: Բառապաշարի կռունկը տեղադրեց բոլոր բլոկները: (+20% Շինարարություն)');
          }
          return newCount;
        });
      } else {
        // Mismatch - shake/blink
        playIncorrectSound();
        setSelectedVocabCard(null);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCompletedGameSession(true);
    }
  };

  // Dynamic titles and icons for 10 games
  const getGameHeaders = () => {
    switch (gameId) {
      case GameId.PRESENTE:
        return {
          title: 'Ներկա ժամանակ (Presente)',
          emoji: '👷',
          desc: 'Օգնիր շինարարներին ներկա ժամանակի ճիշտ խոնարհումներով:'
        };
      case GameId.PERFECTO:
        return {
          title: 'Անցյալ վաղակատար (Pretérito Perfecto)',
          emoji: '🧱',
          desc: 'Ավարտված աշխատանքներ վերջերս՝ «Haber» օժանդակ բայով:'
        };
      case GameId.IMPERFECTO:
        return {
          title: 'Անցյալ անկատար (Pretérito Imperfecto)',
          emoji: '🏚️',
          desc: 'Նախկին սովորություններ կամ անցյալ նկարագրություններ:'
        };
      case GameId.HORA:
        return {
          title: 'Ժամանակը իսպաներենում (La Hora)',
          emoji: '⏰',
          desc: 'Ժամերի ճիշտ արտահայտումներ և շինարարության գրաֆիկներ:'
        };
      case GameId.AUDIO:
        return {
          title: 'Լսողական վիկտորինա (Comprensión Auditiva)',
          emoji: '🎧',
          desc: 'Լսիր իսպաներեն արտահայտությունը և ընտրիր ճիշտ հայերեն թարգմանությունը:'
        };
      case GameId.PREPOSICIONES:
        return {
          title: 'Նախդիրների խաղ (Preposiciones)',
          emoji: '🗺️',
          desc: 'Օգտագործիր ճիշտ նախդիրները և համեմատիր դրանց կիրառումը անգլերենի հետ:'
        };
      case GameId.PUZZLE:
        return {
          title: 'Նախադասության Փազլ (Rompecabezas)',
          emoji: '🧩',
          desc: 'Հավաքիր իսպաներեն նախադասությունները տրված բառերից:'
        };
      case GameId.VOCABULARY:
        return {
          title: 'Բառապաշարի կռունկ (Maquinaria de Palabras)',
          emoji: '🏗️',
          desc: 'Միացրեք համապատասխան իսպաներեն և հայերեն շինարարական բառերը:'
        };
      case GameId.SURVEY:
        return {
          title: 'Քերականական քննություն (Survey)',
          emoji: '📋',
          desc: 'Ճիշտ թե Սխալ: Կարևոր տարբերություններ հայերենի, իսպաներենի ու անգլերենի միջև:'
        };
      case GameId.DIALOGUE:
        return {
          title: 'Երկխոսություն Կարլոսի հետ (Diálogos)',
          emoji: '🗣️',
          desc: 'Խոսիր ճարտարապետ Կարլոսի հետ և կատարիր նրա հանձնարարությունները:'
        };
    }
  };

  const header = getGameHeaders();

  return (
    <div id={`game_panel_${gameId}`} className="bg-white border-3 border-slate-900 rounded-xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-hidden flex flex-col min-h-[580px]">
      {/* Header Panel */}
      <div className="bg-slate-800 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-slate-900">
        <div className="flex items-center gap-4">
          <span className="text-3xl sm:text-4xl filter drop-shadow">{header?.emoji}</span>
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold font-sans text-amber-400 flex items-center gap-1.5 leading-snug">
              {header?.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-250">{header?.desc}</p>
          </div>
        </div>
        <button
          onClick={onBackToDashboard}
          className="bg-red-600 hover:bg-red-700 font-mono text-white text-sm font-bold px-4 py-2 rounded-lg border-2 border-red-950 transition-all flex items-center justify-center gap-1.5 active:translate-y-0.5 self-end sm:self-auto min-w-[100px]"
        >
          ✕ ԵԼՔ
        </button>
      </div>

      {/* Progress tracking along the top */}
      {gameId !== GameId.VOCABULARY && !completedGameSession && (
        <div className="bg-slate-100 px-5 py-3 border-b flex justify-between items-center text-sm font-mono text-slate-700 font-bold">
          <span>Հարց {currentIdx + 1} / {questions.length}</span>
          <div className="w-24 sm:w-40 bg-slate-300 h-2.5 rounded-full overflow-hidden border">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-emerald-600 font-bold">Ճիշտ՝ {localScore}</span>
        </div>
      )}

      {/* Main Game Screen */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {!completedGameSession ? (
            <motion.div
              key={currentIdx}
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -15, opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              {/* --- VOCABULARY MATCHING GRID MODE --- */}
              {gameId === GameId.VOCABULARY ? (
                <div className="flex-1 flex flex-col gap-4">
                  <div className="bg-sky-50 border-2 border-sky-200 text-sky-950 p-3 sm:p-4 rounded-xl text-center text-sm">
                    💡 Միացրեք <b>իսպաներեն</b> և <b>հայերեն</b> համապատասխան բլոկները։ Մեկ զույգն ավարտելուց հետո կլսեք ձայնը։
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-auto">
                    {vocabCards.map((card, idx) => (
                      <button
                        key={idx}
                        disabled={card.matched}
                        onClick={() => handleVocabCardClick(idx)}
                        className={`p-4 sm:p-5 rounded-2xl font-bold border-3 text-sm sm:text-base md:text-lg transition-all focus:outline-none flex items-center justify-center min-h-[70px] cursor-pointer break-words whitespace-normal text-center ${
                          card.matched
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-700 opacity-60'
                            : selectedVocabCard === idx
                            ? 'bg-amber-400 border-amber-600 text-slate-900 scale-102 shadow-md'
                            : card.lang === 'sp'
                            ? 'bg-blue-50 hover:bg-blue-100 border-blue-400 text-blue-900'
                            : 'bg-rose-50 hover:bg-rose-100 border-rose-400 text-rose-900 font-sans'
                        }`}
                      >
                        {card.matched ? '✅ ԿԱՊՎԵՑ' : card.text}
                      </button>
                    ))}
                  </div>

                  <div className="text-center font-mono text-sm text-slate-500 font-bold">
                    Կատարված է՝ {vocabMatchesCount} աղյուս / 5 զույգ
                  </div>
                </div>
              ) : (
                /* --- QUESTION CARD / PUZZLE MODULES --- */
                <div className="flex-1 flex flex-col justify-between gap-5">
                  
                  {/* Speaker Pronounce Widget for all Spanish phases (Highly beneficial for learners) */}
                  {currentQuestion.audioPhrase && (
                    <div className="flex items-center gap-2 self-end">
                      <button
                        onClick={() => handlePlayTTS(currentQuestion.audioPhrase || '')}
                        className="px-4 py-2.5 rounded bg-orange-50 hover:bg-orange-100 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2 text-sm font-black font-mono cursor-pointer"
                        title="Լսել ճիշտ արտասանությունը"
                      >
                        <Volume2 className="w-4.5 h-4.5" />
                        <span>ԱՐՏԱՍԱՆԵԼ (ESCUCHAR)</span>
                      </button>
                    </div>
                  )}

                  {/* Character/Dialogue Carlos view */}
                  {gameId === GameId.DIALOGUE && (
                    <div className="flex items-start gap-4 bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5">
                      <div className="w-12 h-12 rounded-full bg-amber-500 border-2 border-amber-950 flex items-center justify-center text-2xl font-bold shrink-0">
                        👷
                      </div>
                      <div className="font-sans">
                        <span className="block text-xs sm:text-sm font-mono font-bold text-amber-700 uppercase">
                          {currentQuestion.characterArm} ({currentQuestion.characterSp})
                        </span>
                        <p className="text-slate-800 text-base md:text-lg font-semibold italic mt-1 leading-relaxed">
                          «{currentQuestion.textArm}»
                        </p>
                        <p className="text-slate-600 text-sm md:text-base mt-1.5">
                          «{currentQuestion.textSp}»
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Question Prompt Label */}
                  {gameId !== GameId.DIALOGUE && (
                    <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 shadow-sm">
                      <span className="text-xs font-mono font-bold text-slate-450 uppercase tracking-widest block mb-1">
                        Հարցում / Context
                      </span>
                      <p className="text-slate-800 font-extrabold text-base sm:text-lg md:text-xl font-sans leading-relaxed">
                        {currentQuestion.questionArm}
                      </p>
                    </div>
                  )}

                  {/* Context sentence with filling blank (Sp) */}
                  {currentQuestion.questionSp && (
                    <div className="text-center p-4 sm:p-5 bg-amber-50/55 border border-amber-100 rounded-xl my-2">
                      <span className="text-xs font-mono font-bold text-amber-700 uppercase block mb-1">
                        Լրացրեք բացթողումը
                      </span>
                      <p className="text-xl sm:text-2xl font-black font-mono text-slate-900 tracking-wide break-words">
                        {currentQuestion.questionSp.replace('___', '______')}
                      </p>
                    </div>
                  )}

                  {/* --- PUZZLE INTERACTIVE VIEW --- */}
                  {gameId === GameId.PUZZLE ? (
                    <div className="flex flex-col gap-4 py-2">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[80px] flex flex-wrap gap-2 items-center overflow-x-auto">
                        {puzzleSelectedWords.length === 0 ? (
                          <span className="text-slate-400 text-sm font-mono italic">
                            Կտտացրեք ներքևի բլոկներին՝ նախադասություն հավաքելու համար...
                          </span>
                        ) : (
                          puzzleSelectedWords.map((word, idx) => (
                            <button
                              key={idx}
                              disabled={isAnswered}
                              onClick={() => handleWordTileClick(word, true)}
                              className="px-3.5 py-2 bg-amber-400 border-2 border-amber-600 text-slate-800 rounded-lg font-mono font-bold text-sm sm:text-base shadow hover:bg-amber-300 cursor-pointer transition-transform active:scale-95 break-words"
                            >
                              {word}
                            </button>
                          ))
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center py-2 max-w-full">
                        {puzzleAvailableWords.map((word, idx) => (
                          <button
                            key={idx}
                            disabled={isAnswered}
                            onClick={() => handleWordTileClick(word, false)}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border-2 border-slate-350 text-slate-800 rounded-lg font-mono font-bold text-sm sm:text-base shadow cursor-pointer transition-transform active:scale-95 break-words"
                          >
                            {word}
                          </button>
                        ))}
                      </div>

                      {!isAnswered && (
                        <button
                          onClick={handleSubmitPuzzle}
                          disabled={puzzleSelectedWords.length === 0}
                          className="mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-mono font-bold text-sm sm:text-base py-3 sm:py-3.5 rounded-xl border-2 border-emerald-900 transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          ՀԱՍՏԱՏԵԼ ՊԱՏԱՍԽԱՆԸ
                        </button>
                      )}
                    </div>
                  ) : (
                    /* --- MULTI CHOICE OPTIONS LIST (Standard & Dialogue) --- */
                    <div className="flex flex-col gap-3">
                      {gameId === GameId.DIALOGUE ? (
                        /* Dialogue choices */
                        ((currentQuestion as DialogueNode).options || []).map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectOption(opt.textSp)}
                            className={`p-4 md:p-5 rounded-xl text-left border-2 transition-all flex flex-col gap-1.5 cursor-pointer whitespace-normal break-words ${
                              isAnswered && opt.isCorrect
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]'
                                : isAnswered && selectedOption === opt.textSp && !opt.isCorrect
                                ? 'bg-rose-50 border-rose-500 text-rose-955 shadow-[2px_2px_0px_0px_rgba(244,63,94,1)]'
                                : selectedOption === opt.textSp
                                ? 'bg-orange-50 border-orange-500 text-slate-955 shadow-[3px_3px_0px_0px_rgba(249,115,22,1)]'
                                : 'bg-white hover:bg-slate-50 border-slate-900 text-slate-800 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                            }`}
                          >
                            <span className="text-base sm:text-lg font-black font-mono block leading-snug">
                              {opt.textSp}
                            </span>
                            <span className="text-sm md:text-base text-slate-600 font-sans font-semibold leading-normal">
                              {opt.textArm}
                            </span>
                          </button>
                        ))
                      ) : (
                        /* Standard options */
                        (currentQuestion.options || []).map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectOption(opt)}
                            className={`p-4 md:p-5 rounded-xl border-2 text-left font-mono font-bold text-base md:text-lg transition-all focus:outline-none flex items-center justify-between gap-3 cursor-pointer whitespace-normal break-words ${
                              isAnswered && opt === currentQuestion.correctAnswer
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]'
                                : isAnswered && selectedOption === opt && opt !== currentQuestion.correctAnswer
                                ? 'bg-rose-50 border-rose-500 text-rose-955 shadow-[2px_2px_0px_0px_rgba(244,63,94,1)]'
                                : selectedOption === opt
                                ? 'bg-orange-50 border-orange-500 text-slate-955 shadow-[3px_3px_0px_0px_rgba(249,115,22,1)]'
                                : 'bg-white hover:bg-slate-50 border-slate-900 text-slate-800 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                            }`}
                          >
                            <span>{opt}</span>
                            {isAnswered && opt === currentQuestion.correctAnswer ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            ) : isAnswered && selectedOption === opt ? (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                            ) : null}
                          </button>
                        ))
                      )}

                      {!isAnswered && gameId !== GameId.DIALOGUE && (
                        <button
                          onClick={handleSubmitAnswer}
                          disabled={!selectedOption}
                          className="mt-3 bg-slate-900 hover:bg-slate-950 disabled:opacity-50 text-white font-mono font-extrabold text-sm sm:text-base py-3.5 sm:py-4 rounded-xl border-2 border-slate-950 transition-all flex items-center justify-center gap-1.5 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] hover:shadow-[5px_5px_0px_0px_rgba(249,115,22,1)] cursor-pointer tracking-widest uppercase"
                        >
                          <CheckCircle2 className="w-5 h-5 text-orange-400" />
                          ՍՏՈՒԳԵԼ (VALIDAR)
                        </button>
                      )}
                    </div>
                  )}

                  {/* Feedback Explanation Sheet after Submitting */}
                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 sm:p-5 rounded-xl border-2 font-sans relative shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                            : 'bg-rose-50 border-rose-500 text-rose-955'
                        }`}
                      >
                        <h4 className="font-black text-xs tracking-wider uppercase flex items-center gap-1 mb-1.5 font-mono">
                          {isCorrect ? '🎉 ՃԻՇՏ Է (CORRECTO)' : '❌ ՍԽԱԼ Է (INCORRECTO)'}
                        </h4>
                        <p className="text-sm sm:text-base font-bold leading-relaxed">
                          {currentQuestion.explanationArm}
                        </p>

                        {/* Comparative English Notes (Specifically requested) */}
                        {currentQuestion.explanationEng && (
                          <div className="mt-3 pt-3 border-t border-dashed border-slate-300 flex flex-col gap-1">
                            <span className="text-[10px] font-mono uppercase bg-slate-900 text-white px-2 py-0.5 rounded self-start font-black">
                              📊 ENGLISH COMPARISON:
                            </span>
                            <span className="text-xs sm:text-sm italic text-slate-700 font-medium leading-relaxed">
                              {currentQuestion.explanationEng}
                            </span>
                          </div>
                        )}

                        {/* Continue Button */}
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={handleNextQuestion}
                            className="bg-slate-900 text-white font-mono text-xs sm:text-sm font-black px-4 sm:px-5 py-2.5 rounded-lg border-2 border-slate-950 hover:bg-slate-950 transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer"
                          >
                            <span>ՇԱՐՈՒՆԱԿԵԼ (CONTINUAR)</span>
                            <ArrowRight className="w-4 h-4 text-orange-400" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              )}
            </motion.div>
          ) : (
            /* --- COMPLETED STATS SCREEN --- */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-4 gap-4"
            >
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center border-4 border-amber-400">
                <Award className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-800">
                  Խաղն Ավարտվեց: (Juego Terminado!)
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Գերազանց աշխատանք: Դուք ակտիվորեն նպաստեցիք մեր շինհրապարակի տան կառուցմանը:
                </p>
              </div>

              {gameId !== GameId.VOCABULARY && (
                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 w-full max-w-xs grid grid-cols-2 gap-3 text-center">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-mono">ՀԱՐՑԵՐ</span>
                    <span className="text-lg font-bold text-slate-700">{questions.length}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-mono">ՃԻՇՏ</span>
                    <span className="text-lg font-bold text-emerald-600">{localScore}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2 w-full max-w-xs">
                {gameId === GameId.VOCABULARY && (
                  <button
                    onClick={setupVocabularyGame}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-mono font-bold py-2.5 rounded-xl border-2 border-amber-900 transition-all flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    ԽԱՂԱԼ ՆՈՐԻՑ
                  </button>
                )}
                
                <button
                  onClick={onBackToDashboard}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-mono font-bold py-2.5 rounded-xl border-2 border-slate-950 transition-all"
                >
                  ՎԵՐԱԴԱՌՆԱԼ ԳԼԽԱՎՈՐ ԷՋ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
