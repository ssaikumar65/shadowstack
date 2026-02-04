import { useCallback, useEffect, useRef, useState } from "react";

type UseScrollToTopOptions = {
  offset?: number;
  behavior?: ScrollBehavior;
};

const useScrollToTop = (opts: UseScrollToTopOptions = {}) => {
  const { offset = 300, behavior } = opts;
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const finalBehavior: ScrollBehavior =
    behavior ?? (prefersReducedMotion ? "auto" : "smooth");

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      setVisible(window.scrollY > offset);
      ticking.current = false;
    });
  }, [offset]);

  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: finalBehavior });
  }, [finalBehavior]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () =>
      window.removeEventListener("scroll", handleScroll as EventListener);
  }, [handleScroll]);

  return { visible, scrollToTop };
};

export default useScrollToTop;
