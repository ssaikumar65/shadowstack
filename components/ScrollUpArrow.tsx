import useScrollToTop from "@/lib/hooks/useScrollToTop";
import { cn } from "@/lib/utils";
import { ArrowUpCircle } from "lucide-react";

const ScrollUpArrow = () => {
  const { visible, scrollToTop } = useScrollToTop();

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full p-1 text-white/80 transition-all cursor-pointer",
        "hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none",
      )}
    >
      <ArrowUpCircle size={40} aria-hidden="true" />
      <span className="sr-only">Scroll to top</span>
    </button>
  );
};

export default ScrollUpArrow;
