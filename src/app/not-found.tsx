import Link from "next/link";
import { Cloud } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-base-100 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex size-20 items-center justify-center rounded-2xl bg-base-200/80 mb-6">
          <Cloud className="size-10 text-base-content/30" strokeWidth={1.5} />
        </div>
        <h1 className="text-6xl sm:text-7xl font-bold text-primary mb-2">404</h1>
        <p className="text-lg text-base-content/70 mb-8">Page not found</p>
        <p className="text-sm text-base-content/50 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn btn-primary rounded-2xl gap-2"
          aria-label="Go to home"
        >
          <Cloud className="size-4" strokeWidth={2} />
          Back to Skymind
        </Link>
      </div>
    </div>
  );
}
