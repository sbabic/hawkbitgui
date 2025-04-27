'use client';

import React from 'react';
import RolloutsCard from './components/rollouts-card';
import { PageWrapper } from '@/app/components/page-wrapper';

export default function RolloutPage() {
    return (
        <PageWrapper>
            <PageWrapper.Title>Rollout Management</PageWrapper.Title>
            <RolloutsCard />
        </PageWrapper>
    );
}
