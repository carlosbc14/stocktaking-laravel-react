import { Head } from '@inertiajs/react';

export default function Guest({ title, children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <Head title={title} />

            <div className="text-gray-400 text-4xl">
                <strong>
                    Stock<span className="text-primary">taking</span>
                </strong>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
