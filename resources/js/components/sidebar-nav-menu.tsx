import { NavItem } from '@/types';
import {
    AccordionMenu,
    AccordionMenuClassNames,
    AccordionMenuGroup,
    AccordionMenuItem,
    AccordionMenuLabel,
    AccordionMenuSub,
    AccordionMenuSubContent,
    AccordionMenuSubTrigger,
} from './ui/accordion-menu';
import { JSX, useCallback, useMemo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { filterNavigationMenu } from '@/lib/filter-navigation-menu';
import { navigationMenus } from '@/lib/navigation-menus';
import { cn } from '@/lib/utils';

export const SidebarNavMenu = () => {
    const page = usePage();
    const { auth } = page.props;
    const filteredMenus = useMemo(
        () => filterNavigationMenu(navigationMenus, auth),
        [auth],
    );

    // Memoize matchPath to prevent unnecessary re-renders
    const matchPath = useCallback(
        (path: string): boolean =>
            path === page.url || (path.length > 1 && page.url.startsWith(path)),
        [page],
    );

    // Global classNames for consistent styling
    const classNames: AccordionMenuClassNames = {
        root: 'space-y-2.5 px-3.5',
        group: 'gap-px',
        label: 'uppercase text-xs font-medium text-muted-foreground pt-2.25 pb-px',
        separator: '',
        item: 'h-10 border-0 hover:bg-transparent border border-transparent text-white/70 hover:text-white data-[selected=true]:text-white data-[selected=true]:bg-primary/70',
        sub: '',
        subTrigger:
            'h-10 border-0 hover:bg-transparent border border-transparent text-white/70 hover:text-white data-[selected=true]:text-white data-[selected=true]:bg-primary/70',
        subContent: 'p-0',
        indicator: '',
    };

    const buildMenu = (items: NavItem[]): JSX.Element[] => {
        return items.map((item: NavItem, index: number) => {
            return buildMenuItemRoot(item, index);
            // if (!item.heading && !item.disabled) {
            // } else {
            //     return <></>;
            // }
        });
    };

    const buildMenuItemRoot = (item: NavItem, index: number): JSX.Element => {
        if (item.children) {
            return (
                <AccordionMenuSub
                    key={index}
                    value={item.path || `root-${index}`}
                >
                    <AccordionMenuSubTrigger className="text-sm font-medium">
                        {item.icon && (
                            <item.icon data-slot="accordion-menu-icon" />
                        )}
                        <span data-slot="accordion-menu-title">
                            {item.title}
                        </span>
                    </AccordionMenuSubTrigger>
                    <AccordionMenuSubContent
                        type="single"
                        collapsible
                        parentValue={item.path || `root-${index}`}
                        className="ps-6"
                    >
                        <AccordionMenuGroup>
                            {buildMenuItemChildren(item.children, 1)}
                        </AccordionMenuGroup>
                    </AccordionMenuSubContent>
                </AccordionMenuSub>
            );
        } else {
            return (
                <AccordionMenuItem
                    key={index}
                    value={item.path || ''}
                    className="text-sm font-medium"
                >
                    <Link href={item.path || '#'}>
                        {item.icon && (
                            <item.icon data-slot="accordion-menu-icon" />
                        )}
                        <span data-slot="accordion-menu-title">
                            {item.title}
                        </span>
                    </Link>
                </AccordionMenuItem>
            );
        }
    };

    const buildMenuItemChildren = (
        items: NavItem[],
        level: number = 0,
    ): JSX.Element[] => {
        return items.map((item: NavItem, index: number) => {
            return buildMenuItemChild(item, index, level);
            // if (!item.heading && !item.disabled) {
            // } else {
            //     return <></>;
            // }
        });
    };

    const buildMenuItemChild = (
        item: NavItem,
        index: number,
        level: number = 0,
    ): JSX.Element => {
        if (item.children) {
            return (
                <AccordionMenuSub
                    key={index}
                    value={item.path || `child-${level}-${index}`}
                >
                    <AccordionMenuSubTrigger className="text-[13px]">
                        item.title
                    </AccordionMenuSubTrigger>
                    <AccordionMenuSubContent
                        type="single"
                        collapsible
                        parentValue={item.path || `child-${level}-${index}`}
                        className={cn('ps-4')}
                    >
                        <AccordionMenuGroup>
                            {buildMenuItemChildren(item.children, level + 1)}
                        </AccordionMenuGroup>
                    </AccordionMenuSubContent>
                </AccordionMenuSub>
            );
        } else {
            return (
                <AccordionMenuItem
                    key={index}
                    value={item.path || ''}
                    className="text-[13px]"
                >
                    <Link href={item.path || '#'}>{item.title}</Link>
                </AccordionMenuItem>
            );
        }
    };

    return (
        <AccordionMenu
            type="single"
            selectedValue={page.url}
            matchPath={matchPath}
            collapsible
            classNames={classNames}
        >
            <AccordionMenuLabel className="text-xs uppercase">
                Navigation Menu
            </AccordionMenuLabel>
            {buildMenu(filteredMenus)}
        </AccordionMenu>
    );
};
