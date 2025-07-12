'use client';

import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useExpandableCardContext } from './expandable-card-context';
import Text from '../text';

function CardTitle({ children }: { children?: React.ReactNode }) {
  return (
    <Text variant='heading-3' color='text-secondary'>
      {children}
    </Text>
  );
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
  style?: React.CSSProperties;
}

export default function Card({ defaultWidth = 'fit-content', children, expanded = false, style }: CardProps) {
  const [parentWidth, setParentWidth] = useState(300); // Default width
  const [parentHeight, setParentHeight] = useState(200); // Default height
  const [originalPosition, setOriginalPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { parentElementRef } = useExpandableCardContext();

  useEffect(() => {
    if (!parentElementRef.current) return;

    const parentElement = parentElementRef.current;

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
  }, [parentElementRef]);

  useEffect(() => {
    if (cardRef.current && !expanded) {
      const rect = cardRef.current.getBoundingClientRect();
      const parentRect = parentElementRef.current?.getBoundingClientRect();

      if (parentRect) {
        setOriginalPosition({
          top: rect.top - parentRect.top,
          left: rect.left - parentRect.left,
        });
      }
    }
  }, [expanded, parentElementRef]);

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
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }
          : {
              width: defaultWidth,
              top: originalPosition.top,
              left: originalPosition.left,
              right: 'auto',
              bottom: 'auto',
            }
      }
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      style={style}
    >
      <div className={styles.container}>{children}</div>
    </motion.div>
  );
}

Card.Title = CardTitle;
Card.Actions = CardActions;
Card.Header = CardHeader;
Card.Body = CardBody;
