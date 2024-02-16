import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTraslations } from '@/Contexts/TranslationsContext';
import { Button, Input, Label } from '@/Components/ui';
import { InputError } from '@/Components';
import { useForm } from '@inertiajs/react';

export default function Edit({ auth, location }) {
    const { __ } = useTraslations();
    const { data, setData, patch, processing, errors } = useForm({
        line_of_business: location.line_of_business,
        aisle: location.aisle,
        code: location.code,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('locations.update', location.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} title={`${__('Edit')}  ${__('Locations')}`}>
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-6 lg:col-span-3">
                            <Label htmlFor="line_of_business">{__('Line of business')}</Label>

                            <Input
                                id="line_of_business"
                                name="line_of_business"
                                value={data.line_of_business}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('line_of_business', e.target.value)}
                            />

                            <InputError message={__(errors.line_of_business)} className="mt-2" />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="aisle">{__('Aisle')}</Label>

                            <Input
                                id="aisle"
                                name="aisle"
                                value={data.aisle}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('aisle', e.target.value)}
                            />

                            <InputError message={__(errors.aisle)} className="mt-2" />
                        </div>

                        <div className="col-span-4 lg:col-span-2">
                            <Label htmlFor="code">{__('Code')}</Label>

                            <Input
                                id="code"
                                name="code"
                                value={data.code}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('code', e.target.value)}
                            />

                            <InputError message={__(errors.code)} className="mt-2" />
                        </div>
                    </div>
                    <div className="mt-6" disabled={processing}>
                        <Button>{__('Save')}</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
