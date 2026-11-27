import { useState } from "react";
import { Search, X } from "lucide-react";
import { Avatar, Badge, Empty, Modal, Field, Select, Textarea, enumOptions } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { fmtDateTime, label } from "@/Helpers/formatters";
import { TICKET_STATUSES, TICKET_PRIORITIES } from "@/constants";

const MOCK = [
  { id:"t1", subject:"Cannot add new employees",     tenant:"Nexus Realty",        status:"open",        priority:"high",   created_at:"2026-11-26T09:00:00Z", body:"When I try to add a new employee, the form throws an error 500." },
  { id:"t2", subject:"Invoice shows wrong amount",   tenant:"Bright Motors",       status:"in_progress", priority:"medium", created_at:"2026-11-25T14:00:00Z", body:"Invoice #inv2 shows $149 but we're on the Starter plan." },
  { id:"t3", subject:"Facebook integration not syncing", tenant:"Global Fin",      status:"open",        priority:"urgent", created_at:"2026-11-25T10:00:00Z", body:"Leads from Facebook Ads stopped coming through since yesterday." },
  { id:"t4", subject:"Need to export all leads",     tenant:"PrimeCare Health",    status:"resolved",    priority:"low",    created_at:"2026-11-20T08:00:00Z", body:"We need a CSV export of all leads from the past year." },
  { id:"t5", subject:"Password reset not working",   tenant:"ClearPath Advisors",  status:"closed",      priority:"medium", created_at:"2026-11-18T11:00:00Z", body:"Clicking reset password does not send an email." },
];

export default function Support() {
  const [q, setQ]           = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState(null);

  const list = MOCK.filter((t) =>
    (!q      || t.subject.toLowerCase().includes(q.toLowerCase()) || t.tenant.toLowerCase().includes(q.toLowerCase())) &&
    (!status || t.status === status)
  );

  const open = MOCK.filter((t) => t.status === "open").length;

  return (
    <div className="space-y-6">
      <SchoolHeader
        moduleKey="support"
        title="Support"
        subtitle={`${MOCK.length} tickets · ${open} open`}
      />

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search tickets…" className="input py-2 pl-9" />
          {q && <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"><X size={14} /></button>}
        </div>
        <select className="input w-auto py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {TICKET_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
        </select>
      </div>

      <div className="card overflow-hidden">
        {list.length === 0 ? <Empty title="No tickets found" /> : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr><th>Subject</th><th>Tenant</th><th>Priority</th><th>Status</th><th>Created</th><th></th></tr>
              </thead>
              <tbody>
                {list.map((t) => (
                  <tr key={t.id}>
                    <td className="font-semibold text-ink max-w-[240px] truncate">{t.subject}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Avatar name={t.tenant} size={26} />
                        <span className="text-[13px]">{t.tenant}</span>
                      </div>
                    </td>
                    <td><Badge value={t.priority} /></td>
                    <td><Badge value={t.status} /></td>
                    <td className="text-[13px] text-slate-500">{fmtDateTime(t.created_at)}</td>
                    <td>
                      <button className="btn-ghost py-1 px-3 text-[13px]" onClick={() => setSelected(t)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Ticket detail */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Support ticket" wide>
        {selected && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge value={selected.priority} />
              <Badge value={selected.status} />
              <span className="text-[13px] text-slate-500">{fmtDateTime(selected.created_at)}</span>
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400">From</p>
              <div className="mt-1 flex items-center gap-2">
                <Avatar name={selected.tenant} size={28} />
                <span className="font-semibold text-ink">{selected.tenant}</span>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Message</p>
              <p className="mt-1 text-sm text-slate-700 leading-relaxed">{selected.body}</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setSelected(null); }} className="space-y-3 border-t border-mist-2 pt-4">
              <Field label="Reply">
                <Textarea placeholder="Type your reply…" rows={4} />
              </Field>
              <div className="flex items-center gap-3">
                <Select
                  value={selected.status}
                  onChange={(e) => setSelected({ ...selected, status: e.target.value })}
                  options={enumOptions(TICKET_STATUSES)}
                />
                <button type="submit" className="btn-primary">Send reply & update status</button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
