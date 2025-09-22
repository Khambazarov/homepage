type Props = {
  title: string;
  desc: string;
  stack: string[];
  live?: string;
  repo?: string;
};

export function ProjectCard({ title, desc, stack, live, repo }: Props) {
  return (
    <article className="rounded-2xl border p-5 shadow-sm">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {stack.map((s) => (
          <span key={s} className="rounded-xl border px-2 py-1 text-xs">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        {live && (
          <a className="btn" href={live} target="_blank" rel="noreferrer">
            Live
          </a>
        )}
        {repo && (
          <a className="btn" href={repo} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
      </div>
    </article>
  );
}
