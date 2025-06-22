'use client';

import type React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import styles from './styles.module.scss';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  place?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  withArrow?: boolean;
}

export default function Tooltip({ content, children, place = 'bottom', delay = 200, withArrow = false }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useLayoutEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let x = 0;
      let y = 0;

      switch (place) {
        case 'top':
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.top - tooltipRect.height - 3;
          break;
        case 'bottom':
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.bottom + 3;
          break;
        case 'left':
          x = triggerRect.left - tooltipRect.width - 3;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
        case 'right':
          x = triggerRect.right + 3;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
      }

      // Keep tooltip within viewport
      const padding = 3;
      x = Math.max(padding, Math.min(x, window.innerWidth - tooltipRect.width - padding));
      y = Math.max(padding, Math.min(y, window.innerHeight - tooltipRect.height - padding));

      setTooltipPosition({ x, y });
    }
  }, [isVisible, place]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <>
      <div ref={triggerRef} className={styles.tooltipTrigger} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`${styles.tooltip} ${styles[`tooltip--${place}`]}`}
          style={{
            position: 'fixed',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            zIndex: 9999,
          }}
        >
          <div className={styles.tooltipContent}>{content}</div>
          {withArrow && <div className={styles.tooltipArrow} />}
        </div>
      )}
    </>
  );
}
