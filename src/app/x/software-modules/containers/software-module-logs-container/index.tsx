'use client';

import { useSoftwareModulesStore } from '@/stores/software-modules-store';
import SoftwareModuleLogs from '../../components/software-module-logs';

export default function SoftwareModuleLogsContainer() {
  const selectedSoftwareModule = useSoftwareModulesStore((state) => state.selectedSoftwareModule);
  if (!selectedSoftwareModule) {
    return null;
  }

  return <SoftwareModuleLogs softwareModule={selectedSoftwareModule} />;
}
