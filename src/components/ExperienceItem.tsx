type Props = {
  role: string;
  company: string;
  period: string;
  bullets?: string[];
  companyUrl?: string;
  location?: string;
};

export function ExperienceItem({
  role,
  company,
  period,
  bullets = [],
  companyUrl,
  location,
}: Props) {
  const titleId = `exp-${slugify(`${role}-${company}-${period}`)}`;

  return (
    <article
      className={[
        "relative rounded-2xl border p-5 shadow-sm bg-white dark:bg-neutral-900",
        "transition-[transform,box-shadow] duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-0.5 hover:shadow-md",
      ].join(" ")}
      aria-labelledby={titleId}
    >
      {/* Timeline (nur >= md) */}
      <span
        aria-hidden="true"
        className="hidden md:block absolute left-[-13px] top-6 h-3 w-3 rounded-full bg-gray-900 dark:bg-gray-100 ring-4 ring-white dark:ring-neutral-900"
      />
      <span
        aria-hidden="true"
        className="hidden md:block absolute left-[-8px] top-10 bottom-[-20px] w-px bg-gray-200 dark:bg-neutral-700"
      />

      {/* Header */}
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 id={titleId} className="text-lg font-semibold leading-tight">
          {role}
        </h3>

        <span className="text-gray-500 dark:text-gray-400">·</span>

        {companyUrl ? (
          <a
            href={companyUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-gray-800 dark:text-gray-200 underline-offset-2 hover:underline"
            title={`Open ${company} site in new tab`}
          >
            {company}
          </a>
        ) : (
          <p className="text-sm text-gray-800 dark:text-gray-200">{company}</p>
        )}

        {location && (
          <>
            <span className="text-gray-500 dark:text-gray-400">·</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {location}
            </p>
          </>
        )}

        <time className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          {period}
        </time>
      </header>

      {/* Bullets */}
      {bullets.length > 0 && (
        <ul
          role="list"
          className="mt-3 grid gap-1.5 pl-5 text-sm text-gray-700 dark:text-gray-300 list-disc marker:text-gray-400 dark:marker:text-gray-500"
        >
          {bullets.map((b) => (
            <li key={b} role="listitem">
              {b}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/* ---------------- Utils ---------------- */

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
