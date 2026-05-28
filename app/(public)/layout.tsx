import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <Navbar session={session} />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}