import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';

/**
 * Button 组件展示了各种按钮样式和状态
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: '按钮类型',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '按钮尺寸',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    loading: {
      control: 'boolean',
      description: '是否加载中',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 主要按钮 - 用于主要操作
 */
export const Primary: Story = {
  args: {
    type: 'primary',
    children: '主要按钮',
  },
};

/**
 * 次要按钮 - 用于次要操作
 */
export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: '次要按钮',
  },
};

/**
 * 危险按钮 - 用于删除等危险操作
 */
export const Danger: Story = {
  args: {
    type: 'danger',
    children: '删除',
  },
};

/**
 * 小尺寸按钮
 */
export const Small: Story = {
  args: {
    type: 'primary',
    size: 'small',
    children: '小按钮',
  },
};

/**
 * 中等尺寸按钮
 */
export const Medium: Story = {
  args: {
    type: 'primary',
    size: 'medium',
    children: '中等按钮',
  },
};

/**
 * 大尺寸按钮
 */
export const Large: Story = {
  args: {
    type: 'primary',
    size: 'large',
    children: '大按钮',
  },
};

/**
 * 禁用状态
 */
export const Disabled: Story = {
  args: {
    type: 'primary',
    disabled: true,
    children: '禁用按钮',
  },
};

/**
 * 加载状态
 */
export const Loading: Story = {
  args: {
    type: 'primary',
    loading: true,
    children: '加载中',
  },
};
