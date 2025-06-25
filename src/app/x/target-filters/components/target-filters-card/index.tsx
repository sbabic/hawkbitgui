import Button from '@/app/components/button';
import IconButton from '@/app/components/icon-button';
import SearchIcon from '@/app/components/icons/search-icon';
import PlusIcon from '@/app/components/icons/plus-icon';

import TargetFiltersTableContainer from '../../containers/target-filters-table-container';
import ChevronDownIcon from '@/app/components/icons/chevron-down-icon';
import StaticCard from '@/app/components/static-card';

interface TargetFiltersCardProps {
  onCreateClick: () => void;
}

export default function TargetFiltersCard({ onCreateClick }: TargetFiltersCardProps) {
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
          <Button variant='ghost' rightIcon={<ChevronDownIcon width={18} height={18} />}>
            Manage columns
          </Button>
        </StaticCard.Actions>
      </StaticCard.Header>
      <StaticCard.Body>
        <TargetFiltersTableContainer />
      </StaticCard.Body>
    </StaticCard>
  );
}
