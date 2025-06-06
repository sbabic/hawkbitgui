'use client';

import styles from './styles.module.scss';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import TargetsCardContainer from '@/app/x/deployment/containers/targets-card-container';
import DistributionsCardContainer from '@/app/x/deployment/containers/distributions-card-container';
import { Distribution, isDistribution, isTarget, Target } from '@/entities';
import { useRef, useState } from 'react';
import DraggedItemPreview from '@/app/components/dragged-item-preview';
import { TargetsService } from '@/services/targets-service';
import { handleErrorWithToast } from '@/utils/handle-error-with-toast';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import ConfirmationModal from '@/app/components/confirmation-modal';
import { useConfirmDialog } from '@/app/hooks';
import ScheduleForm, { FormData as ScheduleFormData } from '@/app/x/deployment/components/schedule-form';
import { AssignConfig } from '@/services/targets-service.types';

const mapScheduleFormDataToAssignConfig = (id: string | number, data?: ScheduleFormData): AssignConfig => {
  if (!data) {
    return {
      id: id,
    };
  }
  const assignConfig: AssignConfig = {
    type: data.mode,
    maintenanceWindow: data.maintenanceWindow
      ? {
          schedule: data.schedule,
          duration: data.duration,
          timezone: data.timeZone,
        }
      : undefined,
    id: id,
  };
  if (data.mode === 'timeforced' && data.forcedDate) {
    assignConfig.forcetime = new Date(data.forcedDate).getTime();
  }
  return assignConfig;
};

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

  const targetOverDistributionConfirmationModal = useConfirmDialog<{ target: Target; distribution: Distribution }>();

  const scheduleFormData = useRef<ScheduleFormData | undefined>(undefined);

  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingDistribution, setIsDraggingDistribution] = useState(false);
  const draggedTarget = useRef<Target | undefined>(undefined);
  const draggedDistribution = useRef<Distribution | undefined>(undefined);

  function handleDragStart(event: DragStartEvent) {
    const draggedData = event.active.data.current?.dragData;
    setIsDragging(true);
    if (isTarget(draggedData)) {
      draggedTarget.current = draggedData;
      draggedDistribution.current = undefined;
    }
    if (isDistribution(draggedData)) {
      setIsDraggingDistribution(true);
      draggedDistribution.current = draggedData;
      draggedTarget.current = undefined;
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const dragged = event.active.data.current?.dragData;
    const over = event.over?.data.current?.dropData;
    if (!dragged || !over) {
      setIsDragging(false);
      return;
    }

    if (isDistribution(dragged) && isTarget(over)) {
      const distribution = dragged;
      const target = over;
      targetOverDistributionConfirmationModal.open({ target, distribution }, () => {
        handleDistributionOverTarget(distribution, target, scheduleFormData.current);
      });

      setIsDragging(false);
      setIsDraggingDistribution(true);
      return;
    }

    if (isTarget(dragged) && isDistribution(over)) {
      const target = dragged;
      const distribution = over;
      targetOverDistributionConfirmationModal.open({ target, distribution }, () => {
        handleTargetOverDistribution(target, distribution, scheduleFormData.current);
      });
      setIsDragging(false);
      setIsDraggingDistribution(false);
      return;
    }

    setIsDragging(false);
    setIsDraggingDistribution(false);
  }

  async function handleDistributionOverTarget(distribution: Distribution, target: Target, scheduleData?: ScheduleFormData) {
    console.log('distribution over target', distribution, target);
    const config = mapScheduleFormDataToAssignConfig(distribution.id, scheduleData);
    try {
      await TargetsService.assignDistributionsToTarget({
        controllerId: target.controllerId,
        distributionsConfigs: [config],
      });
    } catch (error) {
      handleErrorWithToast(error, 'Failed to assign distribution to target');
    }
  }

  async function handleTargetOverDistribution(target: Target, distribution: Distribution, scheduleData?: ScheduleFormData) {
    console.log('target over distribution', target, distribution);
    const config = mapScheduleFormDataToAssignConfig(target.controllerId, scheduleData);
    try {
      await DistributionSetsService.assignTargetsToDistributionSet({
        distributionId: distribution.id,
        targetConfigs: [config],
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
        <DragOverlay>
          {isDragging ? <DraggedItemPreview name={isDraggingDistribution ? draggedDistribution.current?.name : draggedTarget.current?.name} /> : null}
        </DragOverlay>
      </DndContext>
      <ConfirmationModal
        size={'lg'}
        title={'Confirm Assignment'}
        onClose={targetOverDistributionConfirmationModal.close}
        onConfirm={targetOverDistributionConfirmationModal.confirm}
        isOpen={targetOverDistributionConfirmationModal.isOpen}
      >
        {isDraggingDistribution ? (
          <p>
            Are you sure you want to assign if Distribution set <b>{targetOverDistributionConfirmationModal.data?.distribution.name}</b> to Target{' '}
            <b>{targetOverDistributionConfirmationModal.data?.target.name}</b> ?
          </p>
        ) : (
          <p>
            Are you sure you want to assign if Target <b>{targetOverDistributionConfirmationModal.data?.target.name}</b> to Distribution set{' '}
            <b>{targetOverDistributionConfirmationModal.data?.distribution.name}</b> ?
          </p>
        )}
        <ScheduleForm onChange={(data) => (scheduleFormData.current = data)} />
      </ConfirmationModal>
    </div>
  );
}
