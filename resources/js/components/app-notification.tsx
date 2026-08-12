import { BellDotIcon, BellOffIcon, CheckCheckIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from './ui/empty';

export function AppNotification() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <button className="mb-2 ml-auto cursor-pointer">
                        <BellDotIcon size={16} />
                    </button>
                }
            ></DropdownMenuTrigger>
            <DropdownMenuContent className="flex h-96 w-sm flex-col p-0">
                <div className="flex shrink-0 items-center justify-between border-b px-4 py-2">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        Notifications{' '}
                        <Badge size={'xs'} variant={'invert'}>
                            10
                        </Badge>
                    </div>
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button variant={'ghost'} size={'icon-sm'}>
                                    <CheckCheckIcon />
                                </Button>
                            }
                        />
                        <TooltipContent>Mark all as read</TooltipContent>
                    </Tooltip>
                </div>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <BellOffIcon />
                        </EmptyMedia>
                        <EmptyTitle className="text-sm">
                            No Notifications
                        </EmptyTitle>
                        <EmptyDescription className="max-w-xs text-xs text-pretty">
                            You&apos;re all caught up. New notifications will
                            appear here.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
                {/*<ScrollArea className="min-h-0 grow"></ScrollArea>*/}
                <div className="shrink-0 border-t p-1">
                    <Button variant={'ghost'} className="w-full" size={'sm'}>
                        See all notifications
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
