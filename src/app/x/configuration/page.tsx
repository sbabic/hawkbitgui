'use client';
import React from 'react';
import { PageWrapper } from '@/app/components/page-wrapper';
import ConfigurationFormContainer from '@/app/x/configuration/containers/configuration-form-container';

export default function ConfigurationPage() {
  return (
    <PageWrapper>
      <PageWrapper.Title>Configuration</PageWrapper.Title>
      <ConfigurationFormContainer />
    </PageWrapper>
  );
}
