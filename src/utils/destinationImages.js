// Direct Unsplash image URLs (no API key needed, works on any deployment)
// These are permanent links to real, high-quality destination photos
const DESTINATION_IMAGES = {
  // Popular destinations
  FRA: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=400&fit=crop',
  JPN: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop',
  ITA: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=400&fit=crop',
  THA: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
  GRC: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=400&fit=crop',
  ESP: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&h=400&fit=crop',
  AUS: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=400&fit=crop',
  BRA: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=400&fit=crop',
  USA: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=400&fit=crop',
  GBR: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop',
  IND: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=400&fit=crop',
  DEU: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=400&fit=crop',
  CAN: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=400&fit=crop',
  MEX: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&h=400&fit=crop',
  CHN: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=400&fit=crop',
  TUR: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=400&fit=crop',
  EGY: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=800&h=400&fit=crop',
  IDN: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=400&fit=crop',
  NZL: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=400&fit=crop',
  ZAF: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=400&fit=crop',
  PER: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=400&fit=crop',
  CHE: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&h=400&fit=crop',
  PRT: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=400&fit=crop',
  NOR: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&h=400&fit=crop',
  ISL: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&h=400&fit=crop',
  KOR: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=400&fit=crop',
  ARE: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop',
  SGP: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=400&fit=crop',
  CUB: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=800&h=400&fit=crop',
  MAR: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=400&fit=crop',
  HRV: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&h=400&fit=crop',
};

// Fallback travel-themed images (used when country code not mapped)
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=400&fit=crop',
];

export const getDestinationImage = (countryCode) => {
  if (DESTINATION_IMAGES[countryCode]) return DESTINATION_IMAGES[countryCode];
  // Deterministic fallback based on country code
  const idx = (countryCode?.charCodeAt(0) || 0) % FALLBACK_IMAGES.length;
  return FALLBACK_IMAGES[idx];
};

export const getTripCoverImage = (destination) => {
  // Try to match destination name to a country code
  const nameToCode = {
    'france': 'FRA', 'japan': 'JPN', 'italy': 'ITA', 'thailand': 'THA',
    'greece': 'GRC', 'spain': 'ESP', 'australia': 'AUS', 'brazil': 'BRA',
    'united states': 'USA', 'united kingdom': 'GBR', 'india': 'IND',
    'germany': 'DEU', 'canada': 'CAN', 'mexico': 'MEX', 'china': 'CHN',
    'turkey': 'TUR', 'egypt': 'EGY', 'indonesia': 'IDN', 'new zealand': 'NZL',
    'south africa': 'ZAF', 'peru': 'PER', 'switzerland': 'CHE',
    'portugal': 'PRT', 'norway': 'NOR', 'iceland': 'ISL', 'south korea': 'KOR',
    'uae': 'ARE', 'singapore': 'SGP', 'cuba': 'CUB', 'morocco': 'MAR', 'croatia': 'HRV',
  };
  const code = nameToCode[destination?.toLowerCase()];
  if (code && DESTINATION_IMAGES[code]) return DESTINATION_IMAGES[code];
  return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
};

export default DESTINATION_IMAGES;
