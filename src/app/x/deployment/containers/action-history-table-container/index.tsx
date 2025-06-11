'use client';

import React, { useEffect } from 'react';
import ActionHistoryTable from '@/app/x/deployment/components/action-history-table';
import { useTargetActionsTableStore } from '@/stores/target-action-table-store';

export default function ActionHistoryTableContainer() {
  const targetActions = useTargetActionsTableStore((state) => state.actions);
  const fetchTargetActions = useTargetActionsTableStore((state) => state.fetchActions);

  useEffect(() => {
    fetchTargetActions().catch(console.error);
  }, [fetchTargetActions]);

  return (
    <>
      <ActionHistoryTable targetActions={targetActions} />
    </>
  );
}
