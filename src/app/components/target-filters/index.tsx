import { ReactNode, useState } from 'react';
import styles from './styles.module.scss';
import ByStatusFilterContainer from '@/app/components/target-filters/containers/by-status-filter-container';
import TagFilterManager from '@/app/components/target-filters/components/tag-filter-manager';
import TypeFilterManager from '@/app/components/target-filters/components/type-filter-manager';

export default function TargetFilters() {
  const content: {
    title: string;
    component: ReactNode;
  }[] = [
    {
      title: 'By Status',
      component: <ByStatusFilterContainer />,
    },
    {
      title: 'By Tags',
      component: <TagFilterManager />,
    },
    {
      title: 'By Type',
      component: <TypeFilterManager />,
    },
    {
      title: 'Custom Filter',
      component: <div></div>,
    },
  ];

  const [selectedTitle, setSelectedTitle] = useState(content[0]?.title || '');

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {content.map((item, index) => (
          <>
            <button
              key={item.title}
              className={`${styles.filter} ${selectedTitle === item.title ? styles.active : ''}`}
              onClick={() => setSelectedTitle(item.title)}
            >
              {item.title}
            </button>
            {index !== content.length - 1 && <div className={styles.divider}></div>}
          </>
        ))}
      </div>
      <div className={styles.content}>{content.find((item) => item.title === selectedTitle)?.component}</div>
    </div>
  );
}
