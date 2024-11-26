import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useTranslation } from "react-i18next";

export function LandingPage() {
  const { t } = useTranslation("landing");

  const features = [
    t("features.organization"),
    t("features.collaboration"),
    t("features.planning"),
    t("features.boards"),
    t("features.analytics"),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900">
            {t("title")}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            {t("description")}
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link to="/tasks">
              {t("getStarted")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-3xl font-bold">
            {t("featuresTitle")}
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
