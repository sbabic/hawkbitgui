'use client';

import React from 'react';
import { PageWrapper } from '@/app/components/page-wrapper';
import TargetFiltersLayoutContainer from './containers/target-filters-layout-container';

export default function TargetFiltersPage() {
  return (
    <PageWrapper>
      <PageWrapper.Title>Target Filters Management</PageWrapper.Title>
      <TargetFiltersLayoutContainer />
    </PageWrapper>
  );
}
