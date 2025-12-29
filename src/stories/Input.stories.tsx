import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/ui/Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "filled", "outline"],
    },
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    variant: "default",
  },
};

export const Filled: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    variant: "filled",
  },
};

export const Outline: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    variant: "outline",
    type: "password",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Email",
    placeholder: "your@email.com",
    helperText: "We'll never share your email with anyone.",
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    error: "This username is already taken",
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    leftIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
};

export const Small: Story = {
  args: {
    label: "Small Input",
    placeholder: "Small size",
    inputSize: "sm",
  },
};

export const Large: Story = {
  args: {
    label: "Large Input",
    placeholder: "Large size",
    inputSize: "lg",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit",
    disabled: true,
  },
};

