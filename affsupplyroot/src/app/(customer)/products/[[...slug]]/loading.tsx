export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border-2 border-amber-200/60 bg-white shadow-md overflow-hidden">
      <div className="animate-pulse">
        <div className="h-56 bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50/40 via-orange-50/20 to-amber-50/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5">
          {Array.from({ length: 10 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}