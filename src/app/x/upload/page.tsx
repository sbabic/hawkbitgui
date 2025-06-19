'use client';

import React, { useEffect } from 'react';
import { PageWrapper } from '@/app/components/page-wrapper';
import SoftwareModulesCard from '../software-modules/components/software-module-card';
import CardsContainerGrid from '@/app/components/cards-container-grid';
import UploadArtifactCardContainer from './containers/upload-artifact-card-container';
import ArtifactsCardContainer from './containers/artifacts-card-container';
import { useSoftwareModulesStore } from '@/stores/software-modules-store';

export default function UploadPage() {
  const setSelectedSoftwareModule = useSoftwareModulesStore((state) => state.setSelectedSoftwareModule);

  // Cleanup hook to unset when component unmounts
  useEffect(() => {
    return () => {
      setSelectedSoftwareModule(undefined);
    };
  }, [setSelectedSoftwareModule]);

  return (
    <PageWrapper>
      <PageWrapper.Title>Upload</PageWrapper.Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <CardsContainerGrid distributionInPercentages={[70, 30]}>
          <SoftwareModulesCard />
          <UploadArtifactCardContainer />
        </CardsContainerGrid>
        <CardsContainerGrid distributionInPercentages={[100]}>
          <ArtifactsCardContainer />
        </CardsContainerGrid>
      </div>
    </PageWrapper>
  );
}
