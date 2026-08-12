import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent
                variant="sidebar"
                className="flex h-svh flex-col overflow-hidden md:h-[calc(100svh-(--spacing(4)))]"
            >
                <div className="sticky top-0 z-10 bg-background">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                </div>
                <ScrollArea className="min-h-0 flex-1 overflow-y-auto">
                    <div className="container mx-auto flex h-full flex-col p-2 pt-4 lg:p-4 lg:pt-6">
                        {children}
                    </div>
                </ScrollArea>
            </AppContent>
        </AppShell>
    );
}
