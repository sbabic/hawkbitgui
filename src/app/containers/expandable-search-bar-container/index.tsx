import { useEffect, useMemo } from 'react';
import ExpandableSearchBar from '@/app/components/expandable-search-bar';
import { useTargetsTableStore } from '@/stores/targets-table-store';
import { debounce } from 'lodash-es';

export default function ExpandableSearchBarContainer() {
    const setFilteredTargets = useTargetsTableStore((state) => state.setFilteredTargets);
    const allTargets = useTargetsTableStore((state) => state.targets);

    const handleSearch = useMemo(
        () =>
            debounce((query: string) => {
                const filtered = allTargets.filter((target) => target.name.toLowerCase().includes(query.toLowerCase()));
                setFilteredTargets(filtered);
            }, 300),
        [allTargets, setFilteredTargets]
    );

    useEffect(() => {
        return () => {
            handleSearch.cancel();
        };
    }, [handleSearch]);

    return <ExpandableSearchBar onSearchChange={handleSearch} />;
}
