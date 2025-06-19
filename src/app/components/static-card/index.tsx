'use client';

import styles from './styles.module.scss';

function CardTitle({ children }: { children?: React.ReactNode }) {
  return <h2 className={styles.title}>{children}</h2>;
}

function CardActions({ children }: { children?: React.ReactNode }) {
  return <div className={styles.actions}>{children}</div>;
}

function CardHeader({ children }: { children?: React.ReactNode }) {
  return <div className={styles.header}>{children}</div>;
}

function CardBody({ style, children }: { style?: React.CSSProperties; children?: React.ReactNode }) {
  return (
    <div className={styles.body} style={style}>
      {children}
    </div>
  );
}

function CardDivider() {
  return <div className={styles.divider} />;
}

interface CardProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function StaticCard({ children, style }: CardProps) {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
}

StaticCard.Title = CardTitle;
StaticCard.Actions = CardActions;
StaticCard.Header = CardHeader;
StaticCard.Body = CardBody;
StaticCard.Divider = CardDivider;
