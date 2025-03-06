'use client';

import React, { ElementType, useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import Image from 'next/image';
import RocketIcon from '@/app/components/icons/rocket-icon';
import RolloutIcon from '@/app/components/icons/rollout-icon';
import UploadIcon from '@/app/components/icons/upload-icon';
import LogoutIcon from '@/app/components/icons/logout-icon';
import { usePathname } from 'next/navigation';
import ClickIcon from '@/app/components/icons/click-icon';
import WebIcon from '@/app/components/icons/web-icon';
import GearIcon from '@/app/components/icons/gear-icon';

export default function Layout({ children }: { children: React.ReactNode }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();

    const navItems = [
        { href: '/x/deployment', label: 'Deployment', icon: RocketIcon },
        { href: '/x/rollout', label: 'Rollout', icon: RolloutIcon },
        { href: '/x/target-filters', label: 'Target filters', icon: ClickIcon },
        { href: '/x/distributions', label: 'Distributions', icon: WebIcon },
        { href: '/x/upload', label: 'Upload', icon: UploadIcon },
        { href: '/x/configuration', label: 'Configuration', icon: GearIcon },
    ];

    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <aside
                className={`${styles.sidebar} ${sidebarOpen ? '' : styles.collapsed}`}
            >
                <div className={styles.sidebarHeader}>
                    <a className={styles.brand}>
                        <Image
                            width={93}
                            height={42}
                            src={'/images/hawkbit-logo.svg'}
                            alt={'Hawkbit logo'}
                        />
                    </a>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item, i) => (
                        <NavItem
                            href={item.href}
                            key={i}
                            icon={item.icon}
                            expanded={sidebarOpen}
                            label={item.label}
                            isActive={item.href === pathname}
                        />
                    ))}
                </nav>

                <div className={styles.logout}>
                    <NavItem
                        href='/logout'
                        label='Logout'
                        icon={LogoutIcon}
                        expanded={sidebarOpen}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <div
                className={`${styles.main} ${sidebarOpen ? '' : styles.expanded}`}
            >
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.searchBar}>
                        <input type='text' placeholder='Search' />
                    </div>

                    <div className={styles.headerActions}>
                        <div className={styles.profile}>D</div>
                    </div>
                </header>

                {/* Page Content */}
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    );
}

function NavItem({
    href,
    label,
    icon: Icon,
    expanded,
    isActive,
}: {
    href: string;
    label: string;
    icon: ElementType;
    expanded: boolean;
    isActive?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
        >
            <Icon />
            {expanded && <span className={styles.label}>{label}</span>}
        </Link>
    );
}
