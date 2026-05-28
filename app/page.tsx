import { db } from "@/lib/db"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedListings } from "@/components/home/featured-listings"
import { HowItWorks } from "@/components/home/how-it-works"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  const featuredListings = await db.listing.findMany({
    where: { status: "ACTIVE", featured: true },
    include: { agent: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar session={session} />
      <HeroSection />
      <FeaturedListings listings={featuredListings} />
      <HowItWorks />
      <Footer />
    </div>
  )
}