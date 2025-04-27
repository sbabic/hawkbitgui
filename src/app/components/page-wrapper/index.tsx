import styles from './styles.module.scss';

function PageTitle({ children }: { children: React.ReactNode }) {
    return <h1 className={styles.title}>{children}</h1>;
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
    return <div className={`${styles.page}`}>{children}</div>;
}

PageWrapper.Title = PageTitle;
