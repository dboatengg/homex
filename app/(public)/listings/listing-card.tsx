import Link from "next/link"
import Image from "next/image"
import { MapPin, Bed, Bath, Square } from "lucide-react"

interface ListingCardProps {
  listing: {
    id: string
    title: string
    price: number
    type: string
    category: string
    city: string
    region: string
    bedrooms: number | null
    bathrooms: number | null
    area: number | null
    images: string[]
    agent: {
      name: string | null
    }
  }
}

export function ListingCard({ listing }: ListingCardProps) {
  const image = listing.images[0] ?? "/placeholder.jpg"

  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="border rounded-xl overflow-hidden hover:border-primary transition-colors group">
        {/* Image */}
        <div className="relative h-52 w-full">
          <Image
            src={image}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Price badge overlaid on image */}
          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
            GHS {listing.price.toLocaleString()}
            {listing.type === "RENT" && (
              <span className="text-muted-foreground font-normal">/mo</span>
            )}
          </div>
          {/* Type badge */}
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
            {listing.type}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-sm line-clamp-1">{listing.title}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              {listing.city}, {listing.region}
            </div>
          </div>

          {/* Property stats */}
          {listing.category !== "LAND" && (
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
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

          <div className="text-xs text-muted-foreground">
            Listed by {listing.agent.name}
          </div>
        </div>
      </div>
    </Link>
  )
}