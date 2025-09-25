type Props = {
  title: string;
  desc: string;
  stack: string[];
  live?: string;
  repo?: string;
  status?: "live" | "wip";
};

export function ProjectCard({
  title,
  desc,
  stack,
  live,
  repo,
  status = "live",
}: Props) {
  const isWip = status === "wip";
  const hasLive = Boolean(live);
  const hasRepo = Boolean(repo);

  return (
    <article
      className={[
        "rounded-2xl border p-5 shadow-sm bg-white dark:bg-neutral-900",
        "transition-[transform,box-shadow] duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-0.5 hover:shadow-md",
        isWip ? "opacity-95" : "",
      ].join(" ")}
      aria-labelledby={`project-${slugify(title)}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <h3
          id={`project-${slugify(title)}`}
          className="text-xl font-semibold leading-tight"
        >
          {title}
        </h3>

        {/* Status-Badge rechtsbündig */}
        <div className="ml-auto">
          <StatusBadge isWip={isWip} />
        </div>
      </div>

      {/* Beschreibung */}
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{desc}</p>

      {/* Tech-Badges (max. 8 sichtbar, Rest zusammengefasst) */}
      <TechBadges items={stack} className="mt-3" maxVisible={8} />

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-3">
        {/* Live */}
        {hasLive ? (
          <a
            className="btn border-gray-900 dark:border-gray-200"
            href={live}
            target="_blank"
            rel="noreferrer"
            title="Open live demo"
          >
            Live
          </a>
        ) : (
          <ButtonDisabled
            label="Live"
            reason={isWip ? "Work in progress" : "Not available"}
          />
        )}

        {/* Repo */}
        {hasRepo ? (
          <a
            className="btn"
            href={repo}
            target="_blank"
            rel="noreferrer"
            title="Open GitHub repository"
          >
            GitHub
          </a>
        ) : (
          <ButtonDisabled
            label="GitHub"
            reason={isWip ? "Work in progress" : "Not available"}
          />
        )}
      </div>
    </article>
  );
}

/* ------------ Subcomponents ------------ */

function StatusBadge({ isWip }: { isWip: boolean }) {
  if (!isWip) {
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-200"
        aria-label="Status: Live"
        title="Status: Live"
      >
        <span
          className="h-1.5 w-1.5 rounded-full bg-green-500"
          aria-hidden="true"
        />
        Live
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-200"
      aria-label="Status: Work in progress"
      title="Status: Work in progress"
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse motion-reduce:animate-none"
        aria-hidden="true"
      />
      In&nbsp;Progress
    </span>
  );
}

function TechBadges({
  items,
  className,
  maxVisible = 8,
}: {
  items: string[];
  className?: string;
  maxVisible?: number;
}) {
  const visible = items.slice(0, maxVisible);
  const hidden = items.slice(maxVisible);
  return (
    <div
      className={["flex flex-wrap gap-2", className].filter(Boolean).join(" ")}
    >
      {visible.map((it) => (
        <span
          key={it}
          className="rounded-md border px-2 py-0.5 text-xs text-gray-700 dark:text-gray-200"
        >
          {it}
        </span>
      ))}
      {hidden.length > 0 && (
        <span
          className="rounded-md border px-2 py-0.5 text-xs text-gray-700 dark:text-gray-200"
          title={hidden.join(", ")}
          aria-label={`More: ${hidden.join(", ")}`}
        >
          +{hidden.length} more
        </span>
      )}
    </div>
  );
}

function ButtonDisabled({ label, reason }: { label: string; reason: string }) {
  return (
    <button
      type="button"
      className="btn opacity-60 cursor-not-allowed"
      aria-disabled="true"
      title={reason}
    >
      {label}
    </button>
  );
}

/* ------------ Utils ------------ */

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
