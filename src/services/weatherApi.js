const BASE = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetch full weather data for a given lat/lon.
 * Returns current conditions, hourly, and 7-day daily forecast.
 *
 * @param {number} lat
 * @param {number} lon
 * @param {'metric'|'imperial'} units
 * @returns {Promise<WeatherResponse>}
 */
export async function getWeather(lat, lon, units = 'metric') {
  const isImperial = units === 'imperial';

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
    ].join(','),
    hourly: ['temperature_2m', 'weather_code'].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
    ].join(','),
    temperature_unit: isImperial ? 'fahrenheit' : 'celsius',
    wind_speed_unit: isImperial ? 'mph' : 'kmh',
    precipitation_unit: isImperial ? 'inch' : 'mm',
    timezone: 'auto',
    forecast_days: 7,
  });

  const res = await fetch(`${BASE}?${params}`);

  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Unit labels derived from the units setting.
 * Import this wherever you need to display units consistently.
 */
export function getUnitLabels(units) {
  const isImperial = units === 'imperial';
  return {
    temp: isImperial ? '°F' : '°C',
    wind: isImperial ? 'mph' : 'km/h',
    precip: isImperial ? 'in' : 'mm',
  };
}
