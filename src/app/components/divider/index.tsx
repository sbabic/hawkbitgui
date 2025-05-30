import styles from './styles.module.scss';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
}

export default function Divider({ orientation = 'horizontal' }: DividerProps) {
  return <div className={`${styles.divider} ${styles[orientation]}`} />;
}
