import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import roles from '@/routes/roles';
import { Link, router, useForm } from '@inertiajs/react';
import { EditIcon, MoreHorizontalIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

export function ActionColumn({
    role,
}: {
    role: App.Data.Resources.RoleResourceData;
}) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const deleteForm = useForm();

    const handleDelete = () => {
        deleteForm.delete(roles.destroy(role.id).url, {
            preserveScroll: true,
            onSuccess: () => setDeleteDialogOpen(false),
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button variant="ghost">
                            <MoreHorizontalIcon />
                        </Button>
                    }
                />
                <DropdownMenuContent>
                    <DropdownMenuItem
                        render={
                            <Link href={roles.edit({ id: role.id })}>
                                <EditIcon /> Edit
                            </Link>
                        }
                    ></DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        <Trash2Icon /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <Trash2Icon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Delete Role?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Are you sure you want
                            to continue?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteForm.processing}
                        >
                            {deleteForm.processing ? (
                                <>
                                    <Spinner /> Processing{' '}
                                </>
                            ) : (
                                'Delete'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
