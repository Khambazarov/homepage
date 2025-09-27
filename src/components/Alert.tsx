type AlertProps = {
  kind: "success" | "error" | "info";
  children: React.ReactNode;
  onClose?: () => void;
};

export function Alert({ kind, children, onClose }: AlertProps) {
  const tone =
    kind === "success"
      ? "border-green-600 text-green-700 dark:text-green-400"
      : kind === "error"
      ? "border-red-600 text-red-700 dark:text-red-400"
      : "border-blue-600 text-blue-700 dark:text-blue-400";

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "mb-3 rounded-2xl border-4 px-4 py-6 shadow-sm",
        "bg-white dark:bg-neutral-900",
        tone,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true">ℹ️</span>
        <div className="text-sm leading-relaxed">{children}</div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto btn btn-outline px-2 py-1 text-xs"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
