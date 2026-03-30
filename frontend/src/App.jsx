import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import MapMonitor from './components/MapMonitor';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesRes, statsRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/vehicles'),
          fetch('http://127.0.0.1:8000/api/stats')
        ]);
        const vData = await vehiclesRes.json();
        const sData = await statsRes.json();
        setVehicles(vData);
        setStats(sData);
      } catch (err) {
        console.error("Failed to fetch backend metrics", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // Poll 1s match the simulation loop tick

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-[1600px] mx-auto space-y-10">
      <Hero />
      <Dashboard stats={stats} />
      <div className="pb-10">
        <MapMonitor vehicles={vehicles} />
      </div>
    </div>
  );
}

export default App;
