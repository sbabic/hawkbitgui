'use client';

import styles from './styles.module.scss';
import Card from '@/app/components/card';
import Button from '@/app/components/button';
import FolderIcon from '@/app/components/icons/folder-icon';
import TargetTable from '@/app/components/target-table';
import IconButton from '@/app/components/icon-button';
import SearchIcon from '@/app/components/icons/search-icon';
import ExpandIcon from '@/app/components/icons/expand-icon';
import { useState } from 'react';
import MinimizeIcon from '@/app/components/icons/minimize-icon';

export default function TargetsCard() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <Card expanded={isExpanded}>
            <div className={styles.cardBody}>
                <div className={`${styles.header}`}>
                    <h2>Targets</h2>
                    <div className={`${styles.headerButtons}`}>
                        <IconButton width={'30px'} height={'30px'}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton
                            width={'30px'}
                            height={'30px'}
                            onClick={handleExpand}
                        >
                            {isExpanded ? <MinimizeIcon /> : <ExpandIcon />}
                        </IconButton>
                    </div>
                </div>
                <div className={styles.actionButtons}>
                    <Button>+ New target</Button>
                    <Button
                        color={'outline'}
                        className={styles.bulkUploadButton}
                    >
                        <FolderIcon />
                        Bulk Upload Targets
                    </Button>
                </div>
                <div className={styles.table}>
                    <TargetTable expanded={isExpanded} />
                </div>
            </div>
        </Card>
    );
}
