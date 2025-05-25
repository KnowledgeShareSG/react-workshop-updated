import { Loader2 } from 'lucide-react';

export const Spinner = () => (
  <div className="flex items-center justify-center">
    <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
  </div>
);
