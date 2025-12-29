"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, Badge, Button } from "@/components/ui";

function AuthRequiredContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const redirect = searchParams.get("redirect") || "/demos/protected";

  return (
    <div className="min-h-screen py-12">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="error" size="lg" dot>
              Authentication Required
            </Badge>
          </div>

          <h1 className="font-display text-4xl font-bold mb-4">
            🔒 Access Denied
          </h1>
          <p className="text-lg text-midnight-300 mb-8">
            {error === "invalid-token"
              ? "The token you provided is invalid. Please use the correct token."
              : "You need to authenticate to access this page."}
          </p>

          <Card variant="gradient" className="mb-8">
            <div className="space-y-4 text-left">
              <h2 className="font-display text-xl font-semibold">
                Middleware Demo
              </h2>
              <p className="text-midnight-300">
                This demonstrates Next.js middleware protecting routes. The
                middleware checks for a valid token before allowing access.
              </p>

              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-sm text-midnight-400 mb-2">
                  Try accessing with the demo token:
                </p>
                <code className="text-midnight-200 text-sm">
                  {redirect}?token=demo-secret-token
                </code>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`${redirect}?token=demo-secret-token`}>
              <Button variant="primary">
                Access with Demo Token
              </Button>
            </Link>
            <Link href="/demos/api">
              <Button variant="outline">
                Back to API Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthRequiredFallback() {
  return (
    <div className="min-h-screen py-12">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="error" size="lg" dot>
              Authentication Required
            </Badge>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            🔒 Access Denied
          </h1>
          <p className="text-lg text-midnight-300 mb-8">
            Loading authentication details...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthRequiredPage() {
  return (
    <Suspense fallback={<AuthRequiredFallback />}>
      <AuthRequiredContent />
    </Suspense>
  );
}
