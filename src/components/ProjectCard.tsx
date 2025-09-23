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
  const wip = status === "wip";

  return (
    <article
      className={[
        "group rounded-2xl border p-5 shadow-sm",
        "transition-[transform,box-shadow] duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-0.5 hover:shadow-md",
        wip ? "opacity-95" : "",
      ].join(" ")}
    >
      {/* WIP-Badge */}
      <div className="flex items-start gap-3">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        {wip && (
          <span
            className="ml-auto inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-200"
            aria-label="Work in progress"
            title="Work in progress"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
            In Progress
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{desc}</p>

      {/* Tech-Stack Chips */}
      {stack?.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {stack.map((s) => (
            <li
              key={s}
              className="rounded-md border px-2 py-0.5 text-xs text-gray-700 dark:text-gray-200"
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        {/* Live */}
        {live ? (
          <a
            className="btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-100"
            href={live}
            target="_blank"
            rel="noreferrer"
          >
            Live
          </a>
        ) : (
          <button
            className="btn cursor-not-allowed opacity-60"
            aria-disabled="true"
            title="Not available yet"
            type="button"
          >
            Live
          </button>
        )}

        {/* Repo */}
        {repo ? (
          <a
            className="btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-100"
            href={repo}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        ) : (
          <button
            className="btn cursor-not-allowed opacity-60"
            aria-disabled="true"
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
