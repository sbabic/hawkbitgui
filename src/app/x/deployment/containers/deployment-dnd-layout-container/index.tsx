'use client';

import styles from './styles.module.scss';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import TargetsCardContainer from '@/app/x/deployment/containers/targets-card-container';
import DistributionsCardContainer from '@/app/x/deployment/containers/distributions-card-container';
import { Distribution, isDistribution, isTarget, Target } from '@/entities';
import { useState } from 'react';
import DraggedItemPreview from '@/app/components/dragged-item-preview';
import { TargetsService } from '@/services/targets-service';
import { handleErrorWithToast } from '@/utils/handle-error-with-toast';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import ConfirmationModal from '@/app/components/confirmation-modal';
import { useConfirmDialog } from '@/app/hooks';

export default function DeploymentDndLayoutContainer() {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const targetOverDistributionConfirmationModal = useConfirmDialog();

  const [isDragging, setIsDragging] = useState(false);
  const [draggedTarget, setDraggedTarget] = useState<Target | undefined>();
  function handleDragStart(event: DragStartEvent) {
    console.log('drag start');
    console.log(event.active.data.current?.dragData);
    setDraggedTarget(event.active.data.current?.dragData as Target | undefined);
    setIsDragging(true);
  }

  function handleDragEnd(event: DragEndEvent) {
    console.log('drag end');
    console.log(event.over?.data.current?.dropData);
    const dragged = event.active.data.current?.dragData;
    const over = event.over?.data.current?.dropData;
    if (!dragged || !over) {
      setIsDragging(false);
      return;
    }

    console.log('over', over);

    console.log('isDraggedDistribution', isDistribution(dragged));
    console.log('isOverTarget', isTarget(over));
    console.log('isDraggedTarget', isTarget(dragged));
    console.log('isOverDistribution', isDistribution(over));

    if (isDistribution(dragged) && isTarget(over)) {
      const distribution = dragged;
      const target = over;
      targetOverDistributionConfirmationModal.open({}, () => {
        handleDistributionOverTarget(distribution, target);
      });

      setIsDragging(false);
    }

    if (isTarget(dragged) && isDistribution(over)) {
      const target = dragged;
      const distribution = over;
      handleTargetOverDistribution(target, distribution);
      setIsDragging(false);
    }

    setIsDragging(false);
  }

  async function handleDistributionOverTarget(distribution: Distribution, target: Target) {
    console.log('distribution over target', distribution, target);
    try {
      await TargetsService.assignDistributionsToTarget({
        controllerId: target.controllerId,
        distributionsConfigs: [
          {
            id: distribution.id,
          },
        ],
      });
    } catch (error) {
      handleErrorWithToast(error, 'Failed to assign distribution to target');
    }
  }

  async function handleTargetOverDistribution(target: Target, distribution: Distribution) {
    console.log('target over distribution', target, distribution);
    try {
      await DistributionSetsService.assignTargetsToDistributionSet({
        distributionId: distribution.id,
        targetConfigs: [
          {
            id: distribution.id,
          },
        ],
      });
    } catch (error) {
      handleErrorWithToast(error, 'Failed to assign target to Distribution Set');
    }
  }

  return (
    <div className={styles.cardsContainer}>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <TargetsCardContainer />
        <DistributionsCardContainer />
        <DragOverlay>{isDragging ? <DraggedItemPreview name={draggedTarget?.name} /> : null}</DragOverlay>
      </DndContext>
      <ConfirmationModal
        title={'Confirm Assignment'}
        onClose={targetOverDistributionConfirmationModal.close}
        onConfirm={targetOverDistributionConfirmationModal.confirm}
        isOpen={targetOverDistributionConfirmationModal.isOpen}
      >
        Are you sure you want to assign Distribution set Ganshorn:1.0.0 to Target controlhaus-dhcor-e8:eb:1b:12:e4:fb?
      </ConfirmationModal>
    </div>
  );
}
