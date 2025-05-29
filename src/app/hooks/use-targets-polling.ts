import { useEffect } from 'react';
import { useTargetsTableStore } from '@/stores/targets-table-store';

export function useTargetsPolling(intervalMs = 10000) {
  const fetchTargets = useTargetsTableStore((state) => state.fetchTargets);

  useEffect(() => {
    fetchTargets();
    const interval = setInterval(() => fetchTargets(), intervalMs);
    return () => clearInterval(interval);
  }, [fetchTargets, intervalMs]);
}
