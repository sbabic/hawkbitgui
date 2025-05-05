import { ReactNode, useState } from 'react';
import styles from './styles.module.scss';
import ByDistributionsFilterContainer from '@/app/x/deployment/components/distribution-filters/containers/by-distributions-filter-container';

export default function DistributionFilters() {
    const content: {
        title: string;
        component: ReactNode;
    }[] = [
        {
            title: 'By Tags',
            component: <ByDistributionsFilterContainer />,
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
