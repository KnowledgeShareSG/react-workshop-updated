import type { Meta, StoryObj } from '@storybook/react';
import { MarketChart } from '@/components/ui/chart.tsx';

const meta: Meta<typeof MarketChart> = {
  title: 'Component/Chart',
  component: MarketChart,
  tags: ['Chart'],
  args: {
    timestampList: [
      1717214400, 1719806400, 1722484800, 1725163200, 1727755200, 1730433600,
      1733029200, 1735707600, 1738386000, 1740805200, 1743480000, 1746072000,
      1748030401,
    ],
    priceList: [
      210.6199951171875, 222.0800018310547, 229, 233, 225.91000366210938,
      237.3300018310547, 250.4199981689453, 236, 241.83999633,
      222.1300048828125, 212.5, 195.27000427246094, 195.27000427246094,
    ],
  },
};
export default meta;
type Story = StoryObj<typeof MarketChart>;

export const Primary: Story = {};
