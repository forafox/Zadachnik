import { Button } from "@/shared/components/ui/button"
import { Link } from "@tanstack/react-router"
import { ArrowRight, CheckCircle } from "lucide-react"

export function LandingPage() {
  const features = [
    "Smart task organization for Scrum teams",
    "Real-time collaboration tools",
    "Sprint planning made easy",
    "Customizable Scrum boards",
    "Advanced analytics and reporting",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Zadachnik
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The intelligent task tracker designed specifically for{" "}
            Scrum teams to streamline their agile workflow and boost productivity.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link to="/tasks">Get Started <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Everything you need to manage your Scrum process
          </h2>
          <ul className="space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle className="text-primary w-5 h-5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 