import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database...")

  // Create a seed agent user
  const agent = await db.user.upsert({
    where: { email: "agent@homex.gh" },
    update: {},
    create: {
      name: "Kofi Mensah",
      email: "agent@homex.gh",
      role: "AGENT",
    },
  })

  const listings = [
    {
      title: "Modern 3 Bedroom House in East Legon",
      description:
        "A beautifully finished 3 bedroom house in the heart of East Legon. Features a spacious living area, modern kitchen, and a private garden. Close to schools, shopping malls, and major roads.",
      price: 4500,
      type: "RENT" as const,
      category: "HOUSE" as const,
      status: "ACTIVE" as const,
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      address: "East Legon, Accra",
      city: "Accra",
      region: "Greater Accra",
      featured: true,
      amenities: ["parking", "generator", "security", "water"],
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      ],
      agentId: agent.id,
    },
    {
      title: "Self Contained Apartment in Kumasi",
      description:
        "A well maintained self contained apartment in a serene neighbourhood in Kumasi. Ideal for a young professional or couple. Has a kitchenette, bathroom, and a small balcony.",
      price: 800,
      type: "RENT" as const,
      category: "SELF_CONTAINED" as const,
      status: "ACTIVE" as const,
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      address: "Ahodwo, Kumasi",
      city: "Kumasi",
      region: "Ashanti",
      featured: false,
      amenities: ["water", "security"],
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      ],
      agentId: agent.id,
    },
    {
      title: "4 Bedroom House for Sale in Tema",
      description:
        "Spacious 4 bedroom detached house in a gated community in Tema Community 25. Features a large compound, boys quarters, and covered parking for 2 cars.",
      price: 380000,
      type: "SALE" as const,
      category: "HOUSE" as const,
      status: "ACTIVE" as const,
      bedrooms: 4,
      bathrooms: 3,
      area: 260,
      address: "Community 25, Tema",
      city: "Tema",
      region: "Greater Accra",
      featured: true,
      amenities: ["parking", "generator", "borehole", "security", "boys quarters"],
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
        "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800",
      ],
      agentId: agent.id,
    },
    {
      title: "2 Bedroom Apartment in Airport Residential",
      description:
        "A modern 2 bedroom apartment on the 3rd floor of a well managed building in Airport Residential Area. Fully tiled, fitted kitchen, and 24 hour security.",
      price: 3200,
      type: "RENT" as const,
      category: "APARTMENT" as const,
      status: "ACTIVE" as const,
      bedrooms: 2,
      bathrooms: 2,
      area: 110,
      address: "Airport Residential, Accra",
      city: "Accra",
      region: "Greater Accra",
      featured: true,
      amenities: ["parking", "security", "water", "generator"],
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
      ],
      agentId: agent.id,
    },
    {
      title: "Land for Sale in Tanoso, Kumasi",
      description:
        "A registered plot of land measuring 100x80ft in a fast developing area of Tanoso, Kumasi. Has a building permit and all documents are intact.",
      price: 85000,
      type: "SALE" as const,
      category: "LAND" as const,
      status: "ACTIVE" as const,
      bedrooms: null,
      bathrooms: null,
      area: 744,
      address: "Tanoso, Kumasi",
      city: "Kumasi",
      region: "Ashanti",
      featured: false,
      amenities: [],
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      ],
      agentId: agent.id,
    },
    {
      title: "3 Bedroom Townhouse in Cantonments",
      description:
        "An elegant 3 bedroom townhouse in one of Accra's most prestigious neighbourhoods. Features a rooftop terrace, modern finishes, and a shared swimming pool.",
      price: 6500,
      type: "RENT" as const,
      category: "TOWNHOUSE" as const,
      status: "ACTIVE" as const,
      bedrooms: 3,
      bathrooms: 3,
      area: 220,
      address: "Cantonments, Accra",
      city: "Accra",
      region: "Greater Accra",
      featured: true,
      amenities: ["parking", "pool", "generator", "security", "water"],
      images: [
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      ],
      agentId: agent.id,
    },
    {
      title: "Compound House in Takoradi",
      description:
        "A well maintained compound house with 6 rooms in a central location in Takoradi. Currently generating rental income. Ideal for investment.",
      price: 220000,
      type: "SALE" as const,
      category: "COMPOUND_HOUSE" as const,
      status: "ACTIVE" as const,
      bedrooms: 6,
      bathrooms: 3,
      area: 400,
      address: "Effiakuma, Takoradi",
      city: "Takoradi",
      region: "Western",
      featured: false,
      amenities: ["water", "parking"],
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      ],
      agentId: agent.id,
    },
    {
      title: "1 Bedroom Apartment in Labone",
      description:
        "A cosy and fully furnished 1 bedroom apartment in Labone, Accra. Walking distance to restaurants, cafes, and the beach. Perfect for short or long term rental.",
      price: 1800,
      type: "RENT" as const,
      category: "APARTMENT" as const,
      status: "ACTIVE" as const,
      bedrooms: 1,
      bathrooms: 1,
      area: 65,
      address: "Labone, Accra",
      city: "Accra",
      region: "Greater Accra",
      featured: false,
      amenities: ["security", "water", "furnished"],
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      ],
      agentId: agent.id,
    },
  ]

  for (const listing of listings) {
    await db.listing.create({ data: listing })
  }

  console.log(`Seeded ${listings.length} listings`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())