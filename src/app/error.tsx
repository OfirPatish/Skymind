"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Cloud, RefreshCw } from "lucide-react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-base-100 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex size-20 items-center justify-center rounded-2xl bg-error/10 mb-6">
          <RefreshCw className="size-10 text-error/70" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-base-content/70 mb-8 text-sm">{error.message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="btn btn-primary rounded-2xl gap-2"
            aria-label="Try again"
          >
            <RefreshCw className="size-4" strokeWidth={2} />
            Try again
          </button>
          <Link
            href="/"
            className="btn btn-ghost rounded-2xl gap-2"
            aria-label="Go to home"
          >
            <Cloud className="size-4" strokeWidth={2} />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
