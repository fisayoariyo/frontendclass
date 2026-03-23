import { useState } from 'react';
import { useWeather } from '../../hooks/useWeather';
import { useUnits } from '../../context/UnitsContext';
import { getWeatherInfo } from '../../services/weatherCodes';
import WeatherCard from './WeatherCard';
import WeatherMetrics from './WeatherMetrics';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';
import {
  HeroSkeleton,
  MetricsSkeleton,
  ConditionSkeleton,
  DailySkeleton,
  HourlySkeleton,
} from '../../components/ui/Skeletons';

export default function WeatherPanel({ location }) {
  const { units, labels } = useUnits();
  const [selectedDay, setSelectedDay] = useState(0);
  const { data, isLoading, isError, error, refetch } = useWeather(location, units);

  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-up">
        <span aria-hidden="true" className="text-6xl mb-5">🌍</span>
        <h2 className="font-display text-3xl font-bold text-white mb-2" style={{ letterSpacing: '-0.04em' }}>
          Where in the world?
        </h2>
        <p className="text-base font-light text-neutral-300">
          Search for any city to see its current weather and 7-day forecast.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="flex flex-col items-center justify-center py-20 text-center animate-fade-up">
        <span aria-hidden="true" className="text-5xl mb-4">⚠️</span>
        <h2 className="font-display text-2xl font-bold text-white mb-2" style={{ letterSpacing: '-0.03em' }}>
          Couldn't load the weather
        </h2>
        <p className="text-sm text-neutral-300 mb-6">
          {error?.message ?? 'Check your connection and try again.'}
        </p>
        <button
          onClick={refetch}
          className="px-6 py-2.5 bg-orange-500 text-neutral-900 font-bold text-sm rounded-full hover:opacity-90 transition-opacity focus-ring"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1" aria-busy="true" aria-label="Loading weather">
          <HeroSkeleton />
          <MetricsSkeleton />
          <ConditionSkeleton />
        </div>
        <DailySkeleton />
        <HourlySkeleton />
      </>
    );
  }

  const { emoji, label } = getWeatherInfo(data.current.weather_code);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1 animate-fade-up">
        <WeatherCard data={data} location={location} />
        <WeatherMetrics data={data} />
        <div
          className="rounded-3xl p-7 flex flex-col justify-center border border-white/10"
          style={{ background: 'linear-gradient(135deg, hsl(248,70%,36%), hsl(233,67%,56%))' }}
        >
          <p className="text-[11px] font-semibold text-white/60 uppercase tracking-widest mb-2">
            Today's Condition
          </p>
          <p className="font-display text-xl font-bold text-white" style={{ letterSpacing: '-0.03em' }}>
            {emoji} {label}
          </p>
          <p className="text-sm text-white/60 mt-2 font-light">
            H:{Math.round(data.daily.temperature_2m_max[0])}{labels.temp} · L:{Math.round(data.daily.temperature_2m_min[0])}{labels.temp}
          </p>
        </div>
      </div>
      <DailyForecast data={data} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
      <HourlyForecast data={data} selectedDay={selectedDay} />
    </>
  );
}
