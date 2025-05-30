'use client';

import React from 'react';
import { PageWrapper } from '@/app/components/page-wrapper';
import DistributionSetsCard from './components/distribution-sets-card';
import CardsContainerGrid from '@/app/components/cards-container-grid';
import SoftwareModulesCard from '../software-modules/components/software-module-card';

export default function DistributionSetPage() {
  return (
    <PageWrapper>
      <PageWrapper.Title>Distributions Management</PageWrapper.Title>
      <CardsContainerGrid distributionInPercentages={[60, 40]}>
        <DistributionSetsCard />
        <SoftwareModulesCard />
      </CardsContainerGrid>
    </PageWrapper>
  );
}
