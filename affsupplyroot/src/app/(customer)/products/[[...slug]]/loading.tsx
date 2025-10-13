export default function LoadingProductPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-5">
          <div className="h-80 bg-gray-100 rounded-md animate-pulse" />
        </div>
        <div className="lg:col-span-7 space-y-4 animate-pulse">
          <div className="h-6 bg-gray-100 rounded w-3/4" />
          <div className="h-6 bg-gray-100 rounded w-1/2" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
          <div className="h-10 bg-gray-100 rounded w-40" />
        </div>
      </div>
    </div>
  )
}


