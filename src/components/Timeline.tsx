import type { ReactNode } from "react";

/** Vertikale Linie links, gleichmäßige Abstände */
export function Timeline({ children }: { children: ReactNode }) {
  return (
    <ol
      role="list"
      className="
        relative ms-5 md:ms-7 space-y-4 md:space-y-6
        before:absolute before:inset-y-0 before:-left-[3px] before:w-px
        before:bg-gray-200 dark:before:bg-neutral-700
      "
    >
      {children}
    </ol>
  );
}

/** Ein einzelner Punkt + linker Innenabstand für den Card-Content */
export function TimelineItem({ children }: { children: ReactNode }) {
  return (
    <li className="relative pl-5 md:pl-7">
      <span
        aria-hidden="true"
        className="
          absolute left-[-7px] md:left-[-9px] top-1/2 -translate-y-1/2
          h-3 w-3 rounded-full bg-gray-900 dark:bg-gray-100
          ring-4 ring-white dark:ring-neutral-900
        "
      />
      {children}
    </li>
  );
}
