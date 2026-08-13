import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardFooter,
    CardHeader,
    CardTable,
} from '@/components/ui/card';
import {
    DataGrid,
    DataGridContainer,
    DataGridFeatures,
    dataGridFeatures,
} from '@/components/ui/data-grid/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid/data-grid-pagination';
import { DataGridScrollArea } from '@/components/ui/data-grid/data-grid-scroll-area';
import { DataGridTable } from '@/components/ui/data-grid/data-grid-table';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import rolesRoute from '@/routes/roles';
import { Head, Link } from '@inertiajs/react';
import {
    ColumnDef,
    PaginationState,
    SortingState,
    useTable,
} from '@tanstack/react-table';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ActionColumn } from './action-column';

type Role = App.Data.Resources.RoleResourceData;

type Props = {
    roles: Role[];
};

export default function RoleIndexPage({ roles }: Props) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'name', desc: false },
    ]);
    const [globalFilter, setGlobalFilter] = useState('');

    const columns = useMemo<ColumnDef<DataGridFeatures, Role>[]>(
        () => [
            {
                accessorKey: 'name',
                header: (info) => (
                    <DataGridColumnHeader column={info.column} title="Name" />
                ),
                size: 250,
                meta: {
                    headerClassName: '',
                    cellClassName: '',
                },
            },
            {
                accessorKey: 'usersCount',
                header: (info) => (
                    <DataGridColumnHeader column={info.column} title="Users" />
                ),
                size: 250,
                meta: {
                    headerClassName: '',
                    cellClassName: '',
                },
            },
            {
                id: 'action',
                size: 50,
                cell: (info) => <ActionColumn role={info.row.original} />,
            },
        ],
        [],
    );

    const table = useTable({
        features: dataGridFeatures,
        columns,
        data: roles,
        state: {
            pagination,
            sorting,
            globalFilter,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <>
            <Head title="Roles" />

            <Heading
                title="Roles"
                description="Manage user roles and their assigned permissions."
            />

            <DataGrid
                table={table}
                recordCount={roles.length || 0}
                tableClassNames={{ header: 'bg-gray-50 dark:bg-gray-600/10' }}
            >
                <Card className="w-full gap-2 py-0">
                    <CardHeader className="px-4 py-4 pb-0">
                        <div className="flex items-center gap-2">
                            <InputGroup className="max-w-xs">
                                <InputGroupInput
                                    type="search"
                                    placeholder="Search..."
                                    value={globalFilter}
                                    onChange={(e) =>
                                        setGlobalFilter(e.target.value)
                                    }
                                />
                                <InputGroupAddon>
                                    <SearchIcon />
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <CardAction>
                            <Button
                                type="button"
                                nativeButton={false}
                                render={
                                    <Link href={rolesRoute.create()}>
                                        <PlusCircleIcon /> New Data
                                    </Link>
                                }
                            ></Button>
                        </CardAction>
                    </CardHeader>
                    <CardTable>
                        <DataGridContainer>
                            <DataGridScrollArea>
                                <DataGridTable />
                            </DataGridScrollArea>
                        </DataGridContainer>
                    </CardTable>
                    <CardFooter className="p-4 pt-1">
                        <DataGridPagination />
                    </CardFooter>
                </Card>
            </DataGrid>
        </>
    );
}

RoleIndexPage.layout = {
    breadcrumbs: [
        {
            title: 'Access Management',
            href: '#',
        },
        {
            title: 'Roles',
            href: '#',
        },
    ],
};
