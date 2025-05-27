import { ReactNode, useState } from 'react';
import styles from './styles.module.scss';
import ByStatusFilterContainer from '@/app/components/target-filters/containers/by-status-filter-container';
import ByTypeFilterContainer from '@/app/components/target-filters/containers/by-type-filter-container';
import TagFilterManager from '@/app/components/target-filters/components/tag-filter-manager';

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
      component: <ByTypeFilterContainer />,
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
        {content.map((item) => (
          <button
            key={item.title}
            className={`${styles.filter} ${selectedTitle === item.title ? styles.active : ''}`}
            onClick={() => setSelectedTitle(item.title)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className={styles.content}>{content.find((item) => item.title === selectedTitle)?.component}</div>
    </div>
  );
}
