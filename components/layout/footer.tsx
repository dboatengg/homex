import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <p className="text-xl font-bold">
              Home<span className="text-primary">X</span>
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Ghana's modern real estate platform. Find, list, and manage
              residential properties across the country.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Platform</p>
            <div className="space-y-2">
              {[
                { href: "/listings", label: "Browse Properties" },
                { href: "/become-an-agent", label: "Become an Agent" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Account</p>
            <div className="space-y-2">
              {[
                { href: "/signin", label: "Sign In" },
                { href: "/signup", label: "Create Account" },
                { href: "/dashboard", label: "Dashboard" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HomeX. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built in Ghana 🇬🇭
          </p>
        </div>
      </div>
    </footer>
  )
}