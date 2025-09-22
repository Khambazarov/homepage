type Category = { name: string; items: string[] };

type Props = {
  categories: Category[];
};

export function SkillsGrid({ categories }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {categories.map((cat) => (
        <section key={cat.name} className="rounded-2xl border p-5 shadow-sm">
          <h3 className="text-base font-semibold">{cat.name}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {cat.items.map((item) => (
              <span key={item} className="rounded-xl border px-2 py-1 text-xs">
                {item}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
