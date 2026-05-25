import React from 'react';
import { GameId } from './types';
import {
  Trophy,
  Hammer,
  RotateCcw,
  Sparkles,
  BookOpen,
  Info
} from 'lucide-react';

interface DashboardProps {
  completedGames: { [key in GameId]?: boolean };
  onSelectGame: (gameId: GameId) => void;
  progress: number;
  totalPoints: number;
  onResetProgress: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  completedGames,
  onSelectGame,
  progress,
  totalPoints,
  onResetProgress
}) => {
  const gamesList = [
    {
      id: GameId.PRESENTE,
      title: '1. Ներկա ժամանակ',
      sub: 'Presente de Indicativo',
      emoji: '🕵️',
      color: 'border-blue-500 hover:border-blue-600 bg-blue-50/20 text-blue-950',
      shadowColor: 'rgba(59,130,246,1)',
      difficulty: 'ՀԵՇՏ (Fácil)'
    },
    {
      id: GameId.PERFECTO,
      title: '2. Անցյալ վաղակատար',
      sub: 'Pretérito Perfecto',
      emoji: '🧱',
      color: 'border-orange-500 hover:border-orange-600 bg-orange-50/20 text-orange-950',
      shadowColor: 'rgba(249,115,22,1)',
      difficulty: 'ՄԻՋԻՆ (Medio)'
    },
    {
      id: GameId.IMPERFECTO,
      title: '3. Անցյալ անկատար',
      sub: 'Pretérito Imperfecto',
      emoji: '🏚️',
      color: 'border-amber-500 hover:border-amber-600 bg-amber-50/20 text-amber-955',
      shadowColor: 'rgba(245,158,11,1)',
      difficulty: 'ՄԻՋԻՆ (Medio)'
    },
    {
      id: GameId.HORA,
      title: '4. Ժամանակը / Ժամեր',
      sub: 'La Hora en Español',
      emoji: '⏰',
      color: 'border-rose-500 hover:border-rose-600 bg-rose-50/20 text-rose-950',
      shadowColor: 'rgba(244,63,94,1)',
      difficulty: 'ՀԵՇՏ (Fácil)'
    },
    {
      id: GameId.AUDIO,
      title: '5. Լսողական խաղ',
      sub: 'Audición de Oraciones',
      emoji: '🎧',
      color: 'border-violet-500 hover:border-violet-600 bg-violet-50/20 text-violet-950',
      shadowColor: 'rgba(139,92,246,1)',
      difficulty: 'ՄԻՋԻՆ (Medio)'
    },
    {
      id: GameId.PREPOSICIONES,
      title: '6. Նախդիրներ + Անգլ',
      sub: 'Preposiciones Comparadas',
      emoji: '🗺️',
      color: 'border-teal-500 hover:border-teal-600 bg-teal-50/20 text-teal-950',
      shadowColor: 'rgba(20,184,166,1)',
      difficulty: 'ԲԱՐԴ (Difícil)'
    },
    {
      id: GameId.PUZZLE,
      title: '7. Նախադասության Փազլ',
      sub: 'Puzzle de Construcción',
      emoji: '🧩',
      color: 'border-emerald-500 hover:border-emerald-600 bg-emerald-50/20 text-emerald-950',
      shadowColor: 'rgba(16,185,129,1)',
      difficulty: 'ԲԱՐԴ (Difícil)'
    },
    {
      id: GameId.VOCABULARY,
      title: '8. Բառապաշարի կռունկ',
      sub: 'Vocabulario de Obra',
      emoji: '🏗️',
      color: 'border-indigo-500 hover:border-indigo-600 bg-indigo-50/20 text-indigo-950',
      shadowColor: 'rgba(99,102,241,1)',
      difficulty: 'ՀԵՇՏ (Fácil)'
    },
    {
      id: GameId.SURVEY,
      title: '9. Ճիշտ թե Սխալ',
      sub: 'Survey Comparativa',
      emoji: '📋',
      color: 'border-sky-500 hover:border-sky-600 bg-sky-50/20 text-sky-950',
      shadowColor: 'rgba(14,165,233,1)',
      difficulty: 'ՄԻՋԻՆ (Medio)'
    },
    {
      id: GameId.DIALOGUE,
      title: '10. Կարլոսի զրույցը',
      sub: 'Diálogo con Carlos',
      emoji: '🗣️',
      color: 'border-cyan-500 hover:border-cyan-600 bg-cyan-50/20 text-cyan-950',
      shadowColor: 'rgba(6,182,212,1)',
      difficulty: 'ՄԻՋԻՆ (Medio)'
    }
  ];

  return (
    <div id="dashboard_panel" className="flex flex-col gap-6">
      {/* Overview Block with Construction blueprint styling */}
      <div className="bg-slate-950 text-slate-100 rounded-xl p-6 border-3 border-slate-900 shadow-[6px_6px_0px_0px_rgba(249,115,22,1)] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 select-none">
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex-1 flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 animate-spin text-orange-400" />
            <span>ԻՍՊԱՆԵՐԵՆԻ ՇԻՆԱՐԱՐԱԿԱՆ ՆԱԽԱԳԻԾ</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
            Սովորի՛ր Իսպաներեն թարգմանությունները հայերենով և կառուցի՛ր քո տունը
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            Յուրաքանչյուր ճիշտ պատասխան բերում է նոր աղյուսներ, կղմինդրներ և ցեմենտ։ 
            Խաղացե՛ք բոլոր <b>10 տարբեր խաղերը</b>, որպեսզի հասնեք 100% ավարտվածության և ունենաք գեղեցիկ այգով ու ցանկապատով տուն։
          </p>
        </div>

        {/* HUD Box stats */}
        <div className="flex gap-4 p-4 bg-slate-900 rounded-lg border-2 border-slate-800 w-full md:w-auto shrink-0 relative z-10 shadow-[3px_3px_0px_0px_rgba(249,115,22,0.15)] md:min-w-[220px]">
          <div className="flex flex-col items-center flex-1 px-4 text-center">
            <Trophy className="w-6 h-6 text-orange-400 mb-1" />
            <span className="text-xs text-slate-400 font-mono">ՄԻԱՎՈՐՆԵՐ</span>
            <span className="text-2xl font-extrabold text-white">{totalPoints}XP</span>
          </div>
          <div className="w-[1px] bg-slate-800 self-stretch" />
          <div className="flex flex-col items-center flex-1 px-4 text-center">
            <Hammer className="w-6 h-6 text-emerald-400 mb-1" />
            <span className="text-xs text-slate-400 font-mono">ՏՈՒՆԸ</span>
            <span className="text-2xl font-extrabold text-emerald-400">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Grid of the 10 mini games */}
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-500" />
            <span>Ընտրե՛ք Խաղը (10 Խաղ)</span>
          </h3>

          <button
            onClick={onResetProgress}
            className="text-xs font-mono font-bold text-red-600 border-2 border-slate-900 bg-white hover:bg-red-50 py-1.5 px-3 rounded-lg transition-all flex items-center gap-1 hover:translate-x-[1px] hover:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(239,68,68,1)] active:-translate-x-0 cursor-pointer"
            title="Մաքրել բոլոր շինարարական արդյունքները"
          >
            <RotateCcw className="w-4 h-4 text-red-600" />
            ՋՆՋԵԼ ՏՈՒՆԸ
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gamesList.map(game => {
            const isCompleted = completedGames[game.id];
            
            return (
              <button
                key={game.id}
                id={`game_btn_${game.id}`}
                onClick={() => onSelectGame(game.id)}
                style={{
                  boxShadow: `4px 4px 0px 0px ${isCompleted ? 'rgba(16,185,129,1)' : 'rgba(15,23,42,1)'}`
                }}
                className="p-4 md:p-5 rounded-xl border-2 text-left transition-all relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer bg-white border-slate-900 hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl filter drop-shadow select-none shrink-0">{game.emoji}</span>
                  <div>
                    <h4 className="font-extrabold text-base md:text-lg tracking-tight text-slate-900 leading-snug">
                      {game.title}
                    </h4>
                    <span className="text-xs md:text-sm text-slate-600 font-mono font-bold block mt-0.5">
                      {game.sub}
                    </span>
                    <span className="text-xs text-slate-450 font-mono font-bold uppercase mt-1 inline-block">
                      Դժվարություն՝ {game.difficulty}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center sm:justify-end">
                  {isCompleted ? (
                    <span className="bg-emerald-100 border-2 border-emerald-500 text-emerald-800 text-xs font-black px-3 py-1.5 rounded uppercase flex items-center gap-1 tracking-wider whitespace-nowrap self-start sm:self-auto">
                      ✓ ԱՎԱՐՏՎԱԾ
                    </span>
                  ) : (
                    <span className="bg-slate-50 border-2 border-slate-300 text-slate-700 text-xs font-black px-3 py-1.5 rounded uppercase tracking-wider whitespace-nowrap self-start sm:self-auto">
                      ՇԱՐՈՒՆԱԿԵԼ
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Educational Guidelines help footer info */}
      <div className="bg-stone-50 border-2 border-slate-900 rounded-xl p-4 flex gap-3 text-slate-800 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
        <Info className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
        <div className="text-sm font-sans leading-relaxed">
          <p className="font-bold text-slate-900 flex items-center gap-1 text-base">
            <span>💡 Իսպաներենի և անգլերենի համեմատական կարևորությունը</span>
          </p>
          <p className="mt-1 text-slate-650">
            Շատ նախդիրներ իսպաներենում (օրինակ՝ <b>en</b>, <b>por</b>, <b>para</b>) ունեն յուրահատուկ կիրառում, որոնք տարբերվում են հայերենից, բայց որոշակի նմանություններ ունեն անգլերենի հետ։ Յուրաքանչյուր հարցի ճիշտ պատասխանում մենք տրամադրում ենք բացատրություն, որն օգնում է համեմատել կառույցներն անգլերեն լեզվի հետ, ինչը հեշտացնում է յուրացումը նրանց համար, ովքեր գիտեն անգլերեն:
          </p>
        </div>
      </div>
    </div>
  );
};
