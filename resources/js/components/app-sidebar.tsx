import { Link } from '@inertiajs/react';
import {
    BellDotIcon,
    BellOffIcon,
    CheckCheckIcon,
    KeyIcon,
    LayoutGrid,
    SearchIcon,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import { home } from '@/routes';
import { SidebarNavMenu } from './sidebar-nav-menu';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { Kbd, KbdGroup } from './ui/kbd';
import { Button } from './ui/button';
import App from '@/actions/App';
import { AppSearchDialog } from './app-search-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Badge } from './ui/badge';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from './ui/empty';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
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
