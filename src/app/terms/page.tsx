import Link from "next/link";
import { Cloud, ArrowLeft, FileText, CloudRain, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Terms | Skymind",
  description: "Terms of use for Skymind weather app.",
};

export default function TermsPage() {
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
            <FileText className="size-7 text-primary" strokeWidth={2} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Terms of Use</h1>
          <p className="text-base-content/60 text-sm">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <section className="space-y-6">
          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <p className="text-base-content/85 text-sm sm:text-base leading-relaxed">
              By using Skymind, you agree to these terms. If you do not agree, please do not use the app.
            </p>
          </div>

          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <CloudRain className="size-5 text-info" strokeWidth={2} />
              <h2 className="text-lg font-semibold">Weather data</h2>
            </div>
            <p className="text-base-content/85 text-sm sm:text-base leading-relaxed">
              Skymind displays forecasts from Open-Meteo. We do not guarantee accuracy, completeness, or timeliness.
              Do not rely on Skymind for critical decisions (travel, agriculture, emergencies). Use official sources for high-stakes decisions.
            </p>
          </div>

          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Use of the service</h2>
            <p className="text-base-content/85 text-sm sm:text-base leading-relaxed">
              You may use Skymind for personal, non-commercial purposes. Do not abuse the service—excessive API
              calls, scraping, or reverse engineering that harms data providers is prohibited.
            </p>
          </div>

          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="size-5 text-warning" strokeWidth={2} />
              <h2 className="text-lg font-semibold">Disclaimer</h2>
            </div>
            <p className="text-base-content/85 text-sm sm:text-base leading-relaxed">
              Skymind is provided &quot;as is&quot; without warranties of any kind. We are not liable for damages
              arising from your use of the app or reliance on the data it displays.
            </p>
          </div>

          <div className="rounded-2xl bg-base-200/50 border border-base-300/30 p-5 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Changes</h2>
            <p className="text-base-content/85 text-sm sm:text-base leading-relaxed">
              We may update these terms from time to time. Continued use after changes constitutes acceptance.
            </p>
          </div>
        </section>

        <nav className="mt-12 pt-8 border-t border-base-300/30 flex flex-wrap gap-6 justify-center">
          <Link href="/about" className="link link-hover text-base-content/70 hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/privacy" className="link link-hover text-base-content/70 hover:text-primary transition-colors">
            Privacy
          </Link>
        </nav>
      </main>
    </div>
  );
}
