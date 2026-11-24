import { forwardRef, type SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, options, containerClassName = '', className = '', id, ...props },
  ref,
) {
  const selectId = id ?? props.name;
  return (
    <label htmlFor={selectId} className={`flex flex-col gap-xs ${containerClassName}`}>
      {label ? <span className="font-label text-label-md text-on-surface">{label}</span> : null}
      <select
        ref={ref}
        id={selectId}
        className={`w-full bg-surface-card border rounded-md px-md py-xs min-h-[38px] font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none ${
          error ? 'border-error' : 'border-outline-subtle'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? <span className="font-body text-body-sm text-error">{error}</span> : null}
    </label>
  );
});
