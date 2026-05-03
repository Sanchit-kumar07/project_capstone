import { memo } from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../utils/formatters';
import { getDestinationImage } from '../../utils/destinationImages';

const DestinationCard = memo(function DestinationCard({ country }) {
  const name = country.name?.common || 'Unknown';
  const capital = country.capital?.[0] || 'N/A';
  const flag = country.flags?.svg || country.flags?.png;
  const region = country.region;
  const population = country.population;
  const currencies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A';
  const languages = country.languages ? Object.values(country.languages).slice(0, 2).join(', ') : 'N/A';
  const photo = getDestinationImage(country.cca3);

  return (
    <Link
      to={`/destinations/${country.cca3}`}
      className="group bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      id={`destination-card-${country.cca3}`}
    >
      {/* Destination photo */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={photo}
          alt={`${name} landscape`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Flag badge */}
        <img
          src={flag}
          alt={`${name} flag`}
          className="absolute top-3 left-3 w-8 h-6 object-cover rounded shadow-md border border-white/50"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 px-2 py-1 bg-white/90 dark:bg-dark-800/90 text-xs font-semibold rounded-lg text-primary-600 dark:text-primary-400">
          {region}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-primary-500 transition-colors truncate">
          {name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">🏛️ {capital}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span>👥 {formatNumber(population)}</span>
          <span>💰 {currencies.length > 20 ? currencies.slice(0, 20) + '…' : currencies}</span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 truncate">🗣️ {languages}</p>
      </div>
    </Link>
  );
});

export default DestinationCard;
