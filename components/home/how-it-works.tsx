import { Search, UserCheck, Home } from "lucide-react"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse Properties",
    description:
      "Search and filter through hundreds of verified listings across Ghana. Filter by city, price, type, and more.",
  },
  {
    icon: UserCheck,
    step: "02",
    title: "Contact the Agent",
    description:
      "Found something you like? Send a message directly to the agent and schedule a viewing at your convenience.",
  },
  {
    icon: Home,
    step: "03",
    title: "Move In",
    description:
      "Finalise the deal with your agent and get the keys to your new home. It's that simple.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-primary text-sm font-medium uppercase tracking-widest">
            How it works
          </p>
          <h2 className="text-4xl font-bold">Three Steps to Your New Home</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            HomeX makes finding and renting or buying property in Ghana simple
            and straightforward.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-4xl font-bold text-border">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}