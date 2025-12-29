"use client";

import { useState, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { Card, Badge, Button } from "@/components/ui";

const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => (
    <div className="w-full h-64 glass rounded-2xl animate-pulse flex items-center justify-center">
      <span className="text-midnight-400">Loading chart...</span>
    </div>
  ),
  ssr: false,
});

const HeavyModal = dynamic(() => import("@/components/ui/Modal"), {
  loading: () => null,
});

export default function LazyLoadingPage() {
  const [showChart, setShowChart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleChart = useCallback(() => setShowChart((prev) => !prev), []);
  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  return (
    <div className="min-h-screen py-12">
      <div className="section-container">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="success" dot>Performance</Badge>
            <Badge variant="default">Lazy Loading</Badge>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Lazy Loading Demo
          </h1>
          <p className="text-lg text-midnight-300 max-w-2xl mb-6">
            Heavy components are loaded on-demand using Next.js dynamic imports,
            reducing the initial bundle size and improving page load performance.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold mb-4">
            How Dynamic Imports Work
          </h2>
          <Card variant="gradient">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-jade-500/30 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Code Splitting</h3>
                  <p className="text-sm text-midnight-400">
                    Heavy components are split into separate chunks
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-jade-500/30 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold mb-1">On-Demand Loading</h3>
                  <p className="text-sm text-midnight-400">
                    Components load only when needed
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-jade-500/30 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Loading States</h3>
                  <p className="text-sm text-midnight-400">
                    Show fallback UI while loading
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card variant="elevated">
            <h3 className="font-display text-xl font-semibold mb-4">
              Lazy Loaded Chart Component
            </h3>
            <p className="text-midnight-400 mb-6">
              This chart component is loaded dynamically. Click the button to load it.
              Open your browser's Network tab to see the chunk being loaded.
            </p>
            
            <Button onClick={toggleChart} className="mb-6">
              {showChart ? "Hide Chart" : "Load Chart"}
            </Button>

            {showChart && (
              <Suspense
                fallback={
                  <div className="w-full h-64 glass rounded-2xl animate-pulse flex items-center justify-center">
                    <span className="text-midnight-400">Loading chart...</span>
                  </div>
                }
              >
                <HeavyChart />
              </Suspense>
            )}
          </Card>

          <Card variant="elevated">
            <h3 className="font-display text-xl font-semibold mb-4">
              Lazy Loaded Modal
            </h3>
            <p className="text-midnight-400 mb-6">
              The Modal component is also lazy loaded. It won't be included in the
              initial bundle and will only load when you open it.
            </p>
            
            <Button onClick={openModal}>Open Lazy Modal</Button>

            <HeavyModal
              isOpen={showModal}
              onClose={closeModal}
              title="Dynamically Loaded Modal"
            >
              <p className="text-midnight-300">
                This modal was loaded on-demand when you clicked the button.
                The component code wasn't included in the initial page load.
              </p>
            </HeavyModal>
          </Card>
        </div>

        <div className="mt-12">
          <Card variant="outline">
            <h3 className="font-semibold mb-3">Code Example</h3>
            <pre className="font-mono text-sm text-midnight-300 bg-black/30 p-4 rounded-lg overflow-x-auto">
{`import dynamic from "next/dynamic";

// Lazy load a heavy component
const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Disable server-side rendering if needed
});

// Use React.lazy with Suspense (alternative)
const LazyComponent = React.lazy(() => import("./Component"));

function Page() {
  const [show, setShow] = useState(false);
  
  return (
    <>
      <button onClick={() => setShow(true)}>Load</button>
      {show && (
        <Suspense fallback={<Loading />}>
          <HeavyChart />
        </Suspense>
      )}
    </>
  );
}`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}

