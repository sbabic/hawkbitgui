import Card from '@/app/components/card';
import IconButton from '@/app/components/icon-button';
import { TargetFilter } from '@/entities/target-filter';
import TargetFiltersFormContainer from '../../containers/target-filters-form-container';
import ChevronDownIcon from '@/app/components/icons/chevron-down-icon';
import styles from './styles.module.scss';
import TargetFilterTargetsTableContainer from '../../containers/target-filter-targets-table-container';
import XMarkIcon from '@/app/components/icons/x-mark-icon';

interface SetTargetFilterCardProps {
  selectedTargetFilter?: TargetFilter;
  onReturnToTargetFiltersClick: () => void;
  onSubmitSuccess: () => void;
  onClose: () => void;
}

export default function SetTargetFilterCard({ selectedTargetFilter, onReturnToTargetFiltersClick, onSubmitSuccess, onClose }: SetTargetFilterCardProps) {
  return (
    <Card expanded={true}>
      <Card.Header>
        <Card.Title>
          {!selectedTargetFilter ? (
            'Custom filter'
          ) : (
            <div className={styles.headerContainer}>
              <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={onReturnToTargetFiltersClick}>
                Custom filter
              </p>
              <ChevronDownIcon width={30} height={30} style={{ transform: 'rotate(270deg)' }} />
              <p style={{ fontWeight: 'bold' }}>{selectedTargetFilter.name}</p>
            </div>
          )}
        </Card.Title>
        <Card.Actions>
          <IconButton width='30px' height='30px' onClick={onClose}>
            <XMarkIcon />
          </IconButton>
        </Card.Actions>
      </Card.Header>
      <Card.Body>
        <div className={styles.bodyContainer}>
          <TargetFiltersFormContainer targetFilter={selectedTargetFilter} onSubmitSuccess={onSubmitSuccess} />
          <TargetFilterTargetsTableContainer />
        </div>
      </Card.Body>
    </Card>
  );
}
