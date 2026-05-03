export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className={`${sizes[size]} border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin`} />
      {text && <p className="text-gray-500 dark:text-gray-400 text-sm">{text}</p>}
    </div>
  );
}

export function DestinationCardSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-md">
      <div className="skeleton h-40 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="flex gap-2">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export function TripCardSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-md">
      <div className="skeleton h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-6 w-2/3" />
        <div className="skeleton h-4 w-full" />
        <div className="flex gap-3">
          <div className="skeleton h-8 w-24" />
          <div className="skeleton h-8 w-24" />
        </div>
      </div>
    </div>
  );
}
