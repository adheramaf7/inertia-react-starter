import { Link, router } from '@inertiajs/react';
import {
    LogOut,
    LucideIcon,
    Monitor,
    Moon,
    PaletteIcon,
    Settings,
    Sun,
} from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';
import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import AppearanceToggleTab from './appearance-tabs';

type Props = {
    user: User;
};


export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                render={
                    <Link
                        className="block w-full cursor-pointer"
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings />
                        Settings
                    </Link>
                }
            ></DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <PaletteIcon /> Theme
                </div>
                <div>
                    <AppearanceToggleTab iconOnly size="small" />
                </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                render={
                    <Link
                        className="block w-full cursor-pointer text-destructive"
                        href={logout()}
                        as="button"
                        onClick={handleLogout}
                        data-test="logout-button"
                    >
                        <LogOut className="mr-2" />
                        Log out
                    </Link>
                }
            ></DropdownMenuItem>
        </DropdownMenuGroup>
    );
}
