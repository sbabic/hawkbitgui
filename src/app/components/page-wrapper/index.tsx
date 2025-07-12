import Text from '../text';
import styles from './styles.module.scss';

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text variant='heading-1' style={{ marginBottom: '28px' }}>
      {children}
    </Text>
  );
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.page}`}>{children}</div>;
}

PageWrapper.Title = PageTitle;
