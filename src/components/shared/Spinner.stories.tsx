import { Spinner } from '@/components/shared/Spinner.tsx';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Spinner> = {
  title: 'Spinner',
  component: Spinner,
  tags: ['Spinner'],
};

export default meta;
type Store = StoryObj<typeof Spinner>;

export const Primary: Store = {};
