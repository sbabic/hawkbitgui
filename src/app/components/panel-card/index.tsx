'use client';

import styles from './styles.module.scss';
import Card from '@/app/components/card';
import IconButton from '@/app/components/icon-button';
import ExpandIcon from '@/app/components/icons/expand-icon';
import MinimizeIcon from '@/app/components/icons/minimize-icon';
import { ReactNode } from 'react';
import Text from '../text';

export type PanelCardRootProps = {
  defaultWidth?: 'fit-content' | '100%';
  children: ReactNode;
  expanded?: boolean;
  style?: React.CSSProperties;
};

export default function PanelCard({ defaultWidth, children, expanded, style }: PanelCardRootProps) {
  return (
    <Card defaultWidth={defaultWidth} expanded={expanded} style={style}>
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
        <Text variant='heading-2' color='title-secondary'>
          {title}
        </Text>
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
