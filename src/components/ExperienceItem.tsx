type Props = {
  role: string;
  company: string;
  period: string;
  bullets?: string[];
};

export function ExperienceItem({ role, company, period, bullets = [] }: Props) {
  return (
    <article
      className={[
        "relative rounded-2xl border p-5 shadow-sm bg-white dark:bg-neutral-900",
        "transition-[transform,box-shadow] duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-0.5 hover:shadow-md",
      ].join(" ")}
    >
      {/* Timeline-Dot & Linie */}
      <span
        aria-hidden="true"
        className="absolute left-[-13px] top-6 h-3 w-3 rounded-full bg-gray-900 dark:bg-gray-100 ring-4 ring-white dark:ring-neutral-900"
      />
      <span
        aria-hidden="true"
        className="absolute left-[-8px] top-10 bottom-[-20px] w-px bg-gray-200 dark:bg-neutral-700"
      />

      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-lg font-semibold leading-tight">{role}</h3>
        <span className="text-gray-500 dark:text-gray-400">·</span>
        <p className="text-sm text-gray-700 dark:text-gray-300">{company}</p>
        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          {period}
        </span>
      </header>

      {bullets.length > 0 && (
        <ul className="mt-3 grid list-disc gap-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
