'use client';

import styles from './styles.module.scss';
import Card from '@/app/components/card';
import Button from '@/app/components/button';
import FolderIcon from '@/app/components/icons/folder-icon';

export default function TargetsCard() {
    return (
        <Card>
            <div className={styles.cardBody}>
                <div className={`${styles.header}`}>
                    <h2>Targets</h2>
                    <Button>Search</Button>
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
                <div className={styles.table}></div>
            </div>
        </Card>
    );
}
