import { Loader2 } from "lucide-react";
import clsx from "clsx";

/** Inline spinner — centred with py-12. */
export function Spinner({ className }) {
  return (
    <div className={clsx("flex items-center justify-center py-12 text-teal-600", className)}>
      <Loader2 className="animate-spin" size={28} />
    </div>
  );
}

/** Full-screen loading overlay shown while auth initialises. */
export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-ink">
      <img
        src="/brand/aucwin-mark-white.png"
        alt="AucWin"
        className="h-10 w-auto animate-pulse"
        draggable={false}
      />
      <Loader2 className="animate-spin text-teal-400" size={28} />
      <p className="text-sm font-medium text-[#9FB3CC]">Loading platform…</p>
    </div>
  );
}

/** Skeleton block — use inside cards while data loads. */
export function SkeletonLine({ className }) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-lg bg-mist-2",
        className ?? "h-4 w-full",
      )}
    />
  );
}
