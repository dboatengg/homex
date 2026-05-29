import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Image from "next/image"
import { MapPin, Bed, Bath, Square, User, Phone, ArrowLeft } from "lucide-react"
import { ContactAgentForm } from "@/components/listings/contact-agent-form"
import { SavePropertyButton } from "@/components/listings/save-property-button"
import Link from "next/link"

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)
  const { id } = await params

  const listing = await db.listing.findUnique({
    where: { id, status: "ACTIVE" },
    include: { agent: true },
  })

  if (!listing) notFound()

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
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>

        {/* Image gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-96">
          {listing.images.slice(0, 5).map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden ${
                index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
              }`}
            >
              <Image
                src={image}
                alt={`${listing.title} ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
          {/* Fill empty slots if less than 5 images */}
          {listing.images.length < 2 &&
            Array.from({ length: 4 - listing.images.length }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-gray-100" />
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {listing.category.replace("_", " ").toLowerCase()}
                  </span>
                  <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                    For {listing.type === "RENT" ? "Rent" : "Sale"}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {listing.title}
                </h1>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="text-sm">
                    {listing.address}, {listing.city}, {listing.region}
                  </span>
                </div>
              </div>
              {session && (
                <SavePropertyButton
                  listingId={listing.id}
                  initialSaved={!!savedProperty}
                />
              )}
            </div>

            {/* Price */}
            <div className="pb-6 border-b border-gray-100">
              <p className="text-3xl font-bold text-gray-900">
                GHS {listing.price.toLocaleString()}
                {listing.type === "RENT" && (
                  <span className="text-lg text-gray-400 font-normal"> /month</span>
                )}
              </p>
            </div>

            {/* Stats */}
            {listing.category !== "LAND" && (
              <div className="grid grid-cols-3 gap-4 pb-6 border-b border-gray-100">
                {listing.bedrooms && (
                  <div className="bg-gray-50 rounded-2xl p-4 text-center">
                    <Bed className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                    <p className="text-xl font-bold text-gray-900">
                      {listing.bedrooms}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Bedrooms</p>
                  </div>
                )}
                {listing.bathrooms && (
                  <div className="bg-gray-50 rounded-2xl p-4 text-center">
                    <Bath className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                    <p className="text-xl font-bold text-gray-900">
                      {listing.bathrooms}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Bathrooms</p>
                  </div>
                )}
                {listing.area && (
                  <div className="bg-gray-50 rounded-2xl p-4 text-center">
                    <Square className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                    <p className="text-xl font-bold text-gray-900">
                      {listing.area}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">m² area</p>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="space-y-3 pb-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">About this property</h2>
              <p className="text-gray-600 leading-relaxed">{listing.description}</p>
            </div>

            {/* Amenities */}
            {listing.amenities.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="bg-gray-50 border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-xl capitalize"
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
            <div className="border border-gray-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {listing.agent.name}
                  </p>
                  <p className="text-xs text-gray-500">Property Agent</p>
                </div>
              </div>
              {listing.agent.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-xl px-3 py-2.5">
                  <Phone className="h-4 w-4 shrink-0" />
                  {listing.agent.phone}
                </div>
              )}
            </div>

            {/* Contact form or sign in prompt */}
            {session ? (
              <ContactAgentForm
                listingId={listing.id}
                agentId={listing.agentId}
              />
            ) : (
              <div className="border border-gray-200 rounded-2xl p-5 text-center space-y-4">
                <p className="text-sm text-gray-500">
                  Sign in to contact the agent about this property
                </p>
                <Link
                  href="/signin"
                  className="block w-full bg-gray-900 text-white text-sm font-semibold py-3 rounded-xl text-center hover:bg-gray-800 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="block w-full border border-gray-200 text-gray-700 text-sm font-semibold py-3 rounded-xl text-center hover:border-gray-300 transition-colors"
                >
                  Create account
                </Link>
              </div>
            )}

            {/* Save property */}
            {session && (
              <div className="border border-gray-200 rounded-2xl p-5 text-center space-y-3">
                <p className="text-sm text-gray-500">
                  Interested in this property?
                </p>
                <SavePropertyButton
                  listingId={listing.id}
                  initialSaved={!!savedProperty}
                  fullWidth
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}