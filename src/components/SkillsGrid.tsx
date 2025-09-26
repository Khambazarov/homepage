type Category = { name: string; items: string[] };
export function SkillsGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <section
          key={cat.name}
          className="rounded-2xl border p-5 shadow-sm bg-white dark:bg-neutral-900"
          aria-labelledby={`skill-${slugify(cat.name)}`}
        >
          <h3
            id={`skill-${slugify(cat.name)}`}
            className="text-base font-semibold text-gray-900 dark:text-gray-100"
          >
            {cat.name}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {cat.items.map((it) => (
              <li key={it}>
                <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs text-gray-700 dark:text-gray-200">
                  {it}
                </span>
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
