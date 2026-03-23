const BASE = 'https://geocoding-api.open-meteo.com/v1/search';

/**
 * Search for locations by name.
 * Returns an array of matching places with lat/lon.
 *
 * @param {string} query - City name or address
 * @param {number} count - Max results (default 5)
 * @returns {Promise<GeoResult[]>}
 */
export async function searchLocations(query, count = 5) {
  if (!query?.trim()) return [];

  const params = new URLSearchParams({
    name: query.trim(),
    count,
    language: 'en',
    format: 'json',
  });

  const res = await fetch(`${BASE}?${params}`);

  if (!res.ok) {
    throw new Error(`Geocoding API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.results ?? [];
}

/**
 * Format a location result into a readable display string.
 * e.g. "New York, New York, United States"
 *
 * @param {GeoResult} location
 * @returns {string}
 */
export function formatLocation(location) {
  return [location.name, location.admin1, location.country]
    .filter(Boolean)
    .join(', ');
}
