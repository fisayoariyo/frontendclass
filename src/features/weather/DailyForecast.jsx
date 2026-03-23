import { getWeatherInfo } from '../../services/weatherCodes';
import { useUnits } from '../../context/UnitsContext';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * DailyForecast
 * 7-day horizontal strip. Clicking a day updates the hourly panel.
 * Keyboard accessible — each card is a button.
 *
 * @param {{ data, selectedDay: number, onSelectDay: (i: number) => void }} props
 */
export default function DailyForecast({ data, selectedDay, onSelectDay }) {
  const { labels } = useUnits();

  return (
    <section aria-label="7-day forecast" className="mb-4 animate-fade-up">
      <p className="text-[11px] font-semibold text-neutral-600 uppercase tracking-widest mb-3">
        7-Day Forecast
      </p>

      <div
        role="tablist"
        aria-label="Select day"
        className="grid gap-2.5 overflow-x-auto pb-1"
        style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}
      >
        {data.daily.time.map((time, i) => {
          const date  = new Date(time + 'T12:00:00');
          const label = i === 0 ? 'Today' : DAY_LABELS[date.getDay()];
          const { emoji } = getWeatherInfo(data.daily.weather_code[i]);
          const isActive  = selectedDay === i;

          return (
            <button
              key={time}
              role="tab"
              aria-selected={isActive}
              aria-label={`${label}: High ${Math.round(data.daily.temperature_2m_max[i])}${labels.temp}, Low ${Math.round(data.daily.temperature_2m_min[i])}${labels.temp}`}
              onClick={() => onSelectDay(i)}
              className={[
                'flex flex-col items-center gap-2 py-4 px-3 rounded-2xl text-center cursor-pointer transition-all duration-200 border focus-ring',
                isActive
                  ? 'bg-white/10 border-orange-500'
                  : 'border-transparent hover:-translate-y-0.5',
              ].join(' ')}
              style={!isActive ? { background: 'var(--glass)', borderColor: 'var(--glass-border)' } : {}}
            >
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider ${isActive ? 'text-orange-500' : 'text-neutral-300'}`}
              >
                {label}
              </span>
              <span aria-hidden="true" className="text-[22px]">{emoji}</span>
              <span className="font-display text-lg font-bold text-white leading-none" style={{ letterSpacing: '-0.02em' }}>
                {Math.round(data.daily.temperature_2m_max[i])}{labels.temp}
              </span>
              <span className="text-xs text-neutral-600">
                {Math.round(data.daily.temperature_2m_min[i])}{labels.temp}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
