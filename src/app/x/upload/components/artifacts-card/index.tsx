import PanelCard from '@/app/components/panel-card';
import ArtifactsTableContainer from '../../containers/artifacts-table-container';
import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import { useMemo } from 'react';

export default function ArtifactsCard() {
  const selectedSoftwareModule = useSoftwareModulesStore((state) => state.selectedSoftwareModule);

  const cardTitle = useMemo(() => {
    return selectedSoftwareModule ? `Artifacts Details: ${selectedSoftwareModule.name}` : 'Artifacts';
  }, [selectedSoftwareModule]);

  return (
    <PanelCard defaultWidth='100%'>
      <PanelCard.Header title={cardTitle} onToggleExpand={() => {}} isExpanded={true} />
      <PanelCard.Content>
        <ArtifactsTableContainer />
      </PanelCard.Content>
    </PanelCard>
  );
}
