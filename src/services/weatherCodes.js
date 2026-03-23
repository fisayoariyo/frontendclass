/**
 * WMO Weather interpretation codes (WW)
 * https://open-meteo.com/en/docs#weathervariables
 */
const WEATHER_CODES = {
  0:  { label: 'Clear Sky',        emoji: '☀️' },
  1:  { label: 'Mostly Clear',     emoji: '🌤️' },
  2:  { label: 'Partly Cloudy',    emoji: '⛅' },
  3:  { label: 'Overcast',         emoji: '☁️' },
  45: { label: 'Foggy',            emoji: '🌫️' },
  48: { label: 'Icy Fog',          emoji: '🌫️' },
  51: { label: 'Light Drizzle',    emoji: '🌦️' },
  53: { label: 'Drizzle',          emoji: '🌦️' },
  55: { label: 'Heavy Drizzle',    emoji: '🌧️' },
  61: { label: 'Light Rain',       emoji: '🌧️' },
  63: { label: 'Rain',             emoji: '🌧️' },
  65: { label: 'Heavy Rain',       emoji: '🌧️' },
  71: { label: 'Light Snow',       emoji: '🌨️' },
  73: { label: 'Snow',             emoji: '❄️' },
  75: { label: 'Heavy Snow',       emoji: '❄️' },
  80: { label: 'Rain Showers',     emoji: '🌦️' },
  81: { label: 'Showers',          emoji: '🌧️' },
  82: { label: 'Heavy Showers',    emoji: '⛈️' },
  95: { label: 'Thunderstorm',     emoji: '⛈️' },
  96: { label: 'Hail Storm',       emoji: '⛈️' },
  99: { label: 'Severe Storm',     emoji: '🌩️' },
};

/**
 * Get weather label and emoji for a WMO code.
 * Falls back to the nearest decade code (e.g. 63 → 60) if exact match not found.
 *
 * @param {number} code
 * @returns {{ label: string, emoji: string }}
 */
export function getWeatherInfo(code) {
  return (
    WEATHER_CODES[code] ??
    WEATHER_CODES[Math.floor(code / 10) * 10] ??
    { label: 'Unknown', emoji: '🌡️' }
  );
}
