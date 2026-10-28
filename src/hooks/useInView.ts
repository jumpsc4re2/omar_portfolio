import { useEffect, useState, type RefObject } from "react";

type Options = {
  rootMargin?: string;
  /** Stop observing after the element first enters the viewport. */
  once?: boolean;
};

export function useInView(ref: RefObject<Element | null>, { rootMargin = "0px", once = false }: Options = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}
