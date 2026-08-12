import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

export type SettingsNavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
};

export type NavItem = {
    title: string;
    path?: string;
    icon?: LucideIcon | null;
    children?: NavItem[],
    permissions?: string[];
};
