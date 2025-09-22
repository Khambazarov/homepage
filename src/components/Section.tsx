import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & { id: string; title?: string };
export const Section = forwardRef<HTMLElement, Props>(({ id, title, className = "", children, ...rest }, ref) => (
  <section id={id} ref={ref} className={`scroll-mt-24 py-16 ${className}`} aria-label={title} {...rest}>
    {title && <h2 className="mb-6 text-3xl font-semibold tracking-tight">{title}</h2>}
    {children}
  </section>
));
Section.displayName = "Section";
