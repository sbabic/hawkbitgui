'use client';

import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import SoftwareModuleDetails from '../../components/software-module-details';

export default function SoftwareModuleDetailsContainer() {
  const selectedSoftwareModule = useSoftwareModulesStore((state) => state.selectedSoftwareModule);
  if (!selectedSoftwareModule) {
    return null;
  }

  return <SoftwareModuleDetails softwareModule={selectedSoftwareModule} />;
}
