export function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={'rounded border-input text-primary focus:ring-offset-0 focus:ring-0 ' + className}
        />
    );
}
