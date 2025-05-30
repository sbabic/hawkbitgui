'use client';

import { useGetDistributionSets } from '../../hooks/use-get-distribution-sets';
import DistributionSetsTable from '../../components/distribution-sets-table';
import { Modal } from '@/app/components/modal';
import { useState } from 'react';
import DistributionSetInfo from '../../components/distribution-set-info';
import { useDistributionsSetsTableStore } from '@/stores/distribution-sets-table-store';
import { Distribution } from '@/entities';

export default function DistributionSetsTableContainer() {
  const { data: distributionSets } = useGetDistributionSets();
  const setSelectedDistribution = useDistributionsSetsTableStore((state) => state.setSelectedDistribution);

  const [isDistributionSetInfoModalOpen, setIsDistributionSetInfoModalOpen] = useState(false);

  const handleNameClick = (distributionSet: Distribution) => {
    setSelectedDistribution(distributionSet);
    setIsDistributionSetInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsDistributionSetInfoModalOpen(false);
    setSelectedDistribution(undefined);
  };

  return (
    <>
      <DistributionSetsTable distributionSets={distributionSets ?? []} onNameClick={handleNameClick} />
      <Modal isOpen={isDistributionSetInfoModalOpen} variant='unstyled' onClose={closeInfoModal} size={'fitContent'}>
        <DistributionSetInfo />
      </Modal>
    </>
  );
}
