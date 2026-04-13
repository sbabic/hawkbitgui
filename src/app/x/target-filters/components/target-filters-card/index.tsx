import Button from '@/app/components/button';
import PlusIcon from '@/app/components/icons/plus-icon';
import ExpandableSearchBar from '@/app/components/expandable-search-bar';

import TargetFiltersTableContainer from '../../containers/target-filters-table-container';
import StaticCard from '@/app/components/static-card';
import ManageColumnsButton from '@/app/components/manage-columns-button';
import { useTargetFiltersTableStore } from '@/stores/target-filters-table-store';

interface TargetFiltersCardProps {
  onCreateClick: () => void;
  onSearchChange: (value: string) => void;
}

export default function TargetFiltersCard({ onCreateClick, onSearchChange }: TargetFiltersCardProps) {
  const visibleColumns = useTargetFiltersTableStore((state) => state.visibleColumns);
  const setVisibleColumns = useTargetFiltersTableStore((state) => state.setVisibleColumns);
  const searchQuery = useTargetFiltersTableStore((state) => state.searchQuery);
  return (
    <StaticCard>
      <StaticCard.Header>
        <StaticCard.Title>Custom filter</StaticCard.Title>
        <StaticCard.Actions>
          <ExpandableSearchBar defaultValue={searchQuery} onSearchChange={onSearchChange} />
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
