'use client';

import React, { useEffect } from 'react';
import ActionHistoryTable from '@/app/x/deployment/components/action-history-table';
import { useTargetActionsTableStore } from '@/stores/target-action-table-store';

export default function ActionHistoryTableContainer() {
  const targetActions = useTargetActionsTableStore((state) => state.actions);
  const isExpanded = useTargetActionsTableStore((state) => state.isExpanded);
  const fetchTargetActions = useTargetActionsTableStore((state) => state.fetchActions);
  const selectedTargetId = useTargetActionsTableStore((state) => state.selectedTargetId);
  useEffect(() => {
    if (!selectedTargetId) {
      console.warn('No target ID selected. Skipping action history fetch.');
      return;
    }
    fetchTargetActions(selectedTargetId).catch(console.error);
  }, [fetchTargetActions, selectedTargetId]);

  return (
    <>
      <ActionHistoryTable targetActions={targetActions} expanded={isExpanded} />
    </>
  );
}
