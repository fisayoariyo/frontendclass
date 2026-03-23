import { useState } from 'react';
import AtmosphericBackground from './components/ui/AtmosphericBackground';
import ErrorBoundary from './components/ui/ErrorBoundary';
import UnitsToggle from './components/ui/UnitsToggle';
import SearchBar from './features/search/SearchBar';
import WeatherPanel from './features/weather/WeatherPanel';

export default function App() {
  const [location, setLocation] = useState(null);

  return (
    <div className="min-h-screen flex flex-col relative font-body">
      <AtmosphericBackground />
      <main className="relative z-[2] flex-1 w-full max-w-[1200px] mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-10 animate-fade-up">
          <div className="font-display text-xl font-bold text-white flex items-center gap-2 tracking-tight">
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
            Atmos
          </div>
          <UnitsToggle />
        </header>
        <SearchBar onSelect={setLocation} />
        <ErrorBoundary onReset={() => setLocation(null)}>
          <WeatherPanel location={location} />
        </ErrorBoundary>
      </main>
    </div>
  );
}
