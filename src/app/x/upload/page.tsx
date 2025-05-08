'use client';

import React from 'react';
import { PageWrapper } from '@/app/components/page-wrapper';
import SoftwareModulesCard from '../software-modules/components/software-module-card';

export default function UploadPage() {
    return (
        <PageWrapper>
            <PageWrapper.Title>Upload</PageWrapper.Title>
            <SoftwareModulesCard />
        </PageWrapper>
    );
}
