import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_THRESHOLD = [0, 0.25, 0.5, 0.75, 1] as const;

// Overloads: Offset in px ODER Options-Objekt
export function useScrollSpy(ids: string[], offset?: number): string | null;
export function useScrollSpy(
  ids: string[],
  options?: Partial<IntersectionObserverInit>
): string | null;

export function useScrollSpy(
  ids: string[],
  second?: number | Partial<IntersectionObserverInit>
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Optionen stabil ableiten
  const opts = useMemo(() => {
    let rootMargin = "0px 0px -55% 0px";
    let threshold: number | number[] = [...DEFAULT_THRESHOLD];

    if (typeof second === "number") {
      rootMargin = `${-second}px 0px -55% 0px`;
    } else if (second && typeof second === "object") {
      if (second.rootMargin) rootMargin = second.rootMargin;
      if (second.threshold !== undefined) threshold = second.threshold;
    }
    return { rootMargin, threshold };
  }, [second]);

  // IDs → Elemente (stabil, damit ESLint happy ist)
  const elements = useMemo(() => {
    return ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
  }, [ids]);

  useEffect(() => {
    if (elements.length === 0) {
      setActiveId(null);
      return;
    }

    const ioOpts: IntersectionObserverInit = {
      root: null,
      rootMargin: opts.rootMargin,
      threshold: opts.threshold,
    };

    const visibleMap = new Map<Element, number>();

    observerRef.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const ratio = entry.intersectionRatio ?? 0;
        if (ratio > 0) visibleMap.set(entry.target, ratio);
        else visibleMap.delete(entry.target);
      }
      if (visibleMap.size > 0) {
        const topEl = [...visibleMap.entries()].sort(
          (a, b) => b[1] - a[1]
        )[0][0] as HTMLElement;
        const id = topEl.id || null;
        setActiveId((prev) => (prev !== id ? id : prev));
      }
    }, ioOpts);

    const obs = observerRef.current;
    elements.forEach((el) => obs.observe(el));

    return () => {
      obs.disconnect();
      visibleMap.clear();
    };
  }, [elements, opts]); // <- beide sind useMemo-stabil

  return activeId;
}
