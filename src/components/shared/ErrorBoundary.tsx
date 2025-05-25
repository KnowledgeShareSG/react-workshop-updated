import * as React from 'react';
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from 'react-error-boundary';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error occurred, please try again.</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
};

export function ErrorBoundary({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}
