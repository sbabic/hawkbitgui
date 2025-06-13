'use client';

import ActionHistoryCard from '@/app/x/deployment/components/action-history-card';
import { useState } from 'react';
import { useTargetActionsTableStore } from '@/stores/target-action-table-store';

export default function ActionHistoryCardContainer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const setTableIsExpanded = useTargetActionsTableStore((state) => state.setIsExpanded);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
    setTableIsExpanded(!isExpanded);
  };
  return (
    <>
      <ActionHistoryCard isExpanded={isExpanded} onToggleExpand={handleExpand} />
    </>
  );
}
