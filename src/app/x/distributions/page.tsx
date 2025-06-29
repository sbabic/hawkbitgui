'use client';

import React from 'react';
import { PageWrapper } from '@/app/components/page-wrapper';
import DistributionSetsLayoutContainer from './containers/distribution-sets-layout-container';

export default function DistributionSetPage() {
  return (
    <PageWrapper>
      <PageWrapper.Title>Distributions Management</PageWrapper.Title>
      <DistributionSetsLayoutContainer />
    </PageWrapper>
  );
}
