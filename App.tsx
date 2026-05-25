import { useState, useEffect } from 'react';
import { GameId } from './types';
import { HouseVisualizer } from './HouseVisualizer';
import { Dashboard } from './Dashboard';
import { GameCard } from './GameCard';
import { playLevelUpSound } from './audio';
import { Hammer, HardHat, Award, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [selectedGameId, setSelectedGameId] = useState<GameId | null>(null);
  const [completedGames, setCompletedGames] = useState<{ [key in GameId]?: boolean }>({});
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [recentActivity, setRecentActivity] = useState<string>('');

  // Hydrate states from localStorage on first render
  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem('spanobuild_completed');
      const savedPoints = localStorage.getItem('spanobuild_points');
      const savedProgress = localStorage.getItem('spanobuild_progress');
      const savedActivity = localStorage.getItem('spanobuild_activity');

      if (savedCompleted) setCompletedGames(JSON.parse(savedCompleted));
      if (savedPoints) setTotalPoints(parseInt(savedPoints) || 0);
      if (savedProgress) setProgress(parseFloat(savedProgress) || 0);
      if (savedActivity) setRecentActivity(savedActivity);
    } catch (e) {
      console.warn('LocalStorage hydration error:', e);
    }
  }, []);

  // Sync state changes to localStorage
  const saveStateToLocal = (updatedCompleted: typeof completedGames, updatedPoints: number, updatedProgress: number, updatedActivity: string) => {
    try {
      localStorage.setItem('spanobuild_completed', JSON.stringify(updatedCompleted));
      localStorage.setItem('spanobuild_points', updatedPoints.toString());
      localStorage.setItem('spanobuild_progress', updatedProgress.toString());
      localStorage.setItem('spanobuild_activity', updatedActivity);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  };

  const handleCorrectAnswer = (percentageBoost: number, activityLog: string) => {
    setProgress(prev => {
      const newProgress = Math.min(prev + percentageBoost, 100);
      
      // If reached milestone, play Level Up trumpet sound!
      if (Math.floor(newProgress / 20) > Math.floor(prev / 20)) {
        playLevelUpSound();
      }
      
      const newPoints = totalPoints + 15;
      setTotalPoints(newPoints);
      setRecentActivity(activityLog);
      
      // We need to pass the updated finished map
      saveStateToLocal(completedGames, newPoints, newProgress, activityLog);
      return newProgress;
    });
  };

  const handleSelectGame = (gameId: GameId) => {
    setSelectedGameId(gameId);
  };

  const handleBackToDashboard = () => {
    if (selectedGameId) {
      // Mark current game as completed on exit
      const updatedCompleted = { ...completedGames, [selectedGameId]: true };
      setCompletedGames(updatedCompleted);
      
      // Compute total progress
      const completedCount = Object.keys(updatedCompleted).filter(k => updatedCompleted[k as GameId]).length;
      // Map completion to base progress
      const baseProgress = Math.min(completedCount * 10, 100);
      
      setProgress(prev => {
        const finalProgress = Math.max(prev, baseProgress);
        saveStateToLocal(updatedCompleted, totalPoints, finalProgress, recentActivity);
        return finalProgress;
      });
    }
    setSelectedGameId(null);
  };

  const handleResetProgress = () => {
    if (window.confirm('Դուք համոզվա՞ծ եք, որ ցանկանում եք քանդել տունը և սկսել շինարարությունը նորից:')) {
      setCompletedGames({});
      setTotalPoints(0);
      setProgress(0);
      setRecentActivity('Շինհրապարակն ամբողջությամբ մաքրվեց։');
      localStorage.clear();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Dynamic Top Construction Masthead Banner */}
      <header className="bg-slate-900 text-white border-b-4 border-orange-500 relative overflow-hidden select-none">
        {/* Repeating diagonal architectural engineering warning stripes at the top boundary */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[repeating-linear-gradient(45deg,#f97316,#f97316_10px,#0f172a_10px,#0f172a_20px)]" />
        
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-5 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 text-slate-950 rounded-lg flex items-center justify-center border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] shrink-0">
              <Hammer className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black font-sans uppercase tracking-tight flex items-center gap-2 text-white flex-wrap">
                <span>ԻՍՊԱՆԵՐԵՆԻ ՇԻՆԱՐԱՐՈՒԹՅՈՒՆ</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-orange-500 text-slate-950 rounded border border-slate-950">
                  GO!
                </span>
              </h1>
              <p className="text-xs md:text-sm text-slate-350 tracking-wide font-sans mt-0.5">
                Spanish Learning Construction Game for Armenian Speakers • 10 Juegos Educativos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="bg-slate-950 border-2 border-slate-800 px-4 py-2 rounded-lg text-center shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] font-mono w-full sm:w-auto">
              <span className="block text-[10px] text-orange-400 uppercase font-extrabold tracking-widest">ԸՆԴՀԱՆՈՒՐ ՄԱԿԱՐԴԱԿ</span>
              <span className="text-sm font-black text-white block mt-0.5">
                {progress === 100 ? '👑 MASTER ARCHITECT' : progress > 50 ? '🔨 SENIOR BUILDER' : '🏗️ APPRENTICE'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Left Interactive Play Box (span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
          {selectedGameId ? (
            <GameCard
              gameId={selectedGameId}
              onCorrectAnswer={handleCorrectAnswer}
              onBackToDashboard={handleBackToDashboard}
            />
          ) : (
            <Dashboard
              completedGames={completedGames}
              onSelectGame={handleSelectGame}
              progress={progress}
              totalPoints={totalPoints}
              onResetProgress={handleResetProgress}
            />
          )}
        </div>

        {/* Right Site House Construction visualization widget (span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-8 h-fit">
          <div className="bg-white rounded-xl p-1.5 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] border-3 border-slate-900 overflow-hidden">
            <HouseVisualizer progress={progress} recentActivity={recentActivity} />
          </div>

          {/* Quick learning cheat cards under the house viewer */}
          <div className="bg-slate-950 text-slate-100 rounded-xl p-5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] flex flex-col gap-4 select-none">
            <span className="text-sm font-mono font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-900 pb-2">
              <HardHat className="w-4.5 h-4.5 text-orange-400" />
              ՇԻՆԱՐԱՐԻ ԲՆԱԳԻՐԸ (El Manual)
            </span>

            <div className="flex flex-col gap-3.5 font-sans text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-mono font-bold text-sm">1.</span>
                <p className="leading-relaxed">
                  <b className="text-white">Pretérito Perfecto:</b> Օգտագործվում է ցույց տալու համար վերջերս կատարված գործողություններ, որոնք կապված են ներկայի հետ (e.g. <i className="text-orange-300">He terminado</i> - Ավարտել եմ)։
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-mono font-bold text-sm">2.</span>
                <p className="leading-relaxed">
                  <b className="text-white">Pretérito Imperfecto:</b> Ցույց է տալիս անցյալի սովորույթները, տևական գործողությունները կամ նկարագրությունները անցյալում (e.g. <i className="text-orange-300">Vivía</i> - Ապրում էի)։
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-mono font-bold text-sm">3.</span>
                <p className="leading-relaxed">
                  <b className="text-white">¿Qué hora es?:</b> Իսպաներենում ժամը նշվում է <b className="text-white">Ser</b> բայով։ Մեկ ժամի համար՝ <i className="text-orange-300">Es la una</i>, մյուս բոլորի համար՝ <i className="text-orange-300">Son las...</i> ։
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer Disclaimer */}
      <footer className="bg-slate-800 text-slate-400 text-center py-6 text-xs md:text-sm font-mono border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <span>© 2026 Spanish Learning Construction App. All architectural rights reserved.</span>
          <span className="text-xs bg-slate-900/60 px-3 py-1.5 rounded-md text-slate-400">
            Designed for interactive language learning • From Armenian to Spanish
          </span>
        </div>
      </footer>
    </div>
  );
}
