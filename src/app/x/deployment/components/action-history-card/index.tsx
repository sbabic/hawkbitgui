'use client';

import PanelCard from '@/app/components/panel-card';
import ActionHistoryTableContainer from '@/app/x/deployment/containers/action-history-table-container';

type TargetsCardProps = {
  isExpanded: boolean;
  onToggleExpand: () => void;
};

export default function ActionHistoryCard({ isExpanded, onToggleExpand }: TargetsCardProps) {
  return (
    <>
      <PanelCard expanded={isExpanded}>
        <PanelCard.Header title='Action History' isExpanded={isExpanded} onToggleExpand={onToggleExpand}></PanelCard.Header>

        <PanelCard.Content>
          <ActionHistoryTableContainer />
        </PanelCard.Content>
      </PanelCard>
    </>
  );
}
