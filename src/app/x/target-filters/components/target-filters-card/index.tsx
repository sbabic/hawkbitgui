import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import SearchIcon from '@/app/components/icons/search-icon';
import PlusIcon from '@/app/components/icons/plus-icon';

import TargetFiltersTableContainer from '../../containers/target-filters-table-container';
import StaticCard from '@/app/components/static-card';
import ManageColumnsButton from '@/app/components/manage-columns-button';
import { useTargetFiltersTableStore } from '@/stores/target-filters-table-store';

interface TargetFiltersCardProps {
  onCreateClick: () => void;
}

export default function TargetFiltersCard({ onCreateClick }: TargetFiltersCardProps) {
  const visibleColumns = useTargetFiltersTableStore((state) => state.visibleColumns);
  const setVisibleColumns = useTargetFiltersTableStore((state) => state.setVisibleColumns);

  return (
    <StaticCard>
      <StaticCard.Header>
        <StaticCard.Title>Custom filter</StaticCard.Title>
        <StaticCard.Actions>
          <IconButton width='30px' height='30px'>
            <SearchIcon />
          </IconButton>
          <Button leftIcon={<PlusIcon width={18} height={18} />} onClick={onCreateClick}>
            Create new filter
          </Button>
          <ManageColumnsButton columns={visibleColumns} setVisibleColumns={setVisibleColumns} />
        </StaticCard.Actions>
      </StaticCard.Header>
      <StaticCard.Body>
        <TargetFiltersTableContainer />
      </StaticCard.Body>
    </StaticCard>
  );
}
