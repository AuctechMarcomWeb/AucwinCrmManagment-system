/**
 * AppFooter — slim bottom bar inside the main content area.
 */
export function AppFooter() {
  return (
    <footer className="border-t border-mist-2 px-7 py-4 text-center text-xs text-slate-400">
      © {new Date().getFullYear()} AucWin Platform · All rights reserved ·{" "}
      <a href="mailto:support@aucwin.com" className="hover:underline text-teal-600">
        support@aucwin.com
      </a>
    </footer>
  );
}
