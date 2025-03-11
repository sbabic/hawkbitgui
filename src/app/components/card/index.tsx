'use client';

import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';

export default function Card({ children }: { children?: React.ReactNode }) {
    const [isExpanded, setIsExpanded] = useState(false);

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
            const widthWithoutPadding =
                parentElement.clientWidth - (paddingLeft + paddingRight);
            setParentWidth(widthWithoutPadding);

            // Calculate inner height excluding padding
            const heightWithoutPadding =
                parentElement.clientHeight - (paddingTop + paddingBottom);
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
            className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
            initial={{ minWidth: 300, minHeight: 200 }}
            animate={
                isExpanded
                    ? {
                          width: parentWidth,
                          height: parentHeight,
                      }
                    : {}
            }
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {children}
        </motion.div>
    );
}
