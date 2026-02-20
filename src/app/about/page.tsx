import Link from "next/link";
import { Cloud, ArrowLeft, Zap, Database, Code2 } from "lucide-react";

export const metadata = {
  title: "About | Skymind",
  description: "Learn about Skymind — a smart weather app built with Next.js and Open-Meteo.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-base-100">
      <header className="sticky top-0 z-20 py-2 px-3 sm:px-4 bg-base-100/80 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto bg-base-200/60 backdrop-blur-md border border-base-300/30 rounded-2xl shadow-sm min-h-12 px-3 sm:px-4">
          <Link
            href="/"
            className="btn btn-ghost btn-sm gap-2 rounded-2xl"
            aria-label="Back to home"
          >
            <ArrowLeft className="size-4" strokeWidth={2} />
            Back
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Cloud className="size-6 text-primary shrink-0" strokeWidth={2} />
            <span className="font-bold text-lg tracking-tight">Skymind</span>
          </Link>
          <div className="w-16 sm:w-20" aria-hidden />
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">About Skymind</h1>
          <p className="text-base-content/60 text-lg max-w-lg mx-auto">
            A modern weather app focused on simplicity, performance, and privacy.
          </p>
        </div>

        <section className="space-y-6">
          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <Zap className="size-5 text-primary" strokeWidth={2} />
              </div>
              <h2 className="text-lg font-semibold">Features</h2>
            </div>
            <ul className="space-y-2.5 text-base-content/85 text-sm sm:text-base">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Search any city worldwide with keyboard navigation
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Use my location (geolocation + reverse geocoding)
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Current weather plus 24-hour and 7-day forecasts
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                UV index, sunrise & sunset, air quality when available
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                °C / °F toggle, light/dark theme, favorites & share links
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Offline caching · PWA-ready for home screen
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-info/10">
                <Database className="size-5 text-info" strokeWidth={2} />
              </div>
              <h2 className="text-lg font-semibold">Data Sources</h2>
            </div>
            <p className="text-base-content/80 text-sm sm:text-base mb-4">
              Skymind uses free, open APIs. No account or API keys required.
            </p>
            <div className="space-y-3">
              <a
                href="https://open-meteo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl p-3 bg-base-100/50 border border-base-300/20 hover:border-primary/30 transition-colors"
              >
                <span className="font-medium text-primary">Open-Meteo</span>
                <span className="text-base-content/70 text-sm block mt-0.5">Weather and air quality forecasts</span>
              </a>
              <a
                href="https://nominatim.openstreetmap.org"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl p-3 bg-base-100/50 border border-base-300/20 hover:border-primary/30 transition-colors"
              >
                <span className="font-medium text-primary">Nominatim (OpenStreetMap)</span>
                <span className="text-base-content/70 text-sm block mt-0.5">City search and reverse geocoding</span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-secondary/10">
                <Code2 className="size-5 text-secondary" strokeWidth={2} />
              </div>
              <h2 className="text-lg font-semibold">Tech Stack</h2>
            </div>
            <p className="text-base-content/80 text-sm sm:text-base">
              Next.js · React · TypeScript · Tailwind CSS · DaisyUI · Lucide icons · Motion
            </p>
          </div>
        </section>

        <nav className="mt-12 pt-8 border-t border-base-300/30 flex flex-wrap gap-6 justify-center">
          <Link href="/privacy" className="link link-hover text-base-content/70 hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="link link-hover text-base-content/70 hover:text-primary transition-colors">
            Terms
          </Link>
        </nav>
      </main>
    </div>
  );
}
