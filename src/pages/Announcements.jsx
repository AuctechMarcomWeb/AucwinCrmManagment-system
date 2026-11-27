import { useState } from "react";
import { Info, AlertTriangle, Wrench, Sparkles, Pin, Plus, Trash2, Edit2 } from "lucide-react";
import clsx from "clsx";
import { Badge, ConfirmDialog, Empty } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { AnnouncementModal } from "@/modals/AnnouncementModal";
import { fmtDateTime, label } from "@/Helpers/formatters";

const TYPE_META = {
  info:        { icon: Info,          bg:"#DBEAFE", color:"#2563EB" },
  warning:     { icon: AlertTriangle, bg:"#FEF3C7", color:"#D97706" },
  maintenance: { icon: Wrench,        bg:"#EDE9FE", color:"#7C3AED" },
  feature:     { icon: Sparkles,      bg:"#DCFCE7", color:"#16A34A" },
};

const MOCK = [
  { id:"a1", title:"Scheduled maintenance – Dec 1 02:00–04:00 UTC", body:"The platform will be in read-only mode during this window. No data loss expected.", type:"maintenance", pinned:true,  created_at:"2026-11-25T10:00:00Z" },
  { id:"a2", title:"New feature: Module Control is live",            body:"Platform admins can now enable/disable individual CRM modules per tenant.",    type:"feature",     pinned:false, created_at:"2026-11-20T09:00:00Z" },
  { id:"a3", title:"Action required: Update payment details",        body:"Some tenants have expiring payment methods. Please follow up before Dec 15.", type:"warning",     pinned:true,  created_at:"2026-11-18T14:00:00Z" },
  { id:"a4", title:"Platform usage report – November",               body:"Monthly usage stats are now available in the dashboard overview.",             type:"info",        pinned:false, created_at:"2026-11-15T08:00:00Z" },
];

export default function Announcements() {
  const [items, setItems]       = useState(MOCK);
  const [showNew, setShowNew]   = useState(false);
  const [editing, setEditing]   = useState(null);
  const [deleting, setDeleting] = useState(null);

  const pinned   = items.filter((a) => a.pinned);
  const unpinned = items.filter((a) => !a.pinned);

  function AnnouncementCard({ a }) {
    const meta = TYPE_META[a.type] ?? TYPE_META.info;
    return (
      <div className={clsx("card p-5 flex gap-4", a.pinned && "ring-2 ring-teal-500/30")}>
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ background: meta.bg, color: meta.color }}>
          <meta.icon size={18} strokeWidth={2.2} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[15px] font-bold text-ink">{a.title}</h3>
            {a.pinned && <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-bold text-teal-700"><Pin size={10} /> Pinned</span>}
            <Badge value={a.type} />
          </div>
          <p className="mt-1 text-[13px] text-slate-600 leading-relaxed">{a.body}</p>
          <p className="mt-2 text-[12px] text-slate-400">{fmtDateTime(a.created_at)}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-1">
          <button className="btn-ghost p-2" onClick={() => setEditing(a)} title="Edit"><Edit2 size={14} /></button>
          <button className="btn-ghost p-2 text-amber-700 hover:bg-amber-50" onClick={() => setDeleting(a.id)} title="Delete"><Trash2 size={14} /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SchoolHeader
        moduleKey="announcements"
        title="Announcements"
        subtitle={`${items.length} announcements · ${pinned.length} pinned`}
        actions={
          <button className="btn-primary" onClick={() => setShowNew(true)}>
            <Plus size={15} /> New announcement
          </button>
        }
      />

      {pinned.length > 0 && (
        <div className="space-y-3">
          <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Pinned</p>
          {pinned.map((a) => <AnnouncementCard key={a.id} a={a} />)}
        </div>
      )}
      {unpinned.length > 0 && (
        <div className="space-y-3">
          {pinned.length > 0 && <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400">All announcements</p>}
          {unpinned.map((a) => <AnnouncementCard key={a.id} a={a} />)}
        </div>
      )}
      {items.length === 0 && <Empty title="No announcements yet" hint="Create one to broadcast to all tenants." />}

      <AnnouncementModal open={showNew} onClose={() => setShowNew(false)}
        onSave={(d) => { console.log("create", d); setShowNew(false); }} />
      <AnnouncementModal open={!!editing} initial={editing ?? {}} onClose={() => setEditing(null)}
        onSave={(d) => { console.log("update", d); setEditing(null); }} />
      <ConfirmDialog open={!!deleting} onClose={() => setDeleting(null)}
        onConfirm={() => { setItems((p) => p.filter((a) => a.id !== deleting)); setDeleting(null); }}
        title="Delete announcement" message="This will remove the announcement for all tenants." />
    </div>
  );
}
