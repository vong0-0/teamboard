import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  count?: number;
  max?: number;
  children: ReactNode;
};

export function FormField({
  label,
  htmlFor,
  required = false,
  error,
  count,
  max,
  children,
}: FormFieldProps) {
  return (
    <div className="min-w-0 space-y-1">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={htmlFor} className="label text-[9px]">
          {label} {required ? <span className="text-accent">*</span> : null}
        </label>
        {count !== undefined && max !== undefined ? (
          <span className="font-mono text-[8px] text-gray-500 tabular-nums">
            {count} / {max}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p className="text-accent text-[10px] leading-tight">{error}</p>
      ) : null}
    </div>
  );
}
