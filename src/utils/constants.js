export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export const EXPENSE_CATEGORIES = [
  { value: 'accommodation', label: '🏨 Accommodation', color: '#0ea5e9' },
  { value: 'food', label: '🍽️ Food & Dining', color: '#f97316' },
  { value: 'transport', label: '🚗 Transport', color: '#8b5cf6' },
  { value: 'activities', label: '🎭 Activities', color: '#10b981' },
  { value: 'shopping', label: '🛍️ Shopping', color: '#ec4899' },
  { value: 'other', label: '📦 Other', color: '#64748b' },
];

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'population-desc', label: 'Population (High → Low)' },
  { value: 'population-asc', label: 'Population (Low → High)' },
  { value: 'area-desc', label: 'Area (Largest)' },
];

export const ITEMS_PER_PAGE = 12;

export const WEATHER_CODES = {
  0: { desc: 'Clear sky', icon: '☀️' },
  1: { desc: 'Mainly clear', icon: '🌤️' },
  2: { desc: 'Partly cloudy', icon: '⛅' },
  3: { desc: 'Overcast', icon: '☁️' },
  45: { desc: 'Fog', icon: '🌫️' },
  48: { desc: 'Depositing rime fog', icon: '🌫️' },
  51: { desc: 'Light drizzle', icon: '🌦️' },
  53: { desc: 'Moderate drizzle', icon: '🌦️' },
  55: { desc: 'Dense drizzle', icon: '🌧️' },
  61: { desc: 'Slight rain', icon: '🌧️' },
  63: { desc: 'Moderate rain', icon: '🌧️' },
  65: { desc: 'Heavy rain', icon: '🌧️' },
  71: { desc: 'Slight snow', icon: '🌨️' },
  73: { desc: 'Moderate snow', icon: '🌨️' },
  75: { desc: 'Heavy snow', icon: '❄️' },
  80: { desc: 'Rain showers', icon: '🌦️' },
  81: { desc: 'Moderate showers', icon: '🌧️' },
  82: { desc: 'Violent showers', icon: '⛈️' },
  95: { desc: 'Thunderstorm', icon: '⛈️' },
  96: { desc: 'Thunderstorm with hail', icon: '⛈️' },
  99: { desc: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

export const ACTIVITY_TYPES = [
  { value: 'sightseeing', label: '🏛️ Sightseeing' },
  { value: 'food', label: '🍽️ Food & Dining' },
  { value: 'adventure', label: '🧗 Adventure' },
  { value: 'relaxation', label: '🧘 Relaxation' },
  { value: 'shopping', label: '🛍️ Shopping' },
  { value: 'transport', label: '✈️ Transport' },
  { value: 'accommodation', label: '🏨 Check-in/out' },
  { value: 'other', label: '📌 Other' },
];
