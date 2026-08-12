import { NavItem } from '@/types/navigation.js';
import type { Auth } from '../types/auth.js';

type MenuFilterContext = Pick<Auth, 'permissions' | 'user'>;

function hasPermissionAccess(
    item: NavItem,
    permissions: Auth['permissions'],
    isSuperAdmin: boolean,
): boolean {
    if (isSuperAdmin) {
        return true;
    }

    if (!item.permissions || item.permissions.length === 0) {
        return true;
    }

    return item.permissions.some((permission) =>
        permissions?.includes(permission),
    );
}

function canAccessMenuItem(
    item: NavItem,
    { permissions, user }: MenuFilterContext,
): boolean {
    return hasPermissionAccess(item, permissions, user.isSuperadmin);
}

export function filterNavigationMenu(
    items: NavItem[],
    context: MenuFilterContext,
): NavItem[] {
    return items.reduce<NavItem[]>((filteredItems, item) => {
        if (item.children && item.children.length > 0) {
            const filteredChildren = filterNavigationMenu(
                item.children,
                context,
            );

            if (filteredChildren.length > 0) {
                filteredItems.push({
                    ...item,
                    children: filteredChildren,
                });

                return filteredItems;
            }
        }

        if (item.path && canAccessMenuItem(item, context)) {
            filteredItems.push(item);
        }

        return filteredItems;
    }, []);
}
