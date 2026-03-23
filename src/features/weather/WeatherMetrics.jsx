import { useUnits } from '../../context/UnitsContext';

const METRICS = [
  { key: 'apparent_temperature', label: 'Feels Like',  unitKey: 'temp'   },
  { key: 'relative_humidity_2m', label: 'Humidity',    unit: '%'         },
  { key: 'wind_speed_10m',       label: 'Wind',        unitKey: 'wind'   },
  { key: 'precipitation',        label: 'Precip',      unitKey: 'precip' },
];

/**
 * WeatherMetrics
 * 2×2 grid of secondary weather metrics.
 * Unit labels come from context — no prop needed.
 */
export default function WeatherMetrics({ data }) {
  const { labels } = useUnits();
  const c = data.current;

  return (
    <dl
      aria-label="Weather metrics"
      className="glass-card p-7 grid grid-cols-2 gap-5"
    >
      {METRICS.map(({ key, label, unitKey, unit }) => {
        const displayUnit = unit ?? labels[unitKey] ?? '';
        const value = Math.round(c[key] * 10) / 10;

        return (
          <div key={key} className="flex flex-col gap-1.5">
            <dt className="text-[11px] font-semibold text-neutral-600 uppercase tracking-widest">
              {label}
            </dt>
            <dd className="font-display text-2xl font-bold text-white leading-none" style={{ letterSpacing: '-0.02em' }}>
              {value}
              <span className="text-sm font-light text-neutral-300 ml-1">{displayUnit}</span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
