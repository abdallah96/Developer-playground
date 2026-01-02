"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, Badge, Button } from "@/components/ui";

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  website: string;
}

export default function CSRPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTime, setFetchTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        
        const data = await response.json();
        
        setUsers(data);
        setFetchTime(new Date().toISOString());
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRefetch = () => {
    setFetchTime(null);
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        
        const data = await response.json();
        setUsers(data);
        setFetchTime(new Date().toISOString());
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchUsers();
  };

  return (
    <div className="min-h-screen py-12">
      <div className="section-container">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="info" dot>Client-Side</Badge>
            <Badge variant="default">CSR</Badge>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Client-Side Rendering
          </h1>
          <p className="text-lg text-midnight-300 max-w-2xl mb-6">
            This page fetches data in the browser using React hooks. The data is 
            loaded after the page renders, and you can refetch on demand.
          </p>

          <Card variant="outline" padding="sm">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-midnight-400">Status:</span>
                {loading ? (
                  <Badge variant="warning" size="sm">Loading...</Badge>
                ) : error ? (
                  <Badge variant="error" size="sm">Error</Badge>
                ) : (
                  <Badge variant="success" size="sm">Loaded</Badge>
                )}
              </div>
              {fetchTime && (
                <div className="flex items-center gap-2">
                  <span className="text-midnight-400">Fetched at:</span>
                  <code className="font-mono text-midnight-200 bg-white/5 px-2 py-1 rounded">
                    {fetchTime}
                  </code>
                </div>
              )}
              {users.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-midnight-400">Users loaded:</span>
                  <code className="font-mono text-midnight-200 bg-white/5 px-2 py-1 rounded">
                    {users.length}
                  </code>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold mb-4">
            How CSR Works
          </h2>
          <Card variant="gradient">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-ember-500/30 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Initial Render</h3>
                  <p className="text-sm text-midnight-400">
                    Page loads with empty/loading state
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-ember-500/30 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Fetch Data</h3>
                  <p className="text-sm text-midnight-400">
                    JavaScript runs in browser to fetch data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-ember-500/30 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Update UI</h3>
                  <p className="text-sm text-midnight-400">
                    React updates the page with fetched data
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {error && (
          <Card variant="outline" className="mb-6 border-red-500/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-red-400 mb-1">Error</h3>
                <p className="text-sm text-midnight-400">{error}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleRefetch}>
                Retry
              </Button>
            </div>
          </Card>
        )}

        {loading && !error && (
          <div className="mb-8">
            <Card variant="elevated">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-midnight-400 mb-4"></div>
                  <p className="text-midnight-400">Loading users...</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold">
                User Data (Fetched Client-Side)
              </h2>
              <Button variant="outline" onClick={handleRefetch}>
                Refetch Data
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user, index) => (
                <Card
                  key={user.id}
                  variant="elevated"
                  hoverable
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={`https://picsum.photos/seed/${user.id}/100`}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold truncate">{user.name}</h3>
                      <p className="text-sm text-midnight-400 truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-midnight-500 mt-1">
                        {user.company.name}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        <div className="mt-12">
          <Card variant="outline">
            <h3 className="font-semibold mb-3">Code Example</h3>
            <pre className="font-mono text-sm text-midnight-300 bg-black/30 p-4 rounded-lg overflow-x-auto">
{`"use client";

import { useState, useEffect } from "react";

export default function CSRPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs in the browser after page loads
    fetch("https://api.example.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []); // Empty deps = runs once on mount

  if (loading) return <div>Loading...</div>;
  
  return <UserList users={users} />;
}`}
            </pre>
          </Card>
        </div>

        <div className="mt-8">
          <Card variant="gradient">
            <h3 className="font-semibold mb-4">CSR vs SSR vs SSG</h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="info" size="sm">CSR</Badge>
                  <span className="font-medium">Client-Side Rendering</span>
                </div>
                <p className="text-midnight-400 pl-20">
                  Data fetched in browser • Shows loading state • Good for user interactions, filters, real-time updates
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default" size="sm">SSR</Badge>
                  <span className="font-medium">Server-Side Rendering</span>
                </div>
                <p className="text-midnight-400 pl-20">
                  Data fetched on server • HTML sent with data • Good for SEO, initial page load
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="success" size="sm">SSG</Badge>
                  <span className="font-medium">Static Site Generation</span>
                </div>
                <p className="text-midnight-400 pl-20">
                  Pre-rendered at build • Fastest load • Good for blogs, docs, static content
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

