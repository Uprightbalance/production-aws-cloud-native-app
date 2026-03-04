export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  textarea = false
}) {
  const baseInputClasses =
    "mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          id={name}
          name={name}
          className={`${baseInputClasses} min-h-[120px] resize-vertical`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={baseInputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
}
