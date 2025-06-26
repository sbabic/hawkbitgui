import { useEffect } from 'react';
import { useDistributionsTableStore } from '@/stores/distributions-table-store';

export function useDistributionsPolling(intervalMs = 10000) {
  const fetchDistributions = useDistributionsTableStore((state) => state.fetchDistributions); // with loading
  const pollDistributions = useDistributionsTableStore((state) => state.pollDistributions); // silent

  useEffect(() => {
    // Initial load with loading spinner
    fetchDistributions();

    // Silent polling afterward
    const interval = setInterval(() => pollDistributions(), intervalMs);
    return () => clearInterval(interval);
  }, [fetchDistributions, pollDistributions, intervalMs]);
}
