import ConfirmDeleteModal from '@/app/components/confirm-delete-modal';
import TargetFiltersTable from '../../components/target-filters-table';
import { useDeleteTargetFilter } from '../../hooks/use-delete-target-filter';
import { useGetTargetFilters } from '../../hooks/use-get-target-filters';
import { useConfirmDialog } from '@/app/hooks';
import { TargetFilter } from '@/entities/target-filter';

export default function TargetFiltersTableContainer() {
  const { data: targetFilters, refetch } = useGetTargetFilters();

  const confirmDialog = useConfirmDialog<TargetFilter>();
  const { deleteTargetFilter } = useDeleteTargetFilter();

  const handleDelete = (targetFilter: TargetFilter) => {
    confirmDialog.open(targetFilter, async () => {
      await deleteTargetFilter(targetFilter.id);
      await refetch();
    });
  };

  return (
    <>
      <TargetFiltersTable modules={targetFilters ?? []} onDelete={handleDelete} />
      <ConfirmDeleteModal isOpen={confirmDialog.isOpen} onConfirm={confirmDialog.confirm} onClose={confirmDialog.close}>
        <ConfirmDeleteModal.Message>
          Are you sure you want to delete target filter <span style={{ fontWeight: 'bold' }}>{confirmDialog.data?.name}</span>?
        </ConfirmDeleteModal.Message>
      </ConfirmDeleteModal>
    </>
  );
}
