import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTraslations } from '@/Contexts/TranslationsContext';
import { Button, Input, Label } from '@/Components/ui';
import { InputError } from '@/Components';
import { useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { __ } = useTraslations();
    const { data, setData, post, processing, errors } = useForm({
        products: [{ code_sku: '', description: '', institution: '' }],
    });

    const handleChange = (index, name, value) => {
        const products = [...data.products];

        products[index][name] = value;

        setData('products', products);
    };

    const addProduct = () => {
        setData('products', [...data.products, { line_of_business: '', aisle: '', code: '' }]);
    };

    const removeProduct = (index) => {
        const products = [...data.products];

        products.splice(index, 1);

        setData('products', products);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('products.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} title={`${__('Add')}  ${__('Products')}`}>
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <form onSubmit={submit}>
                    {data.products.map((prdct, i) => (
                        <div className="mb-6" key={i}>
                            <div className="grid grid-cols-6 gap-4">
                                <div className="col-span-2 lg:col-span-1">
                                    <Label htmlFor="code_sku">{__('Code')} SKU</Label>

                                    <Input
                                        name="code_sku"
                                        value={data.code_sku}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleChange(i, 'code_sku', e.target.value)}
                                    />

                                    <InputError message={__(errors[`products.${i}.code_sku`])} className="mt-2" />
                                </div>

                                <div className="col-span-4 lg:col-span-2">
                                    <Label htmlFor="institution">{__('Institution')}</Label>

                                    <Input
                                        name="institution"
                                        value={data.institution}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleChange(i, 'institution', e.target.value)}
                                    />

                                    <InputError message={__(errors[`products.${i}.institution`])} className="mt-2" />
                                </div>

                                <div className="col-span-6 lg:col-span-3">
                                    <Label htmlFor="description">{__('Description')}</Label>

                                    <Input
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleChange(i, 'description', e.target.value)}
                                    />

                                    <InputError message={__(errors[`products.${i}.description`])} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex justify-end mt-2">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => removeProduct(i)}
                                    disabled={data.products.length === 1}
                                >
                                    {__('Delete')}
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="flex">
                        <Button type="submit" disabled={processing}>
                            {__('Save')}
                        </Button>
                        <Button type="button" className="ml-auto" onClick={addProduct}>
                            {__('Add')}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
