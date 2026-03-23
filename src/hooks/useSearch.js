import { useQuery } from '@tanstack/react-query';
import { searchLocations } from '../services/geocodingApi';

/**
 * Searches for locations by query string.
 * Only fires when query is 2+ characters.
 * Results are cached for 5 minutes.
 *
 * @param {string} query
 */
export function useSearch(query) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchLocations(query),
    enabled: query.trim().length >= 2,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
