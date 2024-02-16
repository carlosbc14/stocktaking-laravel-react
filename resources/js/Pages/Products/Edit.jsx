import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTraslations } from '@/Contexts/TranslationsContext';
import { Button, Input, Label } from '@/Components/ui';
import { InputError } from '@/Components';
import { useForm } from '@inertiajs/react';

export default function Edit({ auth, product }) {
    const { __ } = useTraslations();
    const { data, setData, patch, processing, errors } = useForm({
        code_sku: product.code_sku,
        description: product.description,
        institution: product.institution,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('products.update', product.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} title={`${__('Edit')}  ${__('Products')}`}>
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="code_sku">{__('Code')} SKU</Label>

                            <Input
                                id="code_sku"
                                name="code_sku"
                                value={data.code_sku}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('code_sku', e.target.value)}
                            />

                            <InputError message={__(errors.code_sku)} className="mt-2" />
                        </div>

                        <div className="col-span-4 lg:col-span-2">
                            <Label htmlFor="institution">{__('Institution')}</Label>

                            <Input
                                id="institution"
                                name="institution"
                                value={data.institution}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('institution', e.target.value)}
                            />

                            <InputError message={__(errors.institution)} className="mt-2" />
                        </div>

                        <div className="col-span-6 lg:col-span-3">
                            <Label htmlFor="description">{__('Description')}</Label>

                            <Input
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('description', e.target.value)}
                            />

                            <InputError message={__(errors.description)} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex mt-6" disabled={processing}>
                        <Button>{__('Save')}</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
