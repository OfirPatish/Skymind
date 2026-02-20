import Link from "next/link";
import { Cloud, ArrowLeft, Shield, Smartphone, MapPin, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy | Skymind",
  description: "Privacy policy for Skymind weather app.",
};

export default function PrivacyPage() {
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
          <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <Shield className="size-7 text-primary" strokeWidth={2} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-base-content/60 text-sm">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <section className="space-y-6">
          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <p className="text-base-content/85 text-sm sm:text-base leading-relaxed">
              Skymind is designed with privacy in mind. We do not collect personal information.
              This page explains what data is used and where it is stored.
            </p>
          </div>

          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary">Data we collect</span>
            </h2>
            <p className="text-base-content/85 text-sm sm:text-base mb-4">
              Skymind does not collect personal information. No analytics, tracking, or advertising.
            </p>
          </div>

          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="size-5 text-info" strokeWidth={2} />
              <h2 className="text-lg font-semibold">Data stored on your device</h2>
            </div>
            <p className="text-base-content/85 text-sm sm:text-base mb-4">
              Some data is stored locally (localStorage) for convenience:
            </p>
            <ul className="space-y-2 text-base-content/80 text-sm sm:text-base list-disc list-inside">
              <li>Theme preference (light/dark)</li>
              <li>Temperature unit (°C or °F)</li>
              <li>Favorite locations (names and coordinates)</li>
              <li>Cached weather (last viewed when offline)</li>
            </ul>
            <p className="text-base-content/80 text-sm sm:text-base mt-4">
              This data never leaves your device.
            </p>
          </div>

          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="size-5 text-warning" strokeWidth={2} />
              <h2 className="text-lg font-semibold">Geolocation</h2>
            </div>
            <p className="text-base-content/85 text-sm sm:text-base leading-relaxed">
              When you use &quot;Use my location,&quot; your coordinates are sent to Nominatim and Open-Meteo
              for place names and weather. We do not store or log your location. Requests go directly
              to those services per their policies.
            </p>
          </div>

          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="size-5 text-secondary" strokeWidth={2} />
              <h2 className="text-lg font-semibold">Third-party services</h2>
            </div>
            <p className="text-base-content/85 text-sm sm:text-base mb-4 leading-relaxed">
              Skymind uses{" "}
              <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="link link-primary">
                Open-Meteo
              </a>{" "}
              and{" "}
              <a href="https://nominatim.openstreetmap.org" target="_blank" rel="noopener noreferrer" className="link link-primary">
                Nominatim
              </a>
              . Their servers receive search queries or coordinates when you use the app. See their privacy policies for details.
            </p>
          </div>
        </section>

        <nav className="mt-12 pt-8 border-t border-base-300/30 flex flex-wrap gap-6 justify-center">
          <Link href="/about" className="link link-hover text-base-content/70 hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/terms" className="link link-hover text-base-content/70 hover:text-primary transition-colors">
            Terms
          </Link>
        </nav>
      </main>
    </div>
  );
}
