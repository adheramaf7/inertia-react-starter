import {
    CalculatorIcon,
    CalendarIcon,
    CreditCardIcon,
    SearchIcon,
    SettingsIcon,
    SmileIcon,
    UserIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import { Kbd, KbdGroup } from './ui/kbd';
import { createContext, useContext, useState } from 'react';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from './ui/command';

type SearchDialogContextValue = {
    open: boolean;
    openDialog: () => void;
    setOpen: (open: boolean) => void;
};

const SearchDialogContext = createContext<SearchDialogContextValue | null>(
    null,
);

export function SearchDialogProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <SearchDialogContext.Provider
            value={{ open, openDialog: () => setOpen(true), setOpen }}
        >
            {children}
        </SearchDialogContext.Provider>
    );
}

export function useSearchDialog() {
    const context = useContext(SearchDialogContext);

    if (!context) {
        throw new Error(
            'useSearchDialog must be used within a SearchDialogProvider',
        );
    }

    return context;
}

export function AppSearchDialog() {
    const { open, openDialog, setOpen } = useSearchDialog();

    return (
        <>
            <Button
                type="button"
                size="sm"
                variant={'outline'}
                className={
                    'flex items-center border-none bg-gray-600/40 hover:bg-gray-600/30'
                }
                onClick={() => openDialog()}
            >
                <div className="flex items-center gap-1.5 text-xs tracking-wide text-white/90">
                    <SearchIcon className="text-white/60" />
                    Search...
                </div>
                <KbdGroup className="ml-auto">
                    <Kbd className="bg-gray-600/70 text-white/90">Ctrl K</Kbd>
                </KbdGroup>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command className="**:data-[selected=true]:bg-muted **:data-selected:bg-transparent">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <CommandItem>
                                <CalendarIcon />
                                <span>Calendar</span>
                            </CommandItem>
                            <CommandItem>
                                <SmileIcon />
                                <span>Search Emoji</span>
                            </CommandItem>
                            <CommandItem>
                                <CalculatorIcon />
                                <span>Calculator</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem>
                                <UserIcon />
                                <span>Profile</span>
                                <CommandShortcut>⌘P</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <CreditCardIcon />
                                <span>Billing</span>
                                <CommandShortcut>⌘B</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <SettingsIcon />
                                <span>Settings</span>
                                <CommandShortcut>⌘S</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    );
}
