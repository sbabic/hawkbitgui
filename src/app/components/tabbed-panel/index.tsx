'use client';

import { ReactNode, useState } from 'react';
import styles from './styles.module.scss';

export interface TabItem {
  title: string;
  component: ReactNode;
}

interface TabbedPanelProps {
  items: TabItem[];
  defaultTitle?: string;
  className?: string;
}

export default function TabbedPanel({ items, defaultTitle = items[0]?.title ?? '', className = '' }: TabbedPanelProps) {
  const [selectedTitle, setSelectedTitle] = useState(defaultTitle);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.tabs}>
        {items.map((item, index) => (
          <>
            <button
              key={item.title}
              className={`${styles.tab} ${selectedTitle === item.title ? styles.active : ''}`}
              onClick={() => setSelectedTitle(item.title)}
            >
              {item.title}
            </button>
            {index !== items.length - 1 && <div key={`${item.title}-${index}`} className={styles.divider}></div>}
          </>
        ))}
      </div>
      <div className={styles.content}>{items.find((item) => item.title === selectedTitle)?.component}</div>
    </div>
  );
}
