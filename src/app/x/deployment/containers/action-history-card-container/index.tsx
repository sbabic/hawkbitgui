'use client';

import ActionHistoryCard from '@/app/x/deployment/components/action-history-card';
import { useState } from 'react';

export default function ActionHistoryCardContainer() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <>
      <ActionHistoryCard isExpanded={isExpanded} onToggleExpand={handleExpand} />
    </>
  );
}
