import { useState, useRef, useEffect, useId } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { formatLocation } from '../../services/geocodingApi';

/**
 * SearchBar
 * - Triggers search after 2 characters (via useSearch / React Query)
 * - Fully keyboard accessible: arrow keys, Enter, Escape
 * - Uses aria-combobox pattern for screen readers
 *
 * @param {{ onSelect: (location: GeoResult) => void }} props
 */
export default function SearchBar({ onSelect }) {
  const [query, setQuery]     = useState('');
  const [open, setOpen]       = useState(false);
  const [active, setActive]   = useState(-1);
  const inputRef              = useRef(null);
  const listRef               = useRef(null);
  const listId                = useId();

  const { data: results = [], isFetching } = useSearch(query);

  // Open results when we have them
  useEffect(() => {
    if (results.length > 0) { setOpen(true); setActive(-1); }
  }, [results]);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (!inputRef.current?.closest('[data-search]')?.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function pick(location) {
    setQuery(location.name);
    setOpen(false);
    setActive(-1);
    onSelect(location);
  }

  function handleKeyDown(e) {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(a => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      pick(results[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div data-search className="relative mb-10 animate-fade-up">
      {/* Input row */}
      <div
        className="flex items-center gap-3 px-5 rounded-2xl transition-all duration-200"
        style={{
          background: 'var(--glass)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <span aria-hidden="true" className="text-neutral-300 text-lg flex-shrink-0">🔍</span>

        <input
          ref={inputRef}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={active >= 0 ? `result-${active}` : undefined}
          aria-label="Search for a city"
          type="search"
          placeholder="Search for a city, e.g. New York..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 py-[18px] bg-transparent border-none outline-none text-white placeholder-neutral-600 text-base font-light focus-ring rounded-none"
        />

        {isFetching && (
          <span aria-label="Searching..." className="text-neutral-600 text-sm flex-shrink-0">
            ···
          </span>
        )}
      </div>

      {/* Results dropdown */}
      {open && results.length > 0 && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          aria-label="Search results"
          className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 overflow-hidden rounded-2xl animate-drop-in"
          style={{
            background: 'hsl(243, 30%, 16%)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          {results.map((r, i) => (
            <li
              key={r.id ?? i}
              id={`result-${i}`}
              role="option"
              aria-selected={active === i}
              onClick={() => pick(r)}
              onMouseEnter={() => setActive(i)}
              className={[
                'flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors border-b last:border-b-0',
                active === i ? 'bg-white/10' : 'hover:bg-white/5',
              ].join(' ')}
              style={{ borderColor: 'var(--glass-border)' }}
            >
              <span aria-hidden="true">📍</span>
              <div>
                <div className="text-[15px] font-medium text-white">{r.name}</div>
                <div className="text-xs text-neutral-300 mt-0.5">
                  {[r.admin1, r.country].filter(Boolean).join(', ')}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {open && results.length === 0 && !isFetching && query.trim().length >= 2 && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 px-5 py-4 text-center text-neutral-300 text-sm rounded-2xl animate-drop-in"
          style={{ background: 'hsl(243, 30%, 16%)', border: '1px solid var(--glass-border)' }}
          role="status"
          aria-live="polite"
        >
          No results for "{query}"
        </div>
      )}
    </div>
  );
}
