import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hammer, HardHat, Sparkles } from 'lucide-react';

interface HouseVisualizerProps {
  progress: number; // 0 to 100
  recentActivity?: string; // Information about what brick was laid
}

export const HouseVisualizer: React.FC<HouseVisualizerProps> = ({ progress, recentActivity }) => {
  const [brickCount, setBrickCount] = useState<number>(0);
  const [triggerBlast, setTriggerBlast] = useState<boolean>(false);

  useEffect(() => {
    // Increment virtual brick count as progress goes up
    const calculatedBricks = Math.floor(progress * 1.5);
    if (calculatedBricks > brickCount) {
      setTriggerBlast(true);
      const timer = setTimeout(() => setTriggerBlast(false), 800);
      setBrickCount(calculatedBricks);
      return () => clearTimeout(timer);
    }
  }, [progress, brickCount]);

  // Determine stage description text in Armenian
  const getStageDescriptionArm = () => {
    if (progress === 0) return 'Հարթ պլոտ (Դեռ ոչինչ կառուցված չէ)';
    if (progress < 15) return 'Հիմքի լցում (Գետնի նախապատրաստում և ցեմենտ)';
    if (progress < 35) return 'Առաջին հարկի պատեր (Աղյուսների տեղադրում)';
    if (progress < 55) return 'Պատուհաններ և դուռ (Բացվածքների տեղադրում)';
    if (progress < 75) return 'Երկրորդ հարկի կարկաս (Լրացուցիչ պատեր)';
    if (progress < 85) return 'Տանիքի փայտե գերաններ (Կմախք)';
    if (progress < 95) return 'Տանիքի կղմինդր և ծխնելույզ (Կայուն տանիք)';
    return 'Երազանքների Տունը կառուցված է: (Այգի և ցանկապատ)';
  };

  // Stage indicator index 1 to 7
  const currentStageNum = () => {
    if (progress < 15) return 1;
    if (progress < 35) return 2;
    if (progress < 55) return 3;
    if (progress < 75) return 4;
    if (progress < 85) return 5;
    if (progress < 95) return 6;
    return 7;
  };

  return (
    <div className="bg-stone-50 rounded-lg p-5 overflow-hidden relative min-h-[440px] flex flex-col justify-between select-none">
      {/* Decorative Grid Patterns to look like blueprint */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:18px_18px] opacity-70 pointer-events-none" />

      {/* Floating clouds in sky */}
      <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-6 bg-white/60 rounded-full blur-[1px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-8 bg-white/50 rounded-full blur-[1px]"
        />
      </div>

      {/* Title & Info HUD */}
      <div className="relative z-10 flex flex-col gap-1 select-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-slate-900 text-white font-mono px-3 py-1.5 rounded text-xs font-bold border-2 border-slate-950 shadow">
            <HardHat className="w-4 h-4 animate-bounce text-orange-400" />
            <span>ՇԻՆՀՐԱՊԱՐԱԿ (OBRA)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-500 text-slate-950 font-mono px-3 py-1 rounded text-xs font-black border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <span className="text-[10px] text-slate-900">ԲԱՐՁՐՈՒԹՅՈՒՆ:</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="mt-2 bg-slate-950 border-2 border-slate-900 rounded-lg p-3 text-slate-100 font-sans shadow-[3px_3px_0px_0px_rgba(249,115,22,1)]">
          <p className="text-[10px] text-orange-400 font-mono tracking-wider uppercase font-extrabold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" />
            Փուլ {currentStageNum()} • {getStageDescriptionArm()}
          </p>
          {recentActivity ? (
            <p className="text-xs text-emerald-400 mt-1 font-medium truncate">
              {recentActivity}
            </p>
          ) : (
            <p className="text-xs text-slate-400 mt-1">
              Պատասխանեք հարցերին՝ տունը աղյուս առ աղյուս կառուցելու համար:
            </p>
          )}
        </div>
      </div>

      {/* Animated Crane Hanging Block (Visible as answers stream in) */}
      <div className="absolute top-18 right-10 w-36 h-36 pointer-events-none z-20">
        {/* Crane Tower */}
        <div className="absolute bottom-0 right-2 w-4 h-32 bg-orange-500 border-r border-orange-600 opacity-30" />
        {/* Crane Arm */}
        <div className="absolute top-0 right-2 w-36 h-2 bg-orange-400 border-b border-orange-600 origin-right" />
        {/* Crane Cable */}
        <div className="absolute top-2 left-6 w-0.5 h-10 bg-slate-600" />
        {/* Crane Hook holding a brick */}
        <motion.div
          animate={triggerBlast ? { y: [0, 15, 0] } : { y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-12 left-3 w-6 h-4 bg-orange-700 rounded border border-orange-950 shadow flex items-center justify-center"
        >
          <Hammer className="w-3 h-3 text-orange-200" />
        </motion.div>
      </div>

      {/* Building House Canvas */}
      <div className="relative w-full h-56 flex flex-col justify-end items-center z-10 bottom-2">
        {/* Scaffoldings (Shown during active building (progress > 5 && progress < 95)) */}
        {progress > 5 && progress < 95 && (
          <div className="absolute bottom-0 w-64 h-48 border-2 border-slate-500/30 border-dashed rounded flex flex-wrap justify-between items-end pointer-events-none p-1">
            <div className="w-1 h-full bg-slate-400/30 border-l border-slate-500" />
            <div className="w-1 h-full bg-slate-400/30 border-l border-slate-500" />
            <div className="w-full h-1 bg-slate-400/30 border-t border-slate-500 absolute top-12" />
            <div className="w-full h-1 bg-slate-400/30 border-t border-slate-500 absolute top-28" />
            <div className="w-full h-1 bg-slate-400/30 border-t border-slate-500 absolute top-40" />
          </div>
        )}

        {/* --- HOUSE LAYOUT (SVG & HTML stack) --- */}
        <div className="relative w-56 h-48 flex justify-center items-end">
          
          {/* 1. Foundation Level (Cement base) */}
          {progress >= 5 && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              className="absolute bottom-0 w-48 h-5 bg-gradient-to-r from-slate-400 to-slate-500 border-t-2 border-b border-slate-600 rounded-sm z-10 shadow-md"
            />
          )}

          {/* 2. Brick Wall Floor 1 */}
          {progress >= 15 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring' }}
              className="absolute bottom-5 w-40 h-16 bg-gradient-to-r from-orange-600 to-orange-500 border border-orange-850 rounded-sm z-20 overflow-hidden shadow-inner flex flex-col justify-between"
            >
              {/* Brick row visual lines */}
              <div className="w-full h-[1px] bg-orange-200/40" />
              <div className="w-full h-[1px] bg-orange-200/40" />
              <div className="w-full h-[1px] bg-orange-200/40" />
              <div className="w-full h-[1px] bg-orange-200/40" />
              
              {/* Vertical lines */}
              <div className="absolute inset-0 flex justify-between opacity-30 pointer-events-none">
                <span className="w-[1px] h-full bg-slate-100" />
                <span className="w-[1px] h-full bg-slate-100" />
                <span className="w-[1px] h-full bg-slate-100" />
                <span className="w-[1px] h-full bg-slate-100" />
                <span className="w-[1px] h-full bg-slate-100" />
              </div>
            </motion.div>
          )}

          {/* 3. Door & Windows Floor 1 */}
          {progress >= 35 && (
            <div className="absolute bottom-5 w-40 h-16 z-30 flex justify-around items-end px-3">
              {/* Window Left */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 bg-sky-300 border-2 border-amber-800 rounded shadow-md relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 -skew-x-12" />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-800" />
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-800" />
              </motion.div>
              
              {/* Wooden Door */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                className="w-10 h-14 bg-amber-800 border-2 border-amber-950 rounded-t shadow-md relative flex items-center justify-end px-1"
              >
                {/* Brass Door Knob */}
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              </motion.div>

              {/* Window Right */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 bg-sky-300 border-2 border-amber-800 rounded shadow-md relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 -skew-x-12" />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-800" />
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-800" />
              </motion.div>
            </div>
          )}

          {/* 4. Second Floor Walls */}
          {progress >= 55 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-[84px] w-36 h-14 bg-gradient-to-r from-orange-500 to-orange-400 border border-orange-800 rounded-sm z-20 flex flex-col justify-between"
            >
              <div className="w-full h-[1px] bg-orange-200/30" />
              <div className="w-full h-[1px] bg-orange-200/30" />
              <div className="w-full h-[1px] bg-orange-200/30" />
              
              <div className="absolute inset-0 flex justify-around opacity-30 pointer-events-none">
                <span className="w-[1px] h-full bg-slate-100" />
                <span className="w-[1px] h-full bg-slate-100" />
                <span className="w-[1px] h-full bg-slate-100" />
              </div>

              {/* Second floor double windows */}
              <div className="absolute inset-0 flex justify-around items-center px-4">
                <div className="w-6 h-6 bg-sky-300 border-2 border-amber-800 rounded overflow-hidden shadow">
                  <div className="absolute inset-0 bg-white/20 -skew-x-12" />
                </div>
                <div className="w-6 h-6 bg-sky-300 border-2 border-amber-800 rounded overflow-hidden shadow">
                  <div className="absolute inset-0 bg-white/20 -skew-x-12" />
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. Roof Rafters / Wood beam structure */}
          {progress >= 75 && progress < 85 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute bottom-[138px] w-40 h-10 border-b-2 border-amber-900 border-dashed z-30"
            >
              {/* Basic triangle beam shape */}
              <svg className="w-full h-full overflow-visible fill-none stroke-amber-800 stroke-2">
                <line x1="10" y1="40" x2="80" y2="2" />
                <line x1="150" y1="40" x2="80" y2="2" />
                <line x1="30" y1="40" x2="80" y2="15" />
                <line x1="130" y1="40" x2="80" y2="15" />
              </svg>
            </motion.div>
          )}

          {/* 6. Completed Roof Cover (Clay Tejas Red Roof) */}
          {progress >= 85 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bottom-[136px] w-[172px] h-14 z-30 overflow-visible"
            >
              {/* Roof SVG */}
              <svg viewBox="0 0 172 56" className="w-full h-full drop-shadow-md">
                <polygon points="86,2 2,54 170,54" className="fill-red-700 stroke-red-900 stroke-2" />
                {/* Roof pattern */}
                <path d="M10,50 L86,10 L162,50 M30,50 L86,20 L142,50 M50,50 L86,30 L122,50" className="stroke-red-500/50 stroke-2 fill-none" />
              </svg>

              {/* Chimney */}
              <div className="absolute top-2 right-12 w-4 h-8 bg-gradient-to-r from-orange-800 to-orange-700 border border-orange-950 z-20 flex flex-col justify-start">
                <div className="w-5 h-1.5 bg-orange-950 rounded-sm self-center -mt-0.5" />
                {/* Smoke from Chimney! */}
                {progress >= 95 && (
                  <motion.div
                    animate={{ y: [-10, -25], opacity: [0.8, 0], scale: [0.8, 1.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute top-[-10px] left-[2px] w-3 h-3 bg-slate-300 rounded-full blur-[2px]"
                  />
                )}
              </div>
            </motion.div>
          )}

          {/* 7. Complete Landscaping (Fences, grass & garden) */}
          {progress >= 95 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-0 w-64 h-5 z-40 flex justify-between items-end px-1 select-none pointer-events-none"
            >
              {/* White Fence Left */}
              <div className="flex gap-0.5 items-end">
                <div className="w-1.5 h-6 bg-white border border-slate-300" />
                <div className="w-1.5 h-6 bg-white border border-slate-300" />
                <div className="w-1.5 h-6 bg-white border border-slate-300" />
                <div className="w-1.5 h-6 bg-white border border-slate-300" />
              </div>

              {/* Small Garden mailbox & Plant right */}
              <div className="flex gap-2 items-end">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2 bg-rose-500 rounded-sm" />
                  <div className="w-0.5 h-4 bg-slate-700" />
                </div>
                <div className="flex gap-0.5 items-end">
                  <div className="w-1.5 h-6 bg-white border border-slate-300" />
                  <div className="w-1.5 h-6 bg-white border border-slate-300" />
                  <div className="w-1.5 h-6 bg-white border border-slate-300" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Green Grass Yard */}
          <div className="absolute bottom-0 w-64 h-1.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-sm z-10 shadow" />
        </div>
      </div>

      {/* Materials / Stats Row HUD */}
      <div className="relative z-10 grid grid-cols-3 gap-2 mt-2 bg-slate-950 border-2 border-slate-900 rounded-lg p-2 font-mono text-center shadow-[3px_3px_0px_0px_rgba(15,23,42,0.1)]">
        <div>
          <span className="block text-[9px] text-slate-450 uppercase font-black">🧱 ԱՂՅՈՒՍ</span>
          <span className="text-xs font-black text-orange-400 block mt-0.5">
            {brickCount}
          </span>
        </div>
        <div>
          <span className="block text-[9px] text-slate-450 uppercase font-black">🧪 ՑԵՄԵՆՏ</span>
          <span className="text-xs font-black text-emerald-400 block mt-0.5">
            {progress > 5 ? Math.floor(progress * 0.8) : 0} L
          </span>
        </div>
        <div>
          <span className="block text-[9px] text-slate-450 uppercase font-black">✨ ԳՆԱՀԱՏԱԿԱՆ</span>
          <span className="text-[10px] font-black text-sky-400 block mt-0.5 truncate">
            {progress === 100 ? 'A+ MASTER' : progress > 60 ? 'ԱՌԱԶԱՏԱՐ' : 'ԲԱՆՎՈՐ'}
          </span>
        </div>
      </div>

      {/* Blast effect when progress changes */}
      <AnimatePresence>
        {triggerBlast && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="absolute inset-0 flex justify-center items-center pointer-events-none z-50 text-amber-500"
          >
            <Sparkles className="w-16 h-16 animate-spin text-amber-400 drop-shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
