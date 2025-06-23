'use client';

import ActionLogs from '@/app/x/deployment/components/action-info/components/action-logs';
import { useEffect, useState } from 'react';
import { ActionLog } from '@/entities/action-log';
import { TargetsService } from '@/services/targets-service';
import { useTargetActionsTableStore } from '@/stores/target-action-table-store';

export default function ActionLogsContainer() {
  const selectedTargetId = useTargetActionsTableStore((state) => state.selectedTargetId);
  const selectedAction = useTargetActionsTableStore((state) => state.selectedAction);
  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching logs
    const fetchLogs = async () => {
      if (!selectedTargetId || !selectedAction) {
        console.warn('No target ID or action selected. Skipping log fetch.');
        return;
      }
      setIsLoading(true);
      const logs = await TargetsService.getActionLog(selectedTargetId, selectedAction.id);
      setIsLoading(false);
      setLogs(logs);
    };

    fetchLogs().catch(console.error);
  }, [selectedTargetId, selectedAction]);
  return <ActionLogs logs={logs} isLoading={isLoading} />;
}
