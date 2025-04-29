'use client';

import React from 'react';
import { PageWrapper } from '@/app/components/page-wrapper';
import DistributionSetsCard from './components/distribution-sets-card';
import DistributionSetTypesCard from '../distribution-set-types/components/distribution-set-types-card';

export default function DistributionSetPage() {
    return (
        <PageWrapper>
            <PageWrapper.Title>Distributions Management</PageWrapper.Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ width: '100%', height: '300px' }}>
                    <DistributionSetsCard />
                </div>
                <div style={{ width: '100%', height: '300px' }}>
                    <DistributionSetTypesCard />
                </div>
            </div>
        </PageWrapper>
    );
}
