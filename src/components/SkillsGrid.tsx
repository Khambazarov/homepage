type Category = {
  name: string;
  items: string[];
};

type Props = {
  categories: Category[];
};

export function SkillsGrid({ categories }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <section
          key={c.name}
          className="rounded-2xl border p-4 shadow-sm bg-white dark:bg-neutral-900"
          aria-labelledby={`skills-${slugify(c.name)}`}
        >
          <h3
            id={`skills-${slugify(c.name)}`}
            className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-100 tracking-wide"
          >
            {c.name}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {c.items.map((it) => (
              <li
                key={it}
                className="rounded-md border px-2 py-0.5 text-xs text-gray-700 dark:text-gray-200"
              >
                {it}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
