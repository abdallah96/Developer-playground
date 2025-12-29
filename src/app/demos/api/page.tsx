"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, Badge, Button, Input, Dropdown } from "@/components/ui";

interface ApiResponse {
  endpoint: string;
  method: string;
  response: object | null;
  loading: boolean;
  error: string | null;
  responseTime: number | null;
}

export default function APIPage() {
  const [apiResponses, setApiResponses] = useState<Record<string, ApiResponse>>({});
  const [customParams, setCustomParams] = useState<Record<string, string>>({});

  const endpoints = useMemo(() => [
    {
      id: "users",
      name: "Get Users",
      endpoint: "/api/users",
      method: "GET",
      description: "Fetch all users from the API",
      params: [
        { key: "role", label: "Filter by role", options: ["Developer", "Designer", "Product Manager", "DevOps Engineer"] },
        { key: "limit", label: "Limit results", type: "number" },
      ],
    },
    {
      id: "posts",
      name: "Get Posts",
      endpoint: "/api/posts",
      method: "GET",
      description: "Fetch all blog posts",
      params: [
        { key: "category", label: "Filter by category", options: ["Tutorial", "Deep Dive", "Design", "Best Practices", "Performance", "Backend"] },
        { key: "limit", label: "Limit results", type: "number" },
      ],
    },
  ], []);

  const handleApiCall = useCallback(async (id: string, endpoint: string, method: string) => {
    setApiResponses((prev) => ({
      ...prev,
      [id]: {
        endpoint,
        method,
        response: null,
        loading: true,
        error: null,
        responseTime: null,
      },
    }));

    const params = new URLSearchParams();
    Object.entries(customParams).forEach(([key, value]) => {
      if (key.startsWith(`${id}-`) && value) {
        params.append(key.replace(`${id}-`, ""), value);
      }
    });

    const urlWithParams = params.toString() ? `${endpoint}?${params}` : endpoint;
    const startTime = performance.now();

    try {
      const response = await fetch(urlWithParams, { method });
      const endTime = performance.now();
      const data = await response.json();

      setApiResponses((prev) => ({
        ...prev,
        [id]: {
          endpoint: urlWithParams,
          method,
          response: data,
          loading: false,
          error: null,
          responseTime: Math.round(endTime - startTime),
        },
      }));
    } catch (err) {
      const endTime = performance.now();
      setApiResponses((prev) => ({
        ...prev,
        [id]: {
          endpoint: urlWithParams,
          method,
          response: null,
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
          responseTime: Math.round(endTime - startTime),
        },
      }));
    }
  }, [customParams]);

  const handleParamChange = useCallback((endpointId: string, paramKey: string, value: string) => {
    setCustomParams((prev) => ({
      ...prev,
      [`${endpointId}-${paramKey}`]: value,
    }));
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="section-container">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="success" dot>Active</Badge>
            <Badge variant="default">API Routes</Badge>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            API Routes Demo
          </h1>
          <p className="text-lg text-midnight-300 max-w-2xl mb-6">
            Test the serverless API endpoints. These routes run as edge functions
            and return JSON data. Try different parameters to filter results.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold mb-4">
            How API Routes Work
          </h2>
          <Card variant="gradient">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-jade-500/30 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Define Routes</h3>
                  <p className="text-sm text-midnight-400">
                    Create route.ts files in app/api directory
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-jade-500/30 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Handle Methods</h3>
                  <p className="text-sm text-midnight-400">
                    Export GET, POST, PUT, DELETE functions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-jade-500/30 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Return Response</h3>
                  <p className="text-sm text-midnight-400">
                    Use NextResponse to return JSON data
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          {endpoints.map((ep, index) => (
            <Card key={ep.id} variant="elevated" className="overflow-visible relative" style={{ zIndex: 10 - index }}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1 relative z-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={ep.method === "GET" ? "success" : "info"}>
                      {ep.method}
                    </Badge>
                    <code className="font-mono text-sm text-midnight-200">
                      {ep.endpoint}
                    </code>
                  </div>
                  <p className="text-midnight-400 text-sm mb-4">
                    {ep.description}
                  </p>

                  {ep.params && (
                    <div className="grid sm:grid-cols-2 gap-4 mb-6 relative z-20">
                      {ep.params.map((param) => (
                        <div key={param.key} className="relative">
                          {param.options ? (
                            <Dropdown
                              label={param.label}
                              options={param.options.map((opt) => ({
                                value: opt,
                                label: opt,
                              }))}
                              value={customParams[`${ep.id}-${param.key}`] || ""}
                              onChange={(value) =>
                                handleParamChange(ep.id, param.key, value)
                              }
                              placeholder="Select..."
                            />
                          ) : (
                            <Input
                              label={param.label}
                              type={param.type || "text"}
                              placeholder={`Enter ${param.key}`}
                              value={customParams[`${ep.id}-${param.key}`] || ""}
                              onChange={(e) =>
                                handleParamChange(ep.id, param.key, e.target.value)
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="relative z-0">
                    <Button
                      onClick={() => handleApiCall(ep.id, ep.endpoint, ep.method)}
                      loading={apiResponses[ep.id]?.loading}
                    >
                      Send Request
                    </Button>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  {apiResponses[ep.id] && (
                    <div className="bg-black/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-midnight-400">Response</span>
                        {apiResponses[ep.id].responseTime && (
                          <Badge variant="default" size="sm">
                            {apiResponses[ep.id].responseTime}ms
                          </Badge>
                        )}
                      </div>
                      <pre className="font-mono text-xs text-midnight-200 overflow-auto max-h-64">
                        {apiResponses[ep.id].error
                          ? `Error: ${apiResponses[ep.id].error}`
                          : JSON.stringify(apiResponses[ep.id].response, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card variant="outline">
            <h3 className="font-semibold mb-3">Code Example</h3>
            <pre className="font-mono text-sm text-midnight-300 bg-black/30 p-4 rounded-lg overflow-x-auto">
{`// app/api/users/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  
  let users = await fetchUsers();
  
  if (role) {
    users = users.filter(u => u.role === role);
  }
  
  return NextResponse.json({
    success: true,
    data: users,
    meta: { total: users.length }
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newUser = await createUser(body);
  
  return NextResponse.json({
    success: true,
    data: newUser
  });
}`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}

