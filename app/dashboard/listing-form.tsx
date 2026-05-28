"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { X } from "lucide-react"

interface ListingFormProps {
  listing?: {
    id: string
    title: string
    description: string
    price: number
    type: string
    category: string
    bedrooms: number | null
    bathrooms: number | null
    area: number | null
    address: string
    city: string
    region: string
    amenities: string[]
    images: string[]
  }
}

const GHANA_REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Central",
  "Eastern",
  "Northern",
  "Upper East",
  "Upper West",
  "Volta",
  "Brong-Ahafo",
  "Oti",
  "Savannah",
  "North East",
  "Bono East",
  "Ahafo",
  "Western North",
]

export function ListingForm({ listing }: ListingFormProps) {
  const router = useRouter()
  const isEditing = !!listing

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [images, setImages] = useState<string[]>(listing?.images ?? [])
  const [amenityInput, setAmenityInput] = useState("")
  const [amenities, setAmenities] = useState<string[]>(
    listing?.amenities ?? []
  )

  const [formData, setFormData] = useState({
    title: listing?.title ?? "",
    description: listing?.description ?? "",
    price: listing?.price?.toString() ?? "",
    type: listing?.type ?? "RENT",
    category: listing?.category ?? "APARTMENT",
    bedrooms: listing?.bedrooms?.toString() ?? "",
    bathrooms: listing?.bathrooms?.toString() ?? "",
    area: listing?.area?.toString() ?? "",
    address: listing?.address ?? "",
    city: listing?.city ?? "",
    region: listing?.region ?? "Greater Accra",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addAmenity = () => {
    if (amenityInput.trim() && !amenities.includes(amenityInput.trim())) {
      setAmenities([...amenities, amenityInput.trim().toLowerCase()])
      setAmenityInput("")
    }
  }

  const removeAmenity = (amenity: string) => {
    setAmenities(amenities.filter((a) => a !== amenity))
  }

  const removeImage = (url: string) => {
    setImages(images.filter((img) => img !== url))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (images.length === 0) {
      setError("Please upload at least one image")
      return
    }

    setIsLoading(true)

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        area: formData.area ? parseFloat(formData.area) : null,
        images,
        amenities,
      }

      const res = await fetch(
        isEditing ? `/api/listings/${listing.id}` : "/api/listings",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Something went wrong")
        return
      }

      router.push("/dashboard/listings")
      router.refresh()
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">
          {error}
        </p>
      )}

      {/* Basic info */}
      <div className="space-y-4">
        <h2 className="font-semibold">Basic Information</h2>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="3 Bedroom House in East Legon"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the property..."
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={formData.type}
              onValueChange={(v) => setFormData({ ...formData, type: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RENT">Rent</SelectItem>
                <SelectItem value="SALE">Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={(v) => setFormData({ ...formData, category: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HOUSE">House</SelectItem>
                <SelectItem value="APARTMENT">Apartment</SelectItem>
                <SelectItem value="SELF_CONTAINED">Self Contained</SelectItem>
                <SelectItem value="COMPOUND_HOUSE">Compound House</SelectItem>
                <SelectItem value="LAND">Land</SelectItem>
                <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">
            Price (GHS){" "}
            {formData.type === "RENT" && (
              <span className="text-muted-foreground font-normal">/month</span>
            )}
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Property details */}
      <div className="space-y-4">
        <h2 className="font-semibold">Property Details</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              name="bedrooms"
              type="number"
              placeholder="0"
              value={formData.bedrooms}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              placeholder="0"
              value={formData.bathrooms}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Area (m²)</Label>
            <Input
              id="area"
              name="area"
              type="number"
              placeholder="0"
              value={formData.area}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h2 className="font-semibold">Location</h2>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="East Legon, Accra"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="Accra"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Region</Label>
            <Select
              value={formData.region}
              onValueChange={(v) => setFormData({ ...formData, region: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GHANA_REGIONS.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <h2 className="font-semibold">Amenities</h2>

        <div className="flex gap-2">
          <Input
            placeholder="e.g. parking, generator, borehole"
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addAmenity()
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addAmenity}>
            Add
          </Button>
        </div>

        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity) => (
              <span
                key={amenity}
                className="flex items-center gap-1 border px-3 py-1 rounded-full text-sm"
              >
                {amenity}
                <button
                  type="button"
                  onClick={() => removeAmenity(amenity)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h2 className="font-semibold">Images</h2>

        {/* Preview uploaded images */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {images.map((url) => (
              <div key={url} className="relative h-28 rounded-lg overflow-hidden group">
                <Image src={url} alt="listing" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Cloudinary upload widget */}
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={(result: any) => {
            const url = result?.info?.secure_url
            if (url) setImages((prev) => [...prev, url])
          }}
          options={{ multiple: true, maxFiles: 6 }}
        >
          {({ open }) => (
            <Button type="button" variant="outline" onClick={() => open()}>
              Upload Images
            </Button>
          )}
        </CldUploadWidget>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading
          ? isEditing
            ? "Saving..."
            : "Creating..."
          : isEditing
          ? "Save Changes"
          : "Create Listing"}
      </Button>
    </form>
  )
}