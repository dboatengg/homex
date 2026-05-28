import { ContactForm } from "@/components/contact/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata = {
  title: "Contact HomeX",
  description:
    "Get in touch with HomeX support for questions about listings, accounts, and real estate services in Ghana.",
}

const contactDetails = [
  {
    icon: Mail,
    label: "Email support",
    value: "support@homex.gh",
    description: "We reply within one business day.",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+233 24 400 0000",
    description: "Available Mon–Fri, 8am–5pm.",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Pacific Towers, Airport City",
    description: "Accra, Ghana",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-14 max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500 mb-3">
            Contact us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            We&apos;d love to hear from you
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Whether you have a question about a listing, need help with your
            account, or want to become an agent, our team is here to help.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">

          {/* Left — contact info */}
          <div className="space-y-4">
            {contactDetails.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {item.description}
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-2">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Extra note */}
            {/* Extra note */}
<div className="rounded-2xl border border-gray-200 p-5">
  <p className="text-sm font-semibold text-gray-900 mb-1">
    Want to list a property?
  </p>
  <p className="text-sm text-gray-500 leading-relaxed">
    Apply to become an agent and start listing properties across
    Ghana within 24 hours of approval.
  </p>
  
    <a href="/become-an-agent"
    className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-amber-500 hover:text-amber-600 transition-colors">
    Apply to become an agent →
  </a>
</div>
            {/* <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-sm font-semibold text-amber-800 mb-1">
                Want to list a property?
              </p>
              <p className="text-sm text-amber-700">
                Apply to become an agent and start listing properties across
                Ghana within 24 hours of approval.
              </p>
              <a href="/become-an-agent"
                className="inline-block mt-3 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              >
                Apply now →
              </a>
            </div> */}
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}