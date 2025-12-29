import type { Meta, StoryObj } from "@storybook/react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "outline", "gradient"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    hoverable: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: "default",
    children: (
      <div>
        <h3 className="font-semibold mb-2">Default Card</h3>
        <p className="text-sm text-midnight-400">This is a default card with glass morphism styling.</p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <div>
        <h3 className="font-semibold mb-2">Elevated Card</h3>
        <p className="text-sm text-midnight-400">Card with enhanced shadow depth.</p>
      </div>
    ),
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: (
      <div>
        <h3 className="font-semibold mb-2">Outline Card</h3>
        <p className="text-sm text-midnight-400">Bordered transparent card style.</p>
      </div>
    ),
  },
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    children: (
      <div>
        <h3 className="font-semibold mb-2">Gradient Card</h3>
        <p className="text-sm text-midnight-400">Beautiful gradient background.</p>
      </div>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    variant: "gradient",
    hoverable: true,
    children: (
      <div>
        <h3 className="font-semibold mb-2">Hoverable Card</h3>
        <p className="text-sm text-midnight-400">Hover over me to see the effect!</p>
      </div>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    variant: "elevated",
    header: <h3 className="font-semibold">Card Header</h3>,
    footer: (
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </div>
    ),
    children: (
      <p className="text-midnight-300">
        This card has a header and footer section for structured layouts.
      </p>
    ),
  },
};

