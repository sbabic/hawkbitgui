import styles from './styles.module.scss';
import SearchIcon from '@/app/components/icons/search-icon';
import IconButton from '@/app/components/icon-button';
import { useFloating } from '@floating-ui/react';
import { useState } from 'react';
import { autoUpdate, flip, offset, shift } from '@floating-ui/dom';

export interface ExpandableSearchBarProps {
    onSearchChange?: (value: string) => void;
}

export default function ExpandableSearchBar({ onSearchChange }: ExpandableSearchBarProps) {
    const [isOpen, setIsOpen] = useState(false);

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
            {isOpen && <input className={styles.searchBar} style={floatingStyles} ref={refs.setFloating} onChange={(e) => onSearchChange?.(e.target.value)} />}
        </>
    );
}
