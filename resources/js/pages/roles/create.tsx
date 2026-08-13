import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import roles from '@/routes/roles';
import { Head, Link, useForm } from '@inertiajs/react';
import { SubmitEvent } from 'react';
import { type RoleFormField, RoleForm } from './form';
import { Spinner } from '@/components/ui/spinner';

type Permission = App.Data.Resources.PermissionResourceData;

type Props = {
    permissions: Permission[];
};

export default function RoleCreatePage({ permissions }: Props) {
    const form = useForm<RoleFormField>('post', roles.store().url, {
        name: '',
        permissions: [],
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        form.submit();
    };

    return (
        <>
            <Head title="Create Role" />

            <Heading
                title="Create Role"
                description="Create a new role and assign permissions to define its access level."
            />

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardContent>
                        <RoleForm form={form} permissions={permissions} />
                    </CardContent>
                    <CardFooter className="space-x-2">
                        <Button type="submit" disabled={form.processing}>
                            {form.processing ? (
                                <>
                                    <Spinner /> Processing{' '}
                                </>
                            ) : (
                                'Create Role'
                            )}
                        </Button>
                        <Button
                            variant={'outline'}
                            nativeButton={false}
                            render={<Link href={roles.index()}>Cancel</Link>}
                        />
                    </CardFooter>
                </Card>
            </form>
        </>
    );
}

RoleCreatePage.layout = {
    breadcrumbs: [
        {
            title: 'Access Management',
            href: '#',
        },
        {
            title: 'Roles',
            href: roles.index(),
        },
        {
            title: 'Create Role',
            href: '#',
        },
    ],
};
