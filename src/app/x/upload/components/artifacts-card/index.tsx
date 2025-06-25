import ArtifactsTableContainer from '../../containers/artifacts-table-container';
import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import { useMemo } from 'react';
import StaticCard from '@/app/components/static-card';

export default function ArtifactsCard() {
  const selectedSoftwareModule = useSoftwareModulesStore((state) => state.selectedSoftwareModule);

  const cardTitle = useMemo(() => {
    return selectedSoftwareModule ? `Artifacts Details: ${selectedSoftwareModule.name}` : 'Artifacts';
  }, [selectedSoftwareModule]);

  return (
    <StaticCard>
      <StaticCard.Header>
        <StaticCard.Title>{cardTitle}</StaticCard.Title>
      </StaticCard.Header>
      <StaticCard.Divider />
      <StaticCard.Body>
        <ArtifactsTableContainer />
      </StaticCard.Body>
    </StaticCard>
  );
}
