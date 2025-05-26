import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  type TooltipProps,
} from 'recharts';
import dayjs from 'dayjs';
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

interface MarketChartProps {
  timestampList: number[];
  priceList: number[];
}

interface ChartItem {
  date: string;
  price: number;
}

const PriceTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload?.length) {
    const price = Number(payload[0].value).toFixed(2);
    return (
      <div className="bg-[var(--brand-blue)] border shadow-sm rounded px-3 py-1 text-xs">
        <div className="text-white font-bold">${price}</div>
      </div>
    );
  }
  return null;
};

const convertToChartData = (
  timestampList: number[],
  priceList: number[],
): ChartItem[] => {
  return timestampList.map((timestamp, index) => ({
    date: dayjs.unix(timestamp).format('MMM DD'),
    price: priceList[index],
  }));
};

export function MarketChart({
  timestampList,
  priceList,
}: Readonly<MarketChartProps>) {
  const chartItems = convertToChartData(timestampList, priceList);

  const prices = chartItems.map((d) => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const padding = (max - min) * 0.01 || 1;
  return (
    <div className="w-full bg-white">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={chartItems}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--brand-blue)"
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor="var(--brand-blue)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            width={0}
            domain={[min - padding, max + padding]}
            tick={false}
            axisLine={false}
          />
          <Tooltip content={<PriceTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="var(--brand-blue)"
            fill="url(#incomeGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 10, fill: 'var(--brand-orange)', strokeWidth: 2 }}
            animationDuration={500}
          />
          <ReferenceDot
            x={chartItems[chartItems.length - 1].date}
            y={chartItems[chartItems.length - 1].price}
            r={4}
            fill="var(--brand-blue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
