'use client';

import React from 'react';
import { PageWrapper } from '@/app/components/page-wrapper';
import TargetFiltersCard from './components/target-filters-card';

export default function TargetFiltersPage() {
  return (
    <PageWrapper>
      <PageWrapper.Title>Target Filters</PageWrapper.Title>
      <TargetFiltersCard />
    </PageWrapper>
  );
}
