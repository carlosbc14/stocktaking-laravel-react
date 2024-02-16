import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTraslations } from '@/Contexts/TranslationsContext';
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    buttonVariants,
} from '@/Components/ui';
import { Link } from '@inertiajs/react';

export default function Index({ auth, locations }) {
    const { __ } = useTraslations();

    return (
        <AuthenticatedLayout user={auth.user} title={__('Warehouse Locations')}>
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div className="flex justify-end mb-6">
                    <Link href={route('locations.create')}>
                        <Button>
                            {__('Add')} {__('Locations')}
                        </Button>
                    </Link>
                </div>
                <Table>
                    {!locations.length && <TableCaption>{__('No Content')}</TableCaption>}
                    <TableHeader>
                        <TableRow>
                            <TableHead>{__('Line of business')}</TableHead>
                            <TableHead>{__('Aisle')}</TableHead>
                            <TableHead className="w-28">{__('Code')}</TableHead>
                            <TableHead className="w-56">{__('Options')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {locations.map((lctn) => (
                            <TableRow key={lctn.id}>
                                <TableCell>{lctn.line_of_business}</TableCell>
                                <TableCell>{lctn.aisle}</TableCell>
                                <TableCell className="font-medium">{lctn.code}</TableCell>
                                <TableCell>
                                    <Link href={route('locations.edit', lctn.id)}>
                                        <Button className="mr-2">{__('Edit')}</Button>
                                    </Link>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive">{__('Delete')}</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    {__('Are you sure you want to delete the location :code?', {
                                                        code: lctn.code,
                                                    })}
                                                </DialogTitle>
                                            </DialogHeader>

                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">{__('Cancel')}</Button>
                                                </DialogClose>
                                                <Link
                                                    href={route('locations.destroy', lctn.id)}
                                                    method="delete"
                                                    as="Button"
                                                    className={buttonVariants({ variant: 'destructive' })}
                                                >
                                                    {__('Delete')}
                                                </Link>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AuthenticatedLayout>
    );
}
