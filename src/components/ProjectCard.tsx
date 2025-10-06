import React, { useMemo, useState } from "react";

/* --------------------------------- Types --------------------------------- */

export type ProjectCardProps = {
  title: string;
  desc: string;
  stack: string[];
  live?: string; // wenn fehlt => "Live" disabled
  repo?: string; // wenn fehlt => "GitHub" disabled
  status?: "live" | "wip"; // "wip" zeigt Badge & deaktiviert Live
};

/* ------------------------------- Component ------------------------------- */

export const ProjectCard = React.memo(function ProjectCard({
  title,
  desc,
  stack,
  live,
  repo,
  status = "live",
}: ProjectCardProps) {
  const isWip = status === "wip";

  // Live nur klickbar, wenn NICHT WIP und Link vorhanden
  const liveEnabled = Boolean(live) && !isWip;
  const repoEnabled = Boolean(repo);

  const titleId = `project-${slugify(title)}`;
  const disabledReason = isWip ? "Work in progress" : "Not available";

  return (
    <article
      className={[
        "relative h-full min-h-[280px] flex flex-col rounded-2xl border p-5 shadow-sm",
        "bg-white dark:bg-neutral-900",
        "transition-shadow duration-200 ease-out motion-reduce:transition-none hover:shadow-md",
        isWip ? "opacity-95" : "",
      ].join(" ")}
      aria-labelledby={titleId}
      data-status={status}
    >
      {/* Status-Badge schwebend oben rechts (kleiner als Titelzeile) */}
      <div className="absolute top-3 right-3">
        <StatusBadge isWip={isWip} />
      </div>

      {/* Header */}
      <header className="pr-16">
        <h3 id={titleId} className="text-xl font-semibold leading-tight">
          {title}
        </h3>
      </header>

      {/* Content */}
      <div className="mt-2 flex flex-col gap-3">
        <p className="text-sm text-gray-700 dark:text-gray-300">{desc}</p>

        <TechBadges items={stack} defaultVisible={8} />
      </div>

      {/* Actions */}
      <div className="mt-auto pt-4 flex flex-wrap gap-3">
        {/* Live */}
        {liveEnabled ? (
          <a
            className="btn btn-primary group inline-flex items-center gap-2"
            href={live}
            target="_blank"
            rel="noreferrer noopener"
            title="Open live demo in new tab"
          >
            <span className="inline-flex items-center gap-1">
              Live
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1.5 motion-reduce:transform-none" />
            </span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        ) : (
          <ButtonDisabled label="Live" reason={disabledReason} />
        )}

        {/* GitHub */}
        {repoEnabled ? (
          <a
            className="btn btn-outline group inline-flex items-center gap-2"
            href={repo}
            target="_blank"
            rel="noreferrer noopener"
            title="Open GitHub repository in new tab"
          >
            <span className="inline-flex items-center gap-1">
              GitHub
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1.5 motion-reduce:transform-none" />
            </span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        ) : (
          <ButtonDisabled label="GitHub" reason={disabledReason} />
        )}
      </div>
    </article>
  );
});

/* ------------------------------ Subcomponents ----------------------------- */

function StatusBadge({ isWip }: { isWip: boolean }) {
  if (!isWip) {
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-neutral-900/70 backdrop-blur"
        aria-label="Status: Live"
        title="Status: Live"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
        Live
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-neutral-900/70 backdrop-blur"
      aria-label="Status: Work in progress"
      title="Status: Work in progress"
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse motion-reduce:animate-none"
        aria-hidden
      />
      In Progress
    </span>
  );
}

/* Tech-Badges - Expand/Collapse */
function TechBadges({
  items,
  className,
  defaultVisible = 8,
}: {
  items: string[];
  className?: string;
  defaultVisible?: number;
}) {

  const [expanded, setExpanded] = useState(false);

  const { visible, hidden } = useMemo(() => {
    if (expanded) return { visible: items, hidden: [] as string[] };
    const v = items.slice(0, defaultVisible);
    const h = items.slice(defaultVisible);
    return { visible: v, hidden: h };
  }, [expanded, items, defaultVisible]);

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

      {hidden.length > 0 && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="rounded-md border px-2 py-0.5 text-xs text-gray-700 dark:text-gray-200 underline-offset-2 hover:underline"
          aria-label={`Show ${hidden.length} more technologies`}
        >
          +{hidden.length} more
        </button>
      )}
      {expanded && items.length > defaultVisible && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="rounded-md border px-2 py-0.5 text-xs text-gray-700 dark:text-gray-200 underline-offset-2 hover:underline"
          aria-label="Show fewer technologies"
        >
          − show less
        </button>
      )}
    </div>
  );
}

function ButtonDisabled({ label, reason }: { label: string; reason: string }) {
  const id = `disabled-reason-${slugify(label)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
  return (
    <>
      <span id={id} className="sr-only">
        {reason}
      </span>
      <button
        type="button"
        className="btn btn-primary inline-flex items-center gap-2 opacity-60 cursor-not-allowed"
        aria-disabled="true"
        aria-describedby={id}
        title={reason}
      >
        <span>{label}</span>
        <ArrowRightIcon />
      </button>
    </>
  );
}

/* ---------------------------------- Icons --------------------------------- */

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={["w-5 h-5 stroke-[2.5] text-current", className].join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 12h14" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M13 6l6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------------------------- Utils --------------------------------- */

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
