"use client";

import { useState, useCallback } from "react";
import { Button, Card, Modal, Input, Dropdown, Badge, Toggle } from "@/components/ui";

export default function ComponentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [toggleChecked, setToggleChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);
  const handleDropdownChange = useCallback((value: string) => setDropdownValue(value), []);
  const handleToggleChange = useCallback((checked: boolean) => setToggleChecked(checked), []);

  const simulateLoading = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const dropdownOptions = [
    { value: "react", label: "React", icon: "⚛️" },
    { value: "vue", label: "Vue.js", icon: "🟢" },
    { value: "angular", label: "Angular", icon: "🔴" },
    { value: "svelte", label: "Svelte", icon: "🧡" },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="section-container">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 animate-slide-up">
            Component Library
          </h1>
          <p className="text-lg text-midnight-300 max-w-2xl mx-auto animate-slide-up animate-delay-100">
            Explore our collection of reusable, customizable React components built with 
            TypeScript and Tailwind CSS.
          </p>
        </div>

        <section className="mb-16 animate-slide-up animate-delay-200">
          <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-midnight-500/20 flex items-center justify-center text-sm">
              1
            </span>
            Button Component
          </h2>
          <Card variant="gradient">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-midnight-300 mb-3">Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-midnight-300 mb-3">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-midnight-300 mb-3">States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button loading={loading} onClick={simulateLoading}>
                    {loading ? "Loading..." : "Click to Load"}
                  </Button>
                  <Button disabled>Disabled</Button>
                  <Button
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    }
                  >
                    With Icon
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-16 animate-slide-up animate-delay-300">
          <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-midnight-500/20 flex items-center justify-center text-sm">
              2
            </span>
            Card Component
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="default">
              <h3 className="font-semibold mb-2">Default Card</h3>
              <p className="text-sm text-midnight-400">Basic glass morphism style.</p>
            </Card>
            <Card variant="elevated">
              <h3 className="font-semibold mb-2">Elevated Card</h3>
              <p className="text-sm text-midnight-400">Enhanced shadow depth.</p>
            </Card>
            <Card variant="outline">
              <h3 className="font-semibold mb-2">Outline Card</h3>
              <p className="text-sm text-midnight-400">Bordered transparent style.</p>
            </Card>
            <Card variant="gradient" hoverable>
              <h3 className="font-semibold mb-2">Gradient Hoverable</h3>
              <p className="text-sm text-midnight-400">Hover to see effect.</p>
            </Card>
          </div>

          <div className="mt-6">
            <Card
              variant="elevated"
              header={<h3 className="font-semibold">Card with Header & Footer</h3>}
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button size="sm">Save</Button>
                </div>
              }
            >
              <p className="text-midnight-300">
                This card demonstrates the header and footer props for structured content layouts.
              </p>
            </Card>
          </div>
        </section>

        <section className="mb-16 animate-slide-up animate-delay-400">
          <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-midnight-500/20 flex items-center justify-center text-sm">
              3
            </span>
            Input Component
          </h2>
          <Card variant="gradient">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Default Input"
                placeholder="Enter some text..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <Input
                label="With Helper Text"
                placeholder="Your email"
                helperText="We'll never share your email."
                variant="filled"
              />
              <Input
                label="With Error"
                placeholder="Username"
                error="Username is already taken"
                variant="outline"
              />
              <Input
                label="With Icons"
                placeholder="Search..."
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
              <Input
                label="Different Sizes"
                placeholder="Small input"
                inputSize="sm"
              />
              <Input
                label="Disabled"
                placeholder="Cannot edit"
                disabled
              />
            </div>
          </Card>
        </section>

        <section className="mb-16 animate-slide-up animate-delay-500">
          <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-midnight-500/20 flex items-center justify-center text-sm">
              4
            </span>
            Dropdown Component
          </h2>
          <Card variant="gradient">
            <div className="grid md:grid-cols-2 gap-6">
              <Dropdown
                label="Select Framework"
                options={dropdownOptions}
                value={dropdownValue}
                onChange={handleDropdownChange}
                placeholder="Choose a framework"
              />
              <Dropdown
                label="Disabled Dropdown"
                options={dropdownOptions}
                disabled
                placeholder="Cannot select"
              />
            </div>
            {dropdownValue && (
              <p className="mt-4 text-sm text-midnight-300">
                Selected: <span className="text-midnight-100 font-medium">{dropdownValue}</span>
              </p>
            )}
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-midnight-500/20 flex items-center justify-center text-sm">
              5
            </span>
            Modal Component
          </h2>
          <Card variant="gradient">
            <div className="flex flex-wrap gap-3">
              <Button onClick={openModal}>Open Modal</Button>
            </div>
          </Card>

          <Modal
            isOpen={modalOpen}
            onClose={closeModal}
            title="Example Modal"
            description="This modal demonstrates the Modal component features."
            footer={
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={closeModal}>Cancel</Button>
                <Button onClick={closeModal}>Confirm</Button>
              </div>
            }
          >
            <p className="text-midnight-300">
              This is the modal content. You can put any React components here.
              Press Escape or click outside to close.
            </p>
          </Modal>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-midnight-500/20 flex items-center justify-center text-sm">
              6
            </span>
            Badge Component
          </h2>
          <Card variant="gradient">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-midnight-300 mb-3">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-midnight-300 mb-3">With Dot</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" dot>Active</Badge>
                  <Badge variant="warning" dot>Pending</Badge>
                  <Badge variant="error" dot>Offline</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-midnight-300 mb-3">Sizes</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-midnight-500/20 flex items-center justify-center text-sm">
              7
            </span>
            Toggle Component
          </h2>
          <Card variant="gradient">
            <div className="space-y-6">
              <Toggle
                checked={toggleChecked}
                onChange={handleToggleChange}
                label="Enable notifications"
                description="Receive push notifications for updates"
              />
              <Toggle
                checked={true}
                onChange={() => {}}
                label="Always on"
                size="lg"
              />
              <Toggle
                checked={false}
                onChange={() => {}}
                label="Disabled toggle"
                disabled
                size="sm"
              />
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

