import { NavItem } from '@/types';
import { FileKeyIcon, LayoutDashboardIcon } from 'lucide-react';

export const navigationMenus: NavItem[] = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboardIcon,
    },
    {
        title: 'Access Management',
        icon: FileKeyIcon,
        children: [
            {
                title: 'Users',
                path: '/users',
            },
            {
                title: 'Roles',
                path: '/roles',
            },
        ],
    },
];
