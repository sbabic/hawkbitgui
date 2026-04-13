import styles from './styles.module.scss';
import SearchIcon from '@/app/components/icons/search-icon';
import IconButton from '@/app/components/icon-button';
import { useFloating } from '@floating-ui/react';
import { useState } from 'react';
import { autoUpdate, flip, offset, shift } from '@floating-ui/dom';
import { isDefined } from '@/utils/is-defined';

export interface ExpandableSearchBarProps {
  defaultValue?: string;
  onSearchChange?: (value: string) => void;
}

export default function ExpandableSearchBar({ defaultValue, onSearchChange }: ExpandableSearchBarProps) {
  const [isOpen, setIsOpen] = useState(isDefined(defaultValue) && defaultValue.trim() !== '' ? true : false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'left',
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <>
      <div ref={refs.setReference}>
        <IconButton width='30px' height='30px' onClick={() => setIsOpen((prev) => !prev)}>
          <SearchIcon />
        </IconButton>
      </div>
      {isOpen && (
        <input
          defaultValue={defaultValue}
          className={styles.searchBar}
          style={floatingStyles}
          // eslint-disable-next-line react-hooks/refs
          ref={refs.setFloating}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      )}
    </>
  );
}
