import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

export default function MapMonitor({ vehicles }) {
  const center = [47.6062, -122.3321];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-4 h-[600px] flex flex-col shadow-2xl shadow-emerald-900/10"
    >
      <div className="flex items-center gap-3 mb-4">
         <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
         <h2 className="text-2xl font-bold text-slate-200 tracking-wide">
           Live Fleet Coordinates
         </h2>
      </div>
      <div className="flex-1 rounded-2xl overflow-hidden border border-white/5 shadow-inner p-[1px] bg-gradient-to-br from-white/10 to-transparent">
        <MapContainer center={center} zoom={10} style={{ height: '100%', width: '100%', background: '#020617', borderRadius: '15px' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          {vehicles.map(v => {
            // E = D * EF. High cumulative carbon footprints will pulse red.
            const isHighEmission = v.total_co2 > 5;
            const color = isHighEmission ? '#ef4444' : '#10b981';
            
            return (
              <CircleMarker 
                key={v.id} 
                center={[v.lat, v.lng]} 
                radius={isHighEmission ? 5 : 4}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.8,
                  weight: 1
                }}
              >
                <Popup className="bg-slate-900">
                  <div className="text-slate-900 font-sans p-1">
                     <strong className="text-lg">{v.name}</strong><br/>
                     <span className="text-slate-600">Speed:</span> <b>{v.speed?.toFixed(1)} mph</b><br/>
                     <span className="text-slate-600">CO2 Emission:</span> <b className={isHighEmission ? 'text-red-600' : 'text-emerald-600'}>{v.total_co2?.toFixed(2)} kg</b>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </motion.div>
  );
}
