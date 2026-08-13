import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Frame, FrameHeader, FramePanel } from '@/components/ui/frame';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { InertiaPrecognitiveFormProps } from '@inertiajs/react';
import { ChevronRightIcon, SearchIcon, SearchXIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

export type RoleFormField = {
    name: string;
    permissions: string[];
};

export function RoleForm({
    form: { data, setData, errors, invalid },
    permissions,
}: {
    form: InertiaPrecognitiveFormProps<RoleFormField>;
    permissions: App.Data.Resources.PermissionResourceData[];
}) {
    const [searchGroup, setSearchGroup] = useState('');
    const groups = new Set<string>(permissions.map((p) => p.group!));

    const filteredGroups = useMemo(() => {
        if (!searchGroup) return [...groups];
        return [...groups].filter((group) =>
            group.toLowerCase().includes(searchGroup.toLowerCase()),
        );
    }, [groups, searchGroup]);

    const togglePermission = (permission: string) => {
        if (data.permissions.includes(permission)) {
            setData(
                'permissions',
                data.permissions.filter((p) => p !== permission),
            );
        } else {
            setData('permissions', [...data.permissions, permission]);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <Field className="w-full lg:w-[50%]">
                <FieldLabel>Name</FieldLabel>
                <Input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {invalid('name') && <FieldError>{errors.name}</FieldError>}
            </Field>

            <section className="space-y-4">
                <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
                    <div className="flex flex-col">
                        <h3 className="mb-1 font-semibold">
                            Permissions Configuration
                            <Badge
                                size={'sm'}
                                variant={
                                    data.permissions.length === 0
                                        ? 'focus-outline'
                                        : 'primary-outline'
                                }
                                className="ml-2"
                            >
                                {data.permissions.length} permissions assigned
                            </Badge>
                        </h3>
                        <p className="text-2sm text-muted-foreground">
                            Assign permissions to define what this role can
                            access.{' '}
                        </p>
                        {invalid('permissions') && (
                            <InputError
                                className="mt-1.5"
                                message={errors.permissions}
                            />
                        )}
                    </div>
                    <div className="lg:ml-auto">
                        <InputGroup className="w-full lg:max-w-sm">
                            <InputGroupAddon>
                                <SearchIcon />
                            </InputGroupAddon>
                            <InputGroupInput
                                type="search"
                                placeholder="Search group permission"
                                value={searchGroup}
                                onChange={(e) => setSearchGroup(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                </div>
                {filteredGroups.length === 0 && (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <SearchXIcon />
                            </EmptyMedia>
                            <EmptyTitle>No Group Found</EmptyTitle>
                            <EmptyDescription>
                                Try to search with different keyword.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}
                <div className="grid items-start gap-2 lg:grid-cols-3 lg:gap-4">
                    {filteredGroups.map((group) => (
                        <Frame
                            key={group}
                            stacked
                            dense
                            spacing="sm"
                            className="w-full"
                        >
                            <Collapsible
                                defaultOpen
                                className="group/permission-card"
                            >
                                <CollapsibleTrigger className="flex w-full">
                                    <FrameHeader className="flex grow flex-row items-center justify-between gap-2">
                                        <div className="flex items-center font-semibold">
                                            {group}
                                        </div>
                                        <ChevronRightIcon
                                            aria-hidden="true"
                                            className="size-4 text-muted-foreground transition-transform group-data-open/permission-card:rotate-90"
                                        />
                                    </FrameHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <FramePanel className="flex flex-col p-0">
                                        {permissions
                                            .filter((p) => p.group === group)
                                            .map((permission) => (
                                                <FieldLabel
                                                    key={permission.name}
                                                    className="flex w-full items-center justify-between border-b px-4 py-2 last:border-none"
                                                >
                                                    <div>
                                                        <div className="text-2sm">
                                                            {permission.label}
                                                        </div>
                                                        <div className="text-xs font-normal text-muted-foreground">
                                                            {
                                                                permission.description
                                                            }
                                                        </div>
                                                    </div>
                                                    <Checkbox
                                                        checked={data.permissions.includes(
                                                            permission.name,
                                                        )}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) =>
                                                            togglePermission(
                                                                permission.name,
                                                            )
                                                        }
                                                    />
                                                </FieldLabel>
                                            ))}
                                    </FramePanel>
                                </CollapsibleContent>
                            </Collapsible>
                        </Frame>
                    ))}
                </div>
            </section>
        </div>
    );
}
