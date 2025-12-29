import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Toggle from "@/components/ui/Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

function ToggleWithState(args: any) {
  const [checked, setChecked] = useState(args.checked || false);
  return <Toggle {...args} checked={checked} onChange={setChecked} />;
}

export const Default: Story = {
  render: (args) => <ToggleWithState {...args} />,
  args: {
    label: "Enable feature",
  },
};

export const WithDescription: Story = {
  render: (args) => <ToggleWithState {...args} />,
  args: {
    label: "Notifications",
    description: "Receive push notifications for updates",
  },
};

export const Small: Story = {
  render: (args) => <ToggleWithState {...args} />,
  args: {
    label: "Small toggle",
    size: "sm",
  },
};

export const Large: Story = {
  render: (args) => <ToggleWithState {...args} />,
  args: {
    label: "Large toggle",
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled toggle",
    checked: false,
    disabled: true,
    onChange: () => {},
  },
};

export const CheckedDisabled: Story = {
  args: {
    label: "Always on",
    checked: true,
    disabled: true,
    onChange: () => {},
  },
};

