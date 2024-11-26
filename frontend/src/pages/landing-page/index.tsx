import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function LandingPage() {
  const features = [
    "Smart task organization for Scrum teams",
    "Real-time collaboration tools",
    "Sprint planning made easy",
    "Customizable Scrum boards",
    "Advanced analytics and reporting",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900">
            Zadachnik
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            The intelligent task tracker designed specifically for Scrum teams
            to streamline their agile workflow and boost productivity.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link to="/tasks">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-3xl font-bold">
            Everything you need to manage your Scrum process
          </h2>
          <ul className="space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
