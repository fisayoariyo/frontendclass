import { createContext, useContext, useState } from 'react';
import { getUnitLabels } from '../services/weatherApi';

const UnitsContext = createContext(null);

/**
 * Provides units state (metric/imperial) to the entire tree.
 * Wrap your App with this so any component can read units
 * without prop drilling.
 */
export function UnitsProvider({ children }) {
  const [units, setUnits] = useState('metric');
  const labels = getUnitLabels(units);

  return (
    <UnitsContext.Provider value={{ units, setUnits, labels }}>
      {children}
    </UnitsContext.Provider>
  );
}

/**
 * Hook to consume units context.
 * Returns { units, setUnits, labels }
 *
 * Usage:
 *   const { units, labels } = useUnits();
 *   <span>{temp}{labels.temp}</span>
 */
export function useUnits() {
  const ctx = useContext(UnitsContext);
  if (!ctx) throw new Error('useUnits must be used inside <UnitsProvider>');
  return ctx;
}
