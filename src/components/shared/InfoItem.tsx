import { cn } from '@/lib/utils';

type InfoItemProps = {
  label: string;
  value: string | number;
  bold?: boolean;
};

export const InfoItem = ({ label, value, bold }: InfoItemProps) => (
  <div className="text-left space-y-1">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className={cn('text-base', bold && 'font-bold')}>{value}</div>
  </div>
);
