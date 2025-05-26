import { Spinner } from '@/components/shared/Spinner.tsx';
import {
  type ChartResult,
  useInstrumentDetails,
} from '@/views/instrument-details/useInstrumentDetails.ts';
import { Suspense } from 'react';
import { MarketChart } from '@/components/chart/chart.tsx';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary.tsx';
import { InfoItem } from '@/components/shared/InfoItem.tsx';
import { useParams } from '@tanstack/react-router';

interface DetailsViewProps {
  symbol: string;
}
export const DetailsView = ({ symbol }: DetailsViewProps) => {
  const { data } = useInstrumentDetails(symbol);
  const chartResult = data as ChartResult;
  const { meta } = chartResult;

  if (!chartResult) return null;

  return (
    <div className="pt-3 sm:pt-32">
      <div>
        <h2 className="text-3xl font-semibold text-left">{`${meta.longName} (${meta.symbol})`}</h2>
        <h6 className="text-base font-medium text-left">{`${meta.regularMarketPrice} ${meta.currency}`}</h6>
      </div>
      <div className="grid grid-cols-1 gap-y-14 pt-6 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-0">
        <MarketChart
          timestampList={chartResult.timestamp ?? []}
          priceList={chartResult.indicators.quote[0].close ?? []}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
          <InfoItem
            label="MarketPrice"
            value={`${meta.regularMarketPrice} ${meta.currency}`}
            bold
          />
          <InfoItem
            label="MarketVolume"
            value={meta.regularMarketVolume}
            bold
          />
          <InfoItem
            label="Market Day High"
            value={`${meta.regularMarketDayHigh} ${meta.currency}`}
            bold
          />
          <InfoItem
            label="Market Day Low"
            value={`${meta.regularMarketDayLow} ${meta.currency}`}
            bold
          />
          <InfoItem
            label="52 Weeks High"
            value={`${meta.fiftyTwoWeekHigh} ${meta.currency}`}
            bold
          />
          <InfoItem
            label="52 Weeks Low"
            value={`${meta.fiftyTwoWeekLow} ${meta.currency}`}
            bold
          />
          <InfoItem
            label="Previous Close"
            value={`${meta.chartPreviousClose} ${meta.currency}`}
            bold
          />
          <InfoItem label="Exchange Name" value={meta.fullExchangeName} bold />
          <InfoItem label="Instrument Type" value={meta.instrumentType} bold />
          <InfoItem
            label="Exchange Timezone"
            value={meta.exchangeTimezoneName}
            bold
          />
        </div>
      </div>
    </div>
  );
};

export const DetailsWithErrorBoundary = () => {
  const { symbol } = useParams({ from: '/details/$symbol' });
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <DetailsView symbol={symbol ?? ''} />
      </Suspense>
    </ErrorBoundary>
  );
};
