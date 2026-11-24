export interface FilterChipOption<T extends string> {
  value: T;
  label: string;
}

interface FilterChipsProps<T extends string> {
  options: FilterChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
}: FilterChipsProps<T>) {
  return (
    <div className="flex items-center gap-sm flex-wrap">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-base py-xs rounded-full font-label text-label-md transition-colors duration-state-change ${
              active
                ? 'bg-mint-surface border-2 border-primary text-on-mint-surface'
                : 'bg-surface-card border border-outline-subtle text-on-surface-muted hover:border-primary'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
