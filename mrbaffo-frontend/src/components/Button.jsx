export default function Button({ children, type = "button", variant = "primary", disabled, onClick }) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors duration-150";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
    secondary:
      "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400"
  };

  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${disabledClasses}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
