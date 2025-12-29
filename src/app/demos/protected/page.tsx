import { Card, Badge } from "@/components/ui";

export default function ProtectedPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="success" size="lg" dot>
              Authenticated
            </Badge>
          </div>

          <h1 className="font-display text-4xl font-bold mb-4">
            🎉 Welcome to the Protected Area
          </h1>
          <p className="text-lg text-midnight-300 mb-8">
            You have successfully authenticated! This page is only accessible
            with a valid token.
          </p>

          <Card variant="gradient">
            <div className="space-y-4 text-left">
              <h2 className="font-display text-xl font-semibold">
                How You Got Here
              </h2>
              <p className="text-midnight-300">
                The middleware checked for either:
              </p>
              <ul className="list-disc list-inside text-midnight-400 space-y-2">
                <li>
                  A <code className="bg-white/10 px-2 py-0.5 rounded">token</code> query parameter
                </li>
                <li>
                  An <code className="bg-white/10 px-2 py-0.5 rounded">auth-token</code> cookie
                </li>
              </ul>
              <p className="text-midnight-300">
                Since you provided a valid token, you were allowed through!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

