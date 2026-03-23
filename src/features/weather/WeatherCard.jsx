import { getWeatherInfo } from '../../services/weatherCodes';
import { useUnits } from '../../context/UnitsContext';

/**
 * WeatherCard (Hero)
 * Displays the dominant temperature, condition, location, and hi/lo.
 * Takes up 2 grid rows on desktop.
 */
export default function WeatherCard({ data, location }) {
  const { labels } = useUnits();
  const c = data.current;
  const { label, emoji } = getWeatherInfo(c.weather_code);
  const max = data.daily.temperature_2m_max[0];
  const min = data.daily.temperature_2m_min[0];

  return (
    <article
      aria-label={`Current weather in ${location.name}`}
      className="glass-card row-span-2 p-9 flex flex-col justify-between relative overflow-hidden min-h-[320px]"
    >
      {/* Subtle inner highlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)' }}
      />

      <span aria-hidden="true" className="absolute top-8 right-8 text-5xl drop-shadow-lg">
        {emoji}
      </span>

      {/* Location */}
      <div>
        <p className="text-xs font-semibold text-neutral-300 tracking-widest uppercase">
          {location.name}
        </p>
        <p className="text-[11px] text-neutral-600 tracking-wider uppercase mt-0.5">
          {[location.admin1, location.country].filter(Boolean).join(' · ')}
        </p>
      </div>

      {/* Temperature */}
      <div>
        <div className="flex items-start">
          <span
            aria-label={`${Math.round(c.temperature_2m)} degrees ${labels.temp === '°F' ? 'Fahrenheit' : 'Celsius'}`}
            className="font-display font-extrabold text-white leading-none"
            style={{ fontSize: 'clamp(80px, 14vw, 116px)', letterSpacing: '-0.04em' }}
          >
            {Math.round(c.temperature_2m)}
          </span>
          <span aria-hidden="true" className="font-display text-3xl text-neutral-300 mt-3 ml-1">
            {labels.temp}
          </span>
        </div>
        <p className="text-base font-light text-neutral-200 tracking-wide">{label}</p>
        <p className="text-xs text-neutral-600 mt-2" aria-label={`High ${Math.round(max)}, Low ${Math.round(min)}`}>
          H:{Math.round(max)}{labels.temp} · L:{Math.round(min)}{labels.temp}
        </p>
      </div>
    </article>
  );
}
