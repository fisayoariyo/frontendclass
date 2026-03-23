import { getWeatherInfo } from '../../services/weatherCodes';
import { useUnits } from '../../context/UnitsContext';

function formatHour(isoString) {
  const hour = parseInt(isoString.split('T')[1]);
  if (hour === 0)  return '12am';
  if (hour < 12)  return `${hour}am`;
  if (hour === 12) return '12pm';
  return `${hour - 12}pm`;
}

/**
 * HourlyForecast
 * Scrollable hourly strip filtered to the selected day.
 * Highlights the current hour when viewing today.
 *
 * @param {{ data, selectedDay: number }} props
 */
export default function HourlyForecast({ data, selectedDay }) {
  const { labels } = useUnits();
  const dayDate    = data.daily.time[selectedDay];
  const isToday    = selectedDay === 0;
  const nowHour    = new Date().getHours();

  const hours = data.hourly.time
    .map((t, i) => ({
      time: t,
      temp: data.hourly.temperature_2m[i],
      code: data.hourly.weather_code[i],
    }))
    .filter(h => h.time.startsWith(dayDate));

  return (
    <section aria-label="Hourly forecast" className="animate-fade-up">
      <p className="text-[11px] font-semibold text-neutral-600 uppercase tracking-widest mb-3">
        Hourly Forecast
      </p>

      <div
        className="flex gap-2.5 overflow-x-auto pb-2"
        role="list"
      >
        {hours.map((h, i) => {
          const hour   = parseInt(h.time.split('T')[1]);
          const isNow  = isToday && hour === nowHour;
          const label  = isNow ? 'Now' : formatHour(h.time);
          const { emoji } = getWeatherInfo(h.code);

          return (
            <div
              key={h.time}
              role="listitem"
              aria-label={`${label}: ${Math.round(h.temp)}${labels.temp}`}
              className={[
                'flex flex-col items-center gap-1.5 py-3.5 px-4 rounded-xl flex-shrink-0 min-w-[68px] transition-all duration-200 border',
                isNow
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'hover:-translate-y-0.5',
              ].join(' ')}
              style={!isNow ? { background: 'var(--glass)', borderColor: 'var(--glass-border)' } : {}}
            >
              <span className={`text-[11px] font-medium ${isNow ? 'text-orange-500' : 'text-neutral-600'}`}>
                {label}
              </span>
              <span aria-hidden="true" className="text-lg">{emoji}</span>
              <span className="font-display text-base font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
                {Math.round(h.temp)}{labels.temp}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
