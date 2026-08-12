import {
    SearchDialogProvider,
    useSearchDialog,
} from '@/components/app-search-dialog';
import { useFlashToast } from '@/hooks/use-flash-toast';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import { useHotkeys } from 'react-hotkeys-hook'

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <SearchDialogProvider>
            <ContentWrapper breadcrumbs={breadcrumbs}>
                {children}
            </ContentWrapper>
        </SearchDialogProvider>
    );
}

function ContentWrapper({
    children,
    breadcrumbs = [],
}: {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}) {
    const { openDialog } = useSearchDialog();
    useFlashToast();

    useHotkeys('mod+k', (event) => {
        event.preventDefault();
        openDialog();
    });

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
}
