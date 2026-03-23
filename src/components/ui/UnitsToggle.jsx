import { useUnits } from '../../context/UnitsContext';

/**
 * UnitsToggle
 * Reads + writes units directly from context — no props needed.
 * Fully keyboard accessible with role="group" and aria-pressed.
 */
export default function UnitsToggle() {
  const { units, setUnits } = useUnits();

  return (
    <div
      role="group"
      aria-label="Temperature unit"
      className="flex items-center gap-1 p-1 rounded-full"
      style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)' }}
    >
      {[
        { value: 'metric',   label: '°C' },
        { value: 'imperial', label: '°F' },
      ].map(({ value, label }) => (
        <button
          key={value}
          aria-pressed={units === value}
          onClick={() => setUnits(value)}
          className={[
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus-ring',
            units === value
              ? 'bg-orange-500 text-neutral-900 font-bold'
              : 'text-neutral-300 hover:text-white',
          ].join(' ')}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
