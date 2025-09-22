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
  return (
    <article
      className={`rounded-2xl border p-5 shadow-sm ${
        isWip ? "opacity-95" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        {isWip && (
          <span
            className="ml-auto rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-200"
            aria-label="Work in progress"
            title="Work in progress"
          >
            In&nbsp;Progress…
          </span>
        )}
      </div>

      {/* Beschreibung */}
      <p className="mt-2 text-gray-600 dark:text-gray-300">{desc}</p>

      {/* Tech-Stack */}
      <div className="mt-3 flex flex-wrap gap-2">
        {stack.map((s) => (
          <span key={s} className="rounded-xl border px-2 py-1 text-xs">
            {s}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div className="mt-4 flex gap-3">
        {/* Live */}
        {live ? (
          <a className="btn" href={live} target="_blank" rel="noreferrer">
            Live
          </a>
        ) : (
          <button
            className="btn opacity-60 cursor-not-allowed"
            aria-disabled="true"
            disabled
            title="Not available yet"
            type="button"
          >
            Live
          </button>
        )}

        {/* Repo */}
        {repo ? (
          <a className="btn" href={repo} target="_blank" rel="noreferrer">
            GitHub
          </a>
        ) : (
          <button
            className="btn opacity-60 cursor-not-allowed"
            aria-disabled="true"
            disabled
            title="Not available yet"
            type="button"
          >
            GitHub
          </button>
        )}
      </div>
    </article>
  );
}
