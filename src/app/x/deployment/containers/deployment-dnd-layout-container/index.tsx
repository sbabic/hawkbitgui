'use client';

import styles from './styles.module.scss';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import TargetsCardContainer from '@/app/x/deployment/containers/targets-card-container';
import DistributionsCardContainer from '@/app/x/deployment/containers/distributions-card-container';
import { Distribution, isDistribution, isTarget, Target } from '@/entities';
import { useState } from 'react';
import DraggedItemPreview from '@/app/components/dragged-item-preview';
import { TargetsService } from '@/services/targets-service';
import { toast } from 'react-hot-toast';
import { isErrorWithMessage } from '@/utils/is-error-with-message';

export default function DeploymentDndLayoutContainer() {
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
      handleDistributionOverTarget(distribution, target);
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
      console.error('Failed to assign distribution to target', error);
      if (isErrorWithMessage(error)) {
        toast.error(error.message, {});
        return;
      }
      toast.error('Failed to assign distribution to target', {});
    }
  }

  function handleTargetOverDistribution(target: Target, distribution: Distribution) {
    console.log('target over distribution', target, distribution);
  }

  return (
    <div className={styles.cardsContainer}>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <TargetsCardContainer />
        <DistributionsCardContainer />
        <DragOverlay>{isDragging ? <DraggedItemPreview name={draggedTarget?.name} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
}
