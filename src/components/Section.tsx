import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  id: string;
  title?: string;
};

export const Section = forwardRef<HTMLElement, Props>(
  ({ id, title, className = "", children, ...rest }, ref) => {
    // Wenn es eine sichtbare Überschrift gibt, binden wir die Section per aria-labelledby daran.
    const headingId = title ? `${id}-title` : undefined;

    return (
      <section
        id={id}
        ref={ref}
        className={`scroll-mt-20 md:scroll-mt-24 py-12 md:py-16 ${className}`}
        {...(headingId ? { "aria-labelledby": headingId } : {})}
        {...rest} // erlaubt aria-label, role etc. – wird NICHT von aria-labelledby überschrieben
      >
        {title && (
          <h2
            id={headingId}
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-6"
          >
            {title}
          </h2>
        )}
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
