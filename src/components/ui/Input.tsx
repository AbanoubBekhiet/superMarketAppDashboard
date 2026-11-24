import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, startIcon, containerClassName = '', className = '', id, ...props },
  ref,
) {
  const inputId = id ?? props.name;
  return (
    <label htmlFor={inputId} className={`flex flex-col gap-xs ${containerClassName}`}>
      {label ? <span className="font-label text-label-md text-on-surface">{label}</span> : null}
      <div className="relative flex items-center">
        {startIcon ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute start-3 text-on-surface-subtle flex items-center"
          >
            {startIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-surface border rounded-md py-sm font-body text-body-md text-on-surface placeholder:text-on-surface-subtle focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none ${
            startIcon ? 'ps-10 pe-base' : 'px-md'
          } ${error ? 'border-error' : 'border-outline-subtle'} ${className}`}
          {...props}
        />
      </div>
      {error ? <span className="font-body text-body-sm text-error">{error}</span> : null}
    </label>
  );
});
