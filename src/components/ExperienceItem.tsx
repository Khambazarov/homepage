import { useEffect, useState } from "react";

type Props = {
  role: string;
  company: string;
  period: string; // z.B. "2024 — heute"
  bullets?: string[];
  companyUrl?: string;
  location?: string;
  /** Wie viele Bullet-Points auf Mobile initial sichtbar sind */
  maxBulletsMobile?: number;
};

export function ExperienceItem({
  role,
  company,
  period,
  bullets = [],
  companyUrl,
  location,
  maxBulletsMobile = 1,
}: Props) {
  const titleId = `exp-${slugify(`${role}-${company}-${period}`)}`;

  // Mobile-Erkennung für das Collapsing der Bullets
  const [isMobile, setIsMobile] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsMobile(!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const visibleBullets =
    isMobile && !expanded ? bullets.slice(0, maxBulletsMobile) : bullets;
  const hasHidden = isMobile && bullets.length > visibleBullets.length;

  return (
    <article
      className="
        rounded-2xl border p-4 md:p-5 shadow-sm bg-white dark:bg-neutral-900
        transition-[transform,box-shadow] duration-200 ease-out
        hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none
      "
      aria-labelledby={titleId}
    >
      <header className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3
          id={titleId}
          className="text-base md:text-lg font-semibold leading-tight"
        >
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

        <time className="ml-auto text-xs md:text-sm text-gray-500 dark:text-gray-400">
          {period}
        </time>
      </header>

      {bullets.length > 0 && (
        <>
          <ul
            role="list"
            className="mt-3 md:mt-3.5 space-y-1.5 md:space-y-2 text-sm md:text-[0.95rem] text-gray-700 dark:text-gray-300"
          >
            {visibleBullets.map((b) => (
              <li key={b} role="listitem" className="list-disc ms-5">
                {b}
              </li>
            ))}
          </ul>

          {hasHidden && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="text-sm inline-flex items-center gap-1 rounded-lg px-2 py-1 border hover:bg-gray-50 dark:hover:bg-neutral-800"
                aria-expanded={expanded}
                aria-controls={`${titleId}-more`}
              >
                {expanded
                  ? "Show less"
                  : `Show ${bullets.length - visibleBullets.length} more`}
                <ChevronDown
                  className={expanded ? "rotate-180 transition" : "transition"}
                />
              </button>
            </div>
          )}
        </>
      )}
    </article>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={["w-4 h-4", className].join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
