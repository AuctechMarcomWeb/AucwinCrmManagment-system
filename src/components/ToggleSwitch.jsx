import clsx from "clsx";

/**
 * ToggleSwitch — accessible on/off toggle.
 *
 * @param {{ checked: boolean, onChange: (v: boolean) => void, label?: string, disabled?: boolean }} props
 */
export function ToggleSwitch({ checked, onChange, label, disabled = false }) {
  return (
    <label className={clsx("inline-flex cursor-pointer items-center gap-3", disabled && "opacity-50 cursor-not-allowed")}>
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => { if (!disabled && (e.key === " " || e.key === "Enter")) { e.preventDefault(); onChange(!checked); } }}
        onClick={() => !disabled && onChange(!checked)}
        className={clsx(
          "relative h-6 w-11 rounded-full transition-colors duration-200",
          checked ? "bg-teal-500" : "bg-mist-3",
        )}
      >
        <span
          className={clsx(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
            checked ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </div>
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
    </label>
  );
}
