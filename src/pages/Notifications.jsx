import { useState } from "react";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import clsx from "clsx";
import { Empty } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { fmtRelative } from "@/Helpers/formatters";

const MOCK = [
  { id:"n1", title:"Summit Properties subscription expired",   body:"Their renewal date was Nov 11. Consider reaching out.",        read:false, type:"warning", at:"2026-11-26T10:00:00Z" },
  { id:"n2", title:"New support ticket: Facebook integration", body:"Urgent ticket raised by Global Fin Services.",                  read:false, type:"urgent",  at:"2026-11-25T10:00:00Z" },
  { id:"n3", title:"Invoice overdue: ClearPath Advisors",      body:"Invoice INV-004 is now 7 days overdue ($29).",                 read:false, type:"error",   at:"2026-11-24T09:00:00Z" },
  { id:"n4", title:"New tenant registered: BlueSky Logistics", body:"Trial started Nov 15. Auto-expires Dec 15.",                   read:true,  type:"info",    at:"2026-11-15T10:00:00Z" },
  { id:"n5", title:"Monthly report ready",                     body:"November platform usage report is now available on dashboard.", read:true,  type:"info",    at:"2026-11-14T08:00:00Z" },
];

const TYPE_COLOR = {
  urgent:  "bg-red-50 border-red-200",
  error:   "bg-red-50 border-red-200",
  warning: "bg-amber-50 border-amber-200",
  info:    "bg-blue-50 border-blue-200",
};

export default function Notifications() {
  const [items, setItems] = useState(MOCK);

  const unread = items.filter((n) => !n.read).length;

  const markAll   = () => setItems((p) => p.map((n) => ({ ...n, read: true })));
  const markOne   = (id) => setItems((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const removeOne = (id) => setItems((p) => p.filter((n) => n.id !== id));

  return (
    <div className="space-y-6">
      <SchoolHeader
        moduleKey="notifications"
        title="Notifications"
        subtitle={`${unread} unread`}
        actions={
          unread > 0 && (
            <button className="btn-secondary" onClick={markAll}>
              <CheckCheck size={15} /> Mark all read
            </button>
          )
        }
      />

      {items.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mist text-slate-400 mb-4">
            <Bell size={28} />
          </span>
          <p className="font-semibold text-ink">All caught up</p>
          <p className="mt-1 text-sm text-slate-500">No notifications to show.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((n) => (
            <div
              key={n.id}
              className={clsx(
                "flex items-start gap-4 rounded-2xl border p-4 transition",
                n.read ? "border-mist-2 bg-white" : TYPE_COLOR[n.type] ?? "bg-blue-50 border-blue-200"
              )}
            >
              <span className={clsx(
                "mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full",
                n.read ? "bg-slate-200" : "bg-teal-500"
              )} />
              <div className="flex-1 min-w-0">
                <p className={clsx("text-[14px] font-semibold", n.read ? "text-slate-700" : "text-ink")}>{n.title}</p>
                <p className="mt-0.5 text-[13px] text-slate-500">{n.body}</p>
                <p className="mt-1 text-[12px] text-slate-400">{fmtRelative(n.at)}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                {!n.read && (
                  <button className="btn-ghost p-1.5" onClick={() => markOne(n.id)} title="Mark read">
                    <CheckCheck size={14} />
                  </button>
                )}
                <button className="btn-ghost p-1.5 text-amber-700 hover:bg-amber-50"
                  onClick={() => removeOne(n.id)} title="Dismiss">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
