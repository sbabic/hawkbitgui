'use client';

import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import DistributionSetModules from '../../components/distribution-set-modules';
import { SoftwareModule } from '@/entities';

export default function DistributionSetModulesContainer() {
  const selectedDistribution = useDistributionsSetsTableStore((state) => state.selectedDistribution);
  if (!selectedDistribution) {
    return null;
  }

  return (
    <DistributionSetModules
      distributionSet={selectedDistribution}
      onModuleDelete={function (module: SoftwareModule): void {
        console.log('Module delete clicked:', module);
        throw new Error('Function not implemented.');
      }}
    />
  );
}
