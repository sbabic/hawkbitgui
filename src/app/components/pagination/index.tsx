import { memo } from 'react';
import type { Pagination } from '@/types/utils/pagination';
import IconButton from '../icon-button';
import ChevronDownIcon from '../icons/chevron-down-icon';
import styles from './styles.module.scss';
import { isDefined } from '@/utils/is-defined';

interface PageNavigationProps {
  pagination: Pagination;
  onPageChange?: (page: number) => void;
}

function PageNavigation({ pagination, onPageChange }: PageNavigationProps) {
  const { page, size, totalItems } = pagination;

  const handleBack = () => {
    if (isDefined(onPageChange) && page > 0) {
      onPageChange(page - 1);
    }
  };

  const handleForward = () => {
    if (isDefined(onPageChange) && page < Math.floor(totalItems / size)) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <p style={{ margin: 0 }}>
        {page * size + 1} - {Math.min(page * size + size, totalItems)} of {totalItems}
      </p>
      {isDefined(onPageChange) && (
        <div className={styles.actions}>
          <IconButton onClick={handleBack} className={styles.backIcon} disabled={page === 0}>
            <ChevronDownIcon />
          </IconButton>
          <IconButton onClick={handleForward} className={styles.forwardIcon} disabled={Math.min(page * size + size, totalItems) === totalItems}>
            <ChevronDownIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default memo(PageNavigation, (prevProps, nextProps) => {
  return (
    prevProps.pagination.page === nextProps.pagination.page &&
    prevProps.pagination.size === nextProps.pagination.size &&
    prevProps.pagination.totalItems === nextProps.pagination.totalItems &&
    prevProps.onPageChange === nextProps.onPageChange
  );
});
