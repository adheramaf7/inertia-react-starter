import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@/components/ui/sidebar';
import { home } from '@/routes';
import { SidebarNavMenu } from './sidebar-nav-menu';
import { AppSearchDialog } from './app-search-dialog';
import { AppNotification } from './app-notification';

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="mb-2">
                <div className="flex items-center">
                    <Link
                        href={home()}
                        className="mb-2 flex items-center"
                        prefetch
                    >
                        <AppLogo />
                    </Link>
                    <AppNotification />
                </div>
                <AppSearchDialog />
            </SidebarHeader>

            <SidebarContent>
                <SidebarNavMenu />
                {/*<NavMain items={mainNavItems} />*/}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
