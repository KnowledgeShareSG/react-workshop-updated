import type { Meta, StoryObj } from '@storybook/react';
import { MarketChart } from '@/components/chart/chart.tsx';

const meta: Meta<typeof MarketChart> = {
  title: 'Component/Chart',
  component: MarketChart,
  tags: ['Chart'],
  args: {
    timestampList: [
      1746711000, 1746797400, 1747056600, 1747143000, 1747229400, 1747315800,
      1747402200, 1747661400, 1747747800, 1747834200, 1747920600, 1748007000,
    ],
    priceList: [
      197.49000549316406, 198.52999877929688, 210.7899932861328,
      212.92999267578125, 212.3300018310547, 211.4499969482422,
      211.25999450683594, 208.77999877929688, 206.86000061035156,
      202.089996337, 201.36000061035156, 195.27000427246094,
    ],
  },
};
export default meta;
type Story = StoryObj<typeof MarketChart>;

export const Primary: Story = {};
