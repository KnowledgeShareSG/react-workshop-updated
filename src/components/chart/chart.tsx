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
import { useInstrumentDetails } from '@/views/instrument-details/useInstrumentDetails';
import { useMemo } from 'react';
import { Spinner } from '../shared/Spinner';

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

interface MarketChartSmallProps { symbol: string, color: 'green' | 'red' }
export function MarketChartSmall({ symbol, color }: Readonly<MarketChartSmallProps>) {
  const { data, isLoading, isError, error } = useInstrumentDetails(symbol);

  const chartItems = useMemo(() => {
    if (isLoading) return [];
    return convertToChartData(
      data?.timestamp ?? [],
      data?.indicators?.quote?.[0]?.close ?? [],
    );
  }, [isLoading, data]);

  const prices = chartItems.map((d) => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const padding = (max - min) * 0.01 || 1;

  if (isLoading) {return <Spinner />}


  if (isError) {return <span>{error.message}</span>}

  return (
    <div className="w-full h-10">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartItems}
          margin={{ top: 4, right: 0, bottom: 4, left: 0 }}
        >
          <defs>
            <linearGradient id={`priceGradient${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`var(--brand-${color})`} stopOpacity={0.8} />
              <stop offset="100%" stopColor={`var(--brand-${color})`} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="price"
            stroke={`var(--brand-${color})`}
            fill={`url(#priceGradient${color})`}
            strokeWidth={1.2}
            dot={false}
            isAnimationActive={false}
          />
          <YAxis hide domain={[min - padding, max + padding]} />
          <XAxis hide />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

