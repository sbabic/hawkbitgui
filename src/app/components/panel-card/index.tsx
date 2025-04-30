'use client';

import styles from './styles.module.scss';
import Card from '@/app/components/card';
import IconButton from '@/app/components/icon-button';
import ExpandIcon from '@/app/components/icons/expand-icon';
import MinimizeIcon from '@/app/components/icons/minimize-icon';
import { ReactNode } from 'react';

export type PanelCardRootProps = {
    children: ReactNode;
    expanded?: boolean;
};

export default function PanelCard({ children, expanded }: PanelCardRootProps) {
    return (
        <Card expanded={expanded}>
            <div className={styles.cardBody}>{children}</div>
        </Card>
    );
}

type HeaderProps = {
    title: string;
    onToggleExpand: () => void;
    isExpanded: boolean;
    children?: ReactNode;
};

function PanelCardHeader({ title, onToggleExpand, isExpanded, children }: HeaderProps) {
    return (
        <>
            <div className={styles.header}>
                <h2>{title}</h2>
                <div className={styles.headerButtons}>
                    {children}
                    <IconButton width='30px' height='30px' onClick={onToggleExpand}>
                        {isExpanded ? <MinimizeIcon /> : <ExpandIcon />}
                    </IconButton>
                </div>
            </div>
            <hr className={styles.divider} />
        </>
    );
}

function PanelCardActions({ children }: { children: ReactNode }) {
    return <div className={styles.actionButtons}>{children}</div>;
}

function PanelCardContent({ children }: { children: ReactNode }) {
    return <div className={styles.table}>{children}</div>;
}

PanelCard.Header = PanelCardHeader;
PanelCard.Actions = PanelCardActions;
PanelCard.Content = PanelCardContent;
