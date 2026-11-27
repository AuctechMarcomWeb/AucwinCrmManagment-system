import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { format, startOfMonth, endOfMonth, eachDayOfInterval,
         getDay, isSameDay, isToday, addMonths, subMonths } from "date-fns";

/**
 * Calender — a lightweight month-view calendar component.
 *
 * @param {{
 *   events?: Array<{ date: string|Date, label: string, color?: string }>,
 *   onDayClick?: (date: Date) => void,
 * }} props
 */
export function Calender({ events = [], onDayClick }) {
  const [current, setCurrent] = useState(new Date());
  const start  = startOfMonth(current);
  const end    = endOfMonth(current);
  const days   = eachDayOfInterval({ start, end });
  const offset = getDay(start); // 0 = Sun

  const eventsFor = (d) =>
    events.filter((e) => isSameDay(new Date(e.date), d));

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-mist-2 px-5 py-4">
        <button
          onClick={() => setCurrent((c) => subMonths(c, 1))}
          className="btn-ghost p-2"
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <h2 className="text-[16px] font-bold text-ink">
          {format(current, "MMMM yyyy")}
        </h2>
        <button
          onClick={() => setCurrent((c) => addMonths(c, 1))}
          className="btn-ghost p-2"
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 border-b border-mist-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7">
        {/* offset empty cells */}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`e${i}`} className="border-b border-r border-mist p-2 h-20" />
        ))}
        {days.map((d) => {
          const ev = eventsFor(d);
          const today = isToday(d);
          return (
            <div
              key={d.toISOString()}
              className={clsx(
                "relative cursor-pointer border-b border-r border-mist p-2 h-20 transition hover:bg-teal-50/40",
                today && "bg-teal-50/60",
              )}
              onClick={() => onDayClick?.(d)}
            >
              <span
                className={clsx(
                  "flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-semibold",
                  today ? "bg-teal-500 text-white" : "text-slate-700",
                )}
              >
                {format(d, "d")}
              </span>
              <div className="mt-1 space-y-0.5">
                {ev.slice(0, 2).map((e, i) => (
                  <div
                    key={i}
                    className="truncate rounded px-1 py-0.5 text-[10px] font-semibold text-white"
                    style={{ background: e.color ?? "#12ACA2" }}
                  >
                    {e.label}
                  </div>
                ))}
                {ev.length > 2 && (
                  <div className="text-[10px] text-slate-400">+{ev.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
