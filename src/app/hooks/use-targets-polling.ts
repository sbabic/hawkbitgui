import { useEffect } from 'react';
import { useTargetsTableStore } from '@/stores/targets-table-store';

export function useTargetsPolling(intervalMs = 10000) {
  const fetchTargets = useTargetsTableStore((state) => state.fetchTargets); // with loading
  const pollTargets = useTargetsTableStore((state) => state.pollTargets); // silent

  useEffect(() => {
    // Initial load with loading spinner
    fetchTargets();

    // Silent polling afterward
    const interval = setInterval(() => pollTargets(), intervalMs);
    return () => clearInterval(interval);
  }, [fetchTargets, pollTargets, intervalMs]);
}
