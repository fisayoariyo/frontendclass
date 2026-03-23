import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../services/weatherApi';

/**
 * Fetches weather data for a given location and units setting.
 * Caches for 10 minutes — unit toggles reuse cached data per location.
 *
 * @param {{ latitude: number, longitude: number } | null} location
 * @param {'metric'|'imperial'} units
 */
export function useWeather(location, units) {
  return useQuery({
    // Key includes units so metric/imperial are cached separately
    queryKey: ['weather', location?.latitude, location?.longitude, units],
    queryFn: () => getWeather(location.latitude, location.longitude, units),
    enabled: !!location,          // Don't run until a location is selected
    staleTime: 1000 * 60 * 10,   // Cache for 10 minutes
    retry: 2,                     // Retry failed requests twice
    refetchOnWindowFocus: false,  // Don't re-fetch when user switches tabs
  });
}
