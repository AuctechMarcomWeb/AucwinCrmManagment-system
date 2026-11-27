import { useState } from "react";
import { Search, X } from "lucide-react";
import { Avatar, Badge, Empty } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { ExportButton } from "@/components/ExportButton";
import { fmtDateTime } from "@/Helpers/formatters";

const ACTIONS = ["created", "updated", "deleted", "suspended", "activated", "login", "logout"];
const RESOURCES = ["tenant", "user", "invoice", "plan", "subscription", "announcement"];

const MOCK = [
  { id:"l1",  actor:"Platform Admin", action:"created",   resource:"tenant",       target:"Nexus Realty",        at:"2026-11-26T10:12:00Z", ip:"192.168.1.1" },
  { id:"l2",  actor:"Platform Admin", action:"updated",   resource:"plan",         target:"Growth plan pricing", at:"2026-11-26T09:45:00Z", ip:"192.168.1.1" },
  { id:"l3",  actor:"Platform Admin", action:"suspended", resource:"tenant",       target:"Summit Properties",   at:"2026-11-25T16:30:00Z", ip:"192.168.1.1" },
  { id:"l4",  actor:"Platform Admin", action:"created",   resource:"invoice",      target:"INV-007",             at:"2026-11-25T14:00:00Z", ip:"192.168.1.1" },
  { id:"l5",  actor:"Platform Admin", action:"login",     resource:"user",         target:"admin@aucwin.com",    at:"2026-11-25T09:00:00Z", ip:"203.0.113.5" },
  { id:"l6",  actor:"Platform Admin", action:"deleted",   resource:"announcement", target:"Old maintenance note",at:"2026-11-24T11:20:00Z", ip:"192.168.1.1" },
  { id:"l7",  actor:"Platform Admin", action:"activated", resource:"tenant",       target:"BlueSky Logistics",   at:"2026-11-24T10:00:00Z", ip:"192.168.1.1" },
  { id:"l8",  actor:"Platform Admin", action:"updated",   resource:"subscription", target:"PrimeCare Health",    at:"2026-11-23T15:15:00Z", ip:"192.168.1.1" },
  { id:"l9",  actor:"Platform Admin", action:"created",   resource:"user",         target:"jane@nexusrealty.com",at:"2026-11-22T13:40:00Z", ip:"192.168.1.1" },
  { id:"l10", actor:"Platform Admin", action:"logout",    resource:"user",         target:"admin@aucwin.com",    at:"2026-11-21T18:00:00Z", ip:"192.168.1.1" },
];

const ACTION_COLORS = {
  created:   { bg:"#DCFCE7", color:"#16A34A" },
  updated:   { bg:"#DBEAFE", color:"#2563EB" },
  deleted:   { bg:"#FFE4E6", color:"#E11D48" },
  suspended: { bg:"#FEF3C7", color:"#D97706" },
  activated: { bg:"#DCFCE7", color:"#16A34A" },
  login:     { bg:"#F3E8FF", color:"#7C3AED" },
  logout:    { bg:"#F1F4F8", color:"#64748B" },
};

export default function AuditLog() {
  const [q, setQ]       = useState("");
  const [action, setA]  = useState("");
  const [resource, setR]= useState("");

  const list = MOCK.filter((l) =>
    (!q       || l.target.toLowerCase().includes(q.toLowerCase()) || l.actor.toLowerCase().includes(q.toLowerCase())) &&
    (!action  || l.action   === action) &&
    (!resource|| l.resource === resource)
  );

  return (
    <div className="space-y-6">
      <SchoolHeader
        moduleKey="audit"
        title="Audit Log"
        subtitle={`${MOCK.length} events recorded`}
        actions={<ExportButton data={MOCK} filename="audit-log" />}
      />

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search actor or target…" className="input py-2 pl-9" />
          {q && <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"><X size={14} /></button>}
        </div>
        <select className="input w-auto py-2" value={action} onChange={(e) => setA(e.target.value)}>
          <option value="">All actions</option>
          {ACTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <select className="input w-auto py-2" value={resource} onChange={(e) => setR(e.target.value)}>
          <option value="">All resources</option>
          {RESOURCES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="card overflow-hidden">
        {list.length === 0 ? <Empty title="No events found" /> : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr><th>Actor</th><th>Action</th><th>Resource</th><th>Target</th><th>IP</th><th>Time</th></tr>
              </thead>
              <tbody>
                {list.map((l) => {
                  const ac = ACTION_COLORS[l.action] ?? { bg:"#F1F4F8", color:"#64748B" };
                  return (
                    <tr key={l.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <Avatar name={l.actor} size={26} />
                          <span className="text-[13px] font-medium">{l.actor}</span>
                        </div>
                      </td>
                      <td>
                        <span className="rounded-full px-2.5 py-0.5 text-[12px] font-bold"
                          style={{ background: ac.bg, color: ac.color }}>
                          {l.action}
                        </span>
                      </td>
                      <td className="text-[13px] capitalize text-slate-500">{l.resource}</td>
                      <td className="text-[13px] font-medium text-ink">{l.target}</td>
                      <td className="font-mono text-[12px] text-slate-400">{l.ip}</td>
                      <td className="text-[13px] text-slate-500">{fmtDateTime(l.at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
