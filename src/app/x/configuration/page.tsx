'use client';

import React from 'react';
import { PageWrapper } from '@/app/components/page-wrapper';
import ConfigurationForm from './components/configuration-form';

export default function ConfigurationPage() {
  return (
    <PageWrapper>
      <PageWrapper.Title>Configuration</PageWrapper.Title>
      <ConfigurationForm />
    </PageWrapper>
  );
}
