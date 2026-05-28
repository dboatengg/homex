import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Image from "next/image"
import { MapPin, Bed, Bath, Square, User, Phone } from "lucide-react"
import { ContactAgentForm } from "../contact-agent-form"
import { SavePropertyButton } from "../save-property-button"

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const {id} = await params
  const session = await getServerSession(authOptions)

  const listing = await db.listing.findUnique({
    where: { id, status: "ACTIVE" },
    include: { agent: true },
  })

  if (!listing) notFound()

  // Check if the current user has saved this listing
  const savedProperty = session
    ? await db.savedProperty.findUnique({
        where: {
          userId_listingId: {
            userId: session.user.id,
            listingId: listing.id,
          },
        },
      })
    : null

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Image gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl overflow-hidden">
        {listing.images.map((image, index) => (
          <div
            key={index}
            className={`relative ${
              index === 0 && listing.images.length > 1
                ? "md:row-span-2 h-80 md:h-full"
                : "h-48"
            }`}
          >
            <Image
              src={image}
              alt={`${listing.title} - image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{listing.title}</h1>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                {listing.address}, {listing.city}, {listing.region}
              </div>
            </div>
            {session && (
              <SavePropertyButton
                listingId={listing.id}
                initialSaved={!!savedProperty}
              />
            )}
          </div>

          {/* Price and type */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold">
              GHS {listing.price.toLocaleString()}
              {listing.type === "RENT" && (
                <span className="text-lg text-muted-foreground font-normal">
                  /mo
                </span>
              )}
            </p>
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              For {listing.type === "RENT" ? "Rent" : "Sale"}
            </span>
            <span className="border px-3 py-1 rounded-full text-sm capitalize">
              {listing.category.replace("_", " ").toLowerCase()}
            </span>
          </div>

          {/* Stats */}
          {listing.category !== "LAND" && (
            <div className="flex items-center gap-6 py-4 border-t border-b">
              {listing.bedrooms && (
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold">{listing.bedrooms}</p>
                    <p className="text-xs text-muted-foreground">Bedrooms</p>
                  </div>
                </div>
              )}
              {listing.bathrooms && (
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold">{listing.bathrooms}</p>
                    <p className="text-xs text-muted-foreground">Bathrooms</p>
                  </div>
                </div>
              )}
              {listing.area && (
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold">{listing.area} m²</p>
                    <p className="text-xs text-muted-foreground">Area</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* Amenities */}
          {listing.amenities.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="border px-3 py-1 rounded-full text-sm capitalize"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Agent card */}
          <div className="border rounded-xl p-5 space-y-3">
            <h3 className="font-semibold">Listed by</h3>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">{listing.agent.name}</p>
                <p className="text-xs text-muted-foreground">
                  {listing.agent.email}
                </p>
              </div>
            </div>
            {listing.agent.phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {listing.agent.phone}
              </div>
            )}
          </div>

          {/* Contact form */}
          {session ? (
            <ContactAgentForm
              listingId={listing.id}
              agentId={listing.agentId}
            />
          ) : (
            <div className="border rounded-xl p-5 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Sign in to contact the agent
              </p>
              <a
                href="/signin"
                className="block w-full bg-primary text-primary-foreground text-sm font-medium py-2 rounded-lg text-center"
              >
                Sign in
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}