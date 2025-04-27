import { ReactNode, useState } from 'react';
import styles from './styles.module.scss';
import ByStatusFilterContainer from '@/app/components/target-filters/containers/by-status-filter-container';
import ByTagsFilterContainer from '@/app/components/target-filters/containers/by-tags-filter-container';

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
            component: <ByTagsFilterContainer />,
        },
        {
            title: 'Type Filter',
            component: <div></div>,
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
