import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTraslations } from '@/Contexts/TranslationsContext';
import { Button, Input, Label } from '@/Components/ui';
import { InputError } from '@/Components';
import { useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { __ } = useTraslations();
    const { data, setData, post, processing, errors } = useForm({
        locations: [{ line_of_business: '', aisle: '', code: '' }],
    });

    const handleChange = (index, name, value) => {
        const locations = [...data.locations];

        locations[index][name] = value;

        setData('locations', locations);
    };

    const addLocation = () => {
        setData('locations', [...data.locations, { line_of_business: '', aisle: '', code: '' }]);
    };

    const removeLocation = (index) => {
        const locations = [...data.locations];

        locations.splice(index, 1);

        setData('locations', locations);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('locations.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} title={`${__('Add')}  ${__('Locations')}`}>
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <form onSubmit={submit}>
                    {data.locations.map((lctn, i) => (
                        <div className="mb-6" key={i}>
                            <div className="grid grid-cols-6 gap-4">
                                <div className="col-span-6 lg:col-span-3">
                                    <Label htmlFor="line_of_business">{__('Line of business')}</Label>

                                    <Input
                                        name="line_of_business"
                                        value={lctn.line_of_business}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleChange(i, 'line_of_business', e.target.value)}
                                    />

                                    <InputError
                                        message={__(errors[`locations.${i}.line_of_business`])}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label htmlFor="aisle">{__('Aisle')}</Label>

                                    <Input
                                        name="aisle"
                                        value={lctn.aisle}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleChange(i, 'aisle', e.target.value)}
                                    />

                                    <InputError message={__(errors[`locations.${i}.aisle`])} className="mt-2" />
                                </div>

                                <div className="col-span-4 lg:col-span-2">
                                    <Label htmlFor="code">{__('Code')}</Label>

                                    <Input
                                        name="code"
                                        value={lctn.code}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleChange(i, 'code', e.target.value)}
                                    />

                                    <InputError message={__(errors[`locations.${i}.code`])} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex justify-end mt-2">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => removeLocation(i)}
                                    disabled={data.locations.length === 1}
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
                        <Button type="button" className="ml-auto" onClick={addLocation}>
                            {__('Add')}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
