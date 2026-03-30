import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-3xl mt-6 shadow-2xl glass-panel p-2">
      <div className="absolute inset-0 z-0 flex p-4 gap-4 opacity-40">
        <div className="w-2/3 h-full relative rounded-2xl overflow-hidden shadow-emerald-900/40">
           <img src="/assets/electric_truck_hero.png" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
        <div className="w-1/3 flex flex-col gap-4 h-full">
            <div className="h-1/2 relative rounded-2xl overflow-hidden shadow-emerald-900/40">
               <img src="/assets/truck_chassis_glow.png" className="w-full h-full object-cover" />
            </div>
            <div className="h-1/2 relative rounded-2xl overflow-hidden shadow-emerald-900/40">
               <img src="/assets/truck_map_overlay.png" className="w-full h-full object-cover" />
            </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
      <div className="relative z-20 text-left px-12 w-full max-w-7xl">
         <motion.h1 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6 neon-text-green drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
         >
           GreenRoute
         </motion.h1>
         <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="text-2xl text-slate-300 max-w-2xl backdrop-blur-sm bg-slate-950/30 p-4 rounded-xl border border-white/5"
         >
           Next-gen logistics intelligence. Real-time carbon emission tracking and route optimization for automated delivery fleets.
         </motion.p>
      </div>
    </div>
  );
}
