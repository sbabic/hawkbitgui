import { ExpandableCardProvider } from '@/app/components/card/expandable-card-context';
import CardsContainerGrid from '@/app/components/cards-container-grid';
import DistributionSetsCard from '../../components/distribution-sets-card';
import SoftwareModulesCard from '@/app/x/software-modules/components/software-module-card';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import DraggedItemPreview from '@/app/components/dragged-item-preview';
import { useCallback, useRef, useState } from 'react';
import { Distribution, isDistribution, isDistributionRecord, isSoftwareModule, isSoftwareModuleRecord, SoftwareModule } from '@/entities';
import { useConfirmDialog } from '@/app/hooks';
import ConfirmationModal from '@/app/components/confirmation-modal';
import { toast } from 'react-hot-toast';
import { useAssignModuleToDistributionSet } from '../../hooks/use-assign-module-to-distribution-set';
import { useGetPaginatedDistributionSets } from '../../hooks/use-get-paginated-distribution-sets';

export default function DistributionSetsLayoutContainer() {
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

  const { assignModuleToDistributionSet } = useAssignModuleToDistributionSet();
  const { refetch: refetchDistributionSets } = useGetPaginatedDistributionSets({ queryOptions: { enabled: false } });

  const [isDragging, setIsDragging] = useState(false);
  const draggedEntity = useRef<'Distribution' | 'Module' | undefined>(undefined);

  const draggedDistributions = useRef<Distribution[]>([]);
  const draggedModules = useRef<SoftwareModule[]>([]);

  const assignConfirmationModal = useConfirmDialog<{ softwareModules: SoftwareModule[]; distributions: Distribution[] }>();

  function handleDragStart(event: DragStartEvent) {
    const draggedData = event.active.data.current?.dragData;
    setIsDragging(true);

    if (isSoftwareModuleRecord(draggedData)) {
      draggedEntity.current = 'Module';
      draggedModules.current = Object.values(draggedData);
      draggedDistributions.current = [];
    }
    if (isDistributionRecord(draggedData)) {
      draggedEntity.current = 'Distribution';
      draggedDistributions.current = Object.values(draggedData);
      draggedModules.current = [];
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const dragged = event.active.data.current?.dragData;
    const over = event.over?.data.current?.dropData;

    if (!dragged || !over) {
      setIsDragging(false);
      return;
    }

    if (isDistributionRecord(dragged) && isSoftwareModule(over)) {
      const distributions = Object.values(dragged);
      const softwareModule = over;
      assignConfirmationModal.open({ softwareModules: [softwareModule], distributions }, () => {
        handleAssignModulesToDistributions({ distributions, softwareModules: [softwareModule] });
      });

      resetDragging();
      return;
    }

    if (isSoftwareModuleRecord(dragged) && isDistribution(over)) {
      const softwareModules = Object.values(dragged);
      const distribution = over;
      assignConfirmationModal.open({ softwareModules, distributions: [distribution] }, () => {
        handleAssignModulesToDistributions({ distributions: [distribution], softwareModules });
      });
      resetDragging();
      return;
    }

    resetDragging();
  }

  function resetDragging() {
    setIsDragging(false);
    draggedEntity.current = undefined;
  }

  async function handleAssignModulesToDistributions(params: { distributions: Distribution[]; softwareModules: SoftwareModule[] }) {
    const { distributions, softwareModules } = params;
    const promises = distributions.map(
      async (distribution) =>
        await assignModuleToDistributionSet({
          distributionSetId: distribution.id,
          softwareModuleIds: softwareModules.map((softwareModule) => softwareModule.id),
        })
    );
    await Promise.all(promises);
    toast.success('Modules assigned to distributions successfully');
    refetchDistributionSets();
  }

  const getDraggedItemPreviewProps = useCallback(() => {
    if (draggedEntity.current === 'Distribution') {
      return {
        name: draggedDistributions.current[0]?.name,
        count: draggedDistributions.current.length,
      };
    }
    if (draggedEntity.current === 'Module') {
      return {
        name: draggedModules.current[0]?.name,
        count: draggedModules.current.length,
      };
    }
  }, []);

  const getDraggedItemsContent = useCallback(() => {
    if (!assignConfirmationModal.data) {
      return null;
    }
    const distributionsCount = assignConfirmationModal.data.distributions.length;
    const softwareModulesCount = assignConfirmationModal.data.softwareModules.length;

    if (distributionsCount === 1 && softwareModulesCount === 1) {
      return (
        <p>
          Are you sure you want to assign Software Module <b>{assignConfirmationModal.data?.softwareModules[0].name}</b> to Distribution set{' '}
          <b>{assignConfirmationModal.data?.distributions[0].name}</b> ?
        </p>
      );
    }

    if (distributionsCount > 1 && softwareModulesCount === 1) {
      return (
        <p>
          Are you sure you want to assign Software Module <b>{assignConfirmationModal.data?.softwareModules[0].name}</b> to <b>{distributionsCount}</b>{' '}
          Distribution sets?
        </p>
      );
    }
    if (distributionsCount === 1 && softwareModulesCount > 1) {
      return (
        <p>
          Are you sure you want to assign <b>{softwareModulesCount}</b> Software Modules to Distribution set{' '}
          <b>{assignConfirmationModal.data?.distributions[0].name}</b> ?
        </p>
      );
    }
  }, [assignConfirmationModal.data]);

  return (
    <>
      <ExpandableCardProvider>
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <CardsContainerGrid distributionInPercentages={[60, 40]}>
            <DistributionSetsCard />
            <SoftwareModulesCard />
          </CardsContainerGrid>
          <DragOverlay>{isDragging ? <DraggedItemPreview {...getDraggedItemPreviewProps()} /> : null}</DragOverlay>
        </DndContext>
      </ExpandableCardProvider>
      {assignConfirmationModal.isOpen && (
        <ConfirmationModal
          size='lg'
          title='Confirm Assignment'
          onClose={assignConfirmationModal.close}
          onConfirm={assignConfirmationModal.confirm}
          isOpen={assignConfirmationModal.isOpen}
        >
          {getDraggedItemsContent()}
        </ConfirmationModal>
      )}
    </>
  );
}
