'use client';

import styles from './styles.module.scss';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import TargetsCardContainer from '@/app/x/deployment/containers/targets-card-container';
import DistributionsCardContainer from '@/app/x/deployment/containers/distributions-card-container';
import { Distribution, isDistribution, isDistributionRecord, isTarget, isTargetRecord, Target } from '@/entities';
import { useRef, useState } from 'react';
import DraggedItemPreview from '@/app/components/dragged-item-preview';
import { TargetsService } from '@/services/targets-service';
import { handleErrorWithToast } from '@/utils/handle-error-with-toast';
import { DistributionSetsService } from '@/services/distribution-sets-service';
import ConfirmationModal from '@/app/components/confirmation-modal';
import { useConfirmDialog } from '@/app/hooks';
import ScheduleForm, { FormData as ScheduleFormData } from '@/app/x/deployment/components/schedule-form';
import { AssignConfig } from '@/services/targets-service.types';
import ActionHistoryCardContainer from '@/app/x/deployment/containers/action-history-card-container';

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

  const targetOverDistributionConfirmationModal = useConfirmDialog<{ targets: Target[]; distributions: Distribution[] }>();

  const scheduleFormData = useRef<ScheduleFormData | undefined>(undefined);

  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingDistribution, setIsDraggingDistribution] = useState(false);
  const draggedTargets = useRef<Target[]>([]);
  const draggedDistributions = useRef<Distribution[]>([]);

  function handleDragStart(event: DragStartEvent) {
    const draggedData = event.active.data.current?.dragData;
    setIsDragging(true);

    console.log('isDistributionRecord', isDistributionRecord(draggedData), 'isTargetRecord', isTargetRecord(draggedData));
    console.log('draggedData', draggedData);

    if (isTargetRecord(draggedData)) {
      draggedTargets.current = Object.values(draggedData);
      draggedDistributions.current = [];
    }
    if (isDistributionRecord(draggedData)) {
      setIsDraggingDistribution(true);
      draggedDistributions.current = Object.values(draggedData);
      draggedTargets.current = [];
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const dragged = event.active.data.current?.dragData;
    const over = event.over?.data.current?.dropData;

    if (!dragged || !over) {
      setIsDragging(false);
      return;
    }

    if (isDistributionRecord(dragged) && isTarget(over)) {
      console.log('distributions over target');
      const distributions = Object.values(dragged);
      const target = over;
      targetOverDistributionConfirmationModal.open({ targets: [target], distributions }, () => {
        handleDistributionOverTarget(distributions, target, scheduleFormData.current);
      });

      setIsDragging(false);
      setIsDraggingDistribution(true);
      return;
    }

    if (isTargetRecord(dragged) && isDistribution(over)) {
      console.log('targets over distribution');
      const targets = Object.values(dragged);
      const distribution = over;
      targetOverDistributionConfirmationModal.open({ targets, distributions: [distribution] }, () => {
        handleTargetOverDistribution(targets, distribution, scheduleFormData.current);
      });
      setIsDragging(false);
      setIsDraggingDistribution(false);
      return;
    }

    setIsDragging(false);
    setIsDraggingDistribution(false);
  }

  async function handleDistributionOverTarget(distributions: Distribution[], target: Target, scheduleData?: ScheduleFormData) {
    console.log('distribution over target', distributions, target);
    const configs = distributions.map((distribution) => mapScheduleFormDataToAssignConfig(distribution.id, scheduleData));
    try {
      await TargetsService.assignDistributionsToTarget({
        controllerId: target.controllerId,
        distributionsConfigs: configs,
      });
    } catch (error) {
      handleErrorWithToast(error, 'Failed to assign distribution to target');
    }
  }

  async function handleTargetOverDistribution(targets: Target[], distribution: Distribution, scheduleData?: ScheduleFormData) {
    console.log('target over distribution', targets, distribution);
    const configs = targets.map((target) => mapScheduleFormDataToAssignConfig(target.controllerId, scheduleData));
    try {
      await DistributionSetsService.assignTargetsToDistributionSet({
        distributionId: distribution.id,
        targetConfigs: configs,
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
        <ActionHistoryCardContainer />
        <DragOverlay>
          {isDragging ? (
            <DraggedItemPreview
              name={isDraggingDistribution ? draggedDistributions.current[0]?.name : draggedTargets.current[0]?.name}
              count={isDraggingDistribution ? draggedDistributions.current.length : draggedTargets.current.length}
            />
          ) : null}
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
            Are you sure you want to assign if Distribution set <b>{targetOverDistributionConfirmationModal.data?.distributions[0].name}</b> to Target{' '}
            <b>{targetOverDistributionConfirmationModal.data?.targets[0].name}</b> ?
          </p>
        ) : (
          <p>
            Are you sure you want to assign if Target <b>{targetOverDistributionConfirmationModal.data?.targets[0].name}</b> to Distribution set{' '}
            <b>{targetOverDistributionConfirmationModal.data?.distributions[0].name}</b> ?
          </p>
        )}
        <ScheduleForm onChange={(data) => (scheduleFormData.current = data)} />
      </ConfirmationModal>
    </div>
  );
}
