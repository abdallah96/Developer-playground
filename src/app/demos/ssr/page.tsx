import Image from "next/image";
import { Card, Badge } from "@/components/ui";

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  website: string;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export default async function SSRPage() {
  const users = await fetchUsers();
  const fetchTime = new Date().toISOString();

  return (
    <div className="min-h-screen py-12">
      <div className="section-container">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="info" dot>Live Data</Badge>
            <Badge variant="default">SSR</Badge>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Server-Side Rendering
          </h1>
          <p className="text-lg text-midnight-300 max-w-2xl mb-6">
            This page fetches fresh data from an external API on every request.
            The data is rendered on the server before being sent to the client.
          </p>

          <Card variant="outline" padding="sm">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-midnight-400">Fetched at:</span>
                <code className="font-mono text-midnight-200 bg-white/5 px-2 py-1 rounded">
                  {fetchTime}
                </code>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-midnight-400">Users loaded:</span>
                <code className="font-mono text-midnight-200 bg-white/5 px-2 py-1 rounded">
                  {users.length}
                </code>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold mb-4">
            How SSR Works
          </h2>
          <Card variant="gradient">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-midnight-500/30 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Request</h3>
                  <p className="text-sm text-midnight-400">
                    User requests the page from the server
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-midnight-500/30 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Fetch Data</h3>
                  <p className="text-sm text-midnight-400">
                    Server fetches fresh data from APIs
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-midnight-500/30 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Render & Send</h3>
                  <p className="text-sm text-midnight-400">
                    HTML is rendered and sent to client
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <h2 className="font-display text-2xl font-semibold mb-6">
          Live User Data
        </h2>
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

        <div className="mt-12">
          <Card variant="outline">
            <h3 className="font-semibold mb-3">Code Example</h3>
            <pre className="font-mono text-sm text-midnight-300 bg-black/30 p-4 rounded-lg overflow-x-auto">
{`async function fetchUsers() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    { cache: "no-store" } // Forces fresh data on every request
  );
  return response.json();
}

export default async function SSRPage() {
  const users = await fetchUsers();
  return <UserList users={users} />;
}`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}

