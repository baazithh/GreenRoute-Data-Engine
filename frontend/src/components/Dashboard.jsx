import { motion } from 'framer-motion';
import { Activity, Zap, CloudFog, Target } from 'lucide-react';

export default function Dashboard({ stats }) {
  const cards = [
    { title: "Active Fleet", value: stats.active_vehicles || 0, icon: <Activity className="text-blue-400" /> },
    { title: "Avg Speed (mph)", value: stats.avg_speed?.toFixed(1) || 0.0, icon: <Zap className="text-yellow-400" /> },
    { title: "Total CO2 (kg)", value: stats.total_emissions?.toFixed(2) || 0.0, icon: <CloudFog className="text-red-400" /> },
    { title: "Route Efficiency", value: "94%", icon: <Target className="text-emerald-400" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 pb-6">
       {cards.map((c, i) => (
         <motion.div
           key={c.title}
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: i * 0.1 }}
           className="glass-panel p-6 flex flex-col border-t-2"
           style={{ borderTopColor: 'rgba(16, 185, 129, 0.4)' }}
         >
           <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 font-medium text-lg tracking-wide">{c.title}</span>
              <div className="p-3 bg-slate-950/60 rounded-xl shadow-inner shadow-slate-900 border border-white/5">{c.icon}</div>
           </div>
           <div className="text-4xl font-extrabold text-slate-100 neon-text-green tracking-tight">{c.value}</div>
         </motion.div>
       ))}
    </div>
  );
}
