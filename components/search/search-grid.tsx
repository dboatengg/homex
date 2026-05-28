import Link from "next/link"
import Image from "next/image"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"

interface SearchGridProps {
  listings: any[]
}

export function SearchGrid({ listings }: SearchGridProps) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-3">
        <p className="text-gray-500 font-medium">No properties found</p>
        <p className="text-sm text-gray-400">
          Try adjusting your filters or search a different city
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <p className="text-sm text-gray-500 mb-5">
        {listings.length} {listings.length === 1 ? "property" : "properties"} found
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {listings.map((listing) => (
          <SearchCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  )
}

function SearchCard({ listing }: { listing: any }) {
  const image = listing.images[0] ?? "/placeholder.jpg"

  return (
    <Link href={`/listings/${listing.id}`} className="group block">
      <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={image}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Save button */}
          <button
            className="absolute top-3 right-3 h-8 w-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          {/* Type badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full">
            For {listing.type === "RENT" ? "Rent" : "Sale"}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 flex-1">
              {listing.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <MapPin className="h-3 w-3 shrink-0" />
            {listing.city}, {listing.region}
          </div>

          {/* Stats */}
          {listing.category !== "LAND" && (
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
              {listing.bedrooms && (
                <div className="flex items-center gap-1">
                  <Bed className="h-3 w-3" />
                  {listing.bedrooms} bed
                </div>
              )}
              {listing.bathrooms && (
                <div className="flex items-center gap-1">
                  <Bath className="h-3 w-3" />
                  {listing.bathrooms} bath
                </div>
              )}
              {listing.area && (
                <div className="flex items-center gap-1">
                  <Square className="h-3 w-3" />
                  {listing.area} m²
                </div>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-900">
                GHS {listing.price.toLocaleString()}
              </span>
              {listing.type === "RENT" && (
                <span className="text-xs text-gray-500 font-normal"> /mo</span>
              )}
            </div>
            <span className="text-xs text-gray-400 capitalize">
              {listing.category.replace("_", " ").toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}