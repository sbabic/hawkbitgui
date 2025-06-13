'use client';

import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';

function CardTitle({ children }: { children?: React.ReactNode }) {
  return <h2 className={styles.title}>{children}</h2>;
}

function CardActions({ children }: { children?: React.ReactNode }) {
  return <div className={styles.actions}>{children}</div>;
}

function CardHeader({ children }: { children?: React.ReactNode }) {
  return <div className={styles.header}>{children}</div>;
}

function CardBody({ children }: { children?: React.ReactNode }) {
  return <div className={styles.body}>{children}</div>;
}

interface CardProps {
  defaultWidth?: 'fit-content' | '100%';
  expanded?: boolean;
  children: React.ReactNode;
}

export default function Card({ defaultWidth = 'fit-content', children, expanded = false }: CardProps) {
  const [parentWidth, setParentWidth] = useState(300); // Default width
  const [parentHeight, setParentHeight] = useState(200); // Default height
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current?.parentElement) return;

    const parentElement = cardRef.current.parentElement;

    const updateSize = () => {
      const computedStyle = window.getComputedStyle(parentElement);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);

      // Calculate inner width excluding padding
      const widthWithoutPadding = parentElement.clientWidth - (paddingLeft + paddingRight);
      setParentWidth(widthWithoutPadding);

      // Calculate inner height excluding padding
      const heightWithoutPadding = parentElement.clientHeight - (paddingTop + paddingBottom);
      setParentHeight(heightWithoutPadding);
    };

    updateSize(); // Initial update

    // Observe parent size changes
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(parentElement);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${expanded ? styles.expanded : ''}`}
      initial={{ minWidth: 300, minHeight: 'fit-content', height: 'fit-content' }}
      animate={
        expanded
          ? {
              width: parentWidth,
              height: parentHeight > 0 ? parentHeight : 'fit-content',
            }
          : {
              width: defaultWidth,
            }
      }
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className={styles.container}>{children}</div>
    </motion.div>
  );
}

Card.Title = CardTitle;
Card.Actions = CardActions;
Card.Header = CardHeader;
Card.Body = CardBody;
