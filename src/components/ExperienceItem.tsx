type Props = {
  role: string;
  company: string;
  period: string;
  bullets?: string[];
};

export function ExperienceItem({ role, company, period, bullets = [] }: Props) {
  return (
    <article className="rounded-2xl border p-5 shadow-sm">
      <header className="flex flex-col md:flex-row md:items-baseline md:gap-3">
        <h3 className="text-lg font-semibold">{role}</h3>
        <span className="text-gray-500 dark:text-gray-400">{company}</span>
        <span className="md:ml-auto text-sm text-gray-500 dark:text-gray-400">
          {period}
        </span>
      </header>
      {bullets.length > 0 && (
        <ul className="mt-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
