import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Download, MoreHorizontal, Plus, Search, Users, X } from "lucide-react";
import { Avatar, Badge, ConfirmDialog, Empty } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { ExportButton } from "@/components/ExportButton";
import { TenantModal } from "@/modals/TenantModal";
import { fmtDate, fmtRelative, label } from "@/Helpers/formatters";
import { TENANT_STATUSES, PLANS } from "@/constants";

const MOCK = [
  { id:"1", name:"Nexus Realty",         slug:"nexus-realty",  plan:"Growth",     status:"active",    users:12, owner_email:"admin@nexusrealty.com",   created_at:"2026-09-10T10:00:00Z", expires_at:"2027-09-10T10:00:00Z" },
  { id:"2", name:"Bright Motors",        slug:"bright-motors", plan:"Pro",        status:"trial",     users:7,  owner_email:"info@brightmotors.com",    created_at:"2026-11-01T10:00:00Z", expires_at:"2026-12-01T10:00:00Z" },
  { id:"3", name:"Global Fin Services",  slug:"global-fin",    plan:"Enterprise", status:"active",    users:42, owner_email:"tech@globalfin.com",        created_at:"2025-01-15T10:00:00Z", expires_at:"2027-01-15T10:00:00Z" },
  { id:"4", name:"ClearPath Advisors",   slug:"clearpath",     plan:"Starter",    status:"active",    users:4,  owner_email:"admin@clearpath.com",       created_at:"2026-07-20T10:00:00Z", expires_at:"2027-07-20T10:00:00Z" },
  { id:"5", name:"Summit Properties",    slug:"summit-props",  plan:"Growth",     status:"suspended", users:9,  owner_email:"ops@summitprops.com",        created_at:"2026-02-11T10:00:00Z", expires_at:"2026-11-11T10:00:00Z" },
  { id:"6", name:"Orion Insurance",      slug:"orion-ins",     plan:"Pro",        status:"active",    users:18, owner_email:"admin@orionins.com",         created_at:"2026-04-05T10:00:00Z", expires_at:"2027-04-05T10:00:00Z" },
  { id:"7", name:"BlueSky Logistics",    slug:"bluesky-log",   plan:"Starter",    status:"trial",     users:3,  owner_email:"ceo@blueskylog.com",         created_at:"2026-11-15T10:00:00Z", expires_at:"2026-12-15T10:00:00Z" },
  { id:"8", name:"PrimeCare Health",     slug:"primecare",     plan:"Enterprise", status:"active",    users:67, owner_email:"it@primecarehealth.com",     created_at:"2024-06-01T10:00:00Z", expires_at:"2027-06-01T10:00:00Z" },
];

export default function Tenants() {
  const [q, setQ]           = useState("");
  const [status, setStatus] = useState("");
  const [plan, setPlan]     = useState("");
  const [showNew, setShowNew]   = useState(false);
  const [editing, setEditing]   = useState(null);
  const [deleting, setDeleting] = useState(null);

  const list = MOCK.filter((t) =>
    (!q      || t.name.toLowerCase().includes(q.toLowerCase()) || t.owner_email.toLowerCase().includes(q.toLowerCase())) &&
    (!status || t.status === status) &&
    (!plan   || t.plan   === plan)
  );

  return (
    <div className="space-y-6">
      <SchoolHeader
        moduleKey="tenants"
        title="Tenants"
        subtitle={`${MOCK.length} organisations on the platform`}
        actions={
          <>
            <ExportButton data={MOCK} filename="tenants" />
            <button className="btn-primary" onClick={() => setShowNew(true)}>
              <Plus size={15} /> New tenant
            </button>
          </>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[260px] flex-1">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or email…" className="input py-2 pl-9" />
          {q && <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"><X size={14} /></button>}
        </div>
        <select className="input w-auto py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {TENANT_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
        </select>
        <select className="input w-auto py-2" value={plan} onChange={(e) => setPlan(e.target.value)}>
          <option value="">All plans</option>
          {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Count chips */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { l:"Total",     v:MOCK.length,                                       c:"#0F2F58", bg:"#DCE6F2" },
          { l:"Active",    v:MOCK.filter(t=>t.status==="active").length,        c:"#16A34A", bg:"#DCFCE7" },
          { l:"Trial",     v:MOCK.filter(t=>t.status==="trial").length,         c:"#2563EB", bg:"#DBEAFE" },
          { l:"Suspended", v:MOCK.filter(t=>t.status==="suspended").length,     c:"#D97706", bg:"#FEF3C7" },
        ].map((s) => (
          <div key={s.l} className="card flex items-center gap-3 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-extrabold num"
              style={{ background: s.bg, color: s.c }}>{s.v}</span>
            <span className="font-semibold text-slate-600">{s.l}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {list.length === 0
          ? <Empty title="No tenants match your filters" hint="Adjust the search or filter above." />
          : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Organisation</th><th>Plan</th><th>Status</th>
                    <th className="text-right">Users</th><th>Created</th><th>Renews</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <Avatar name={t.name} size={32} />
                          <div>
                            <Link to={`/tenants/${t.id}`} className="block font-semibold text-ink hover:underline">{t.name}</Link>
                            <span className="text-[12px] text-slate-400">{t.owner_email}</span>
                          </div>
                        </div>
                      </td>
                      <td><span className="rounded-full bg-mist px-2.5 py-0.5 text-[12px] font-bold text-slate-600">{t.plan}</span></td>
                      <td><Badge value={t.status} /></td>
                      <td className="text-right">
                        <span className="inline-flex items-center gap-1 font-bold num">
                          <Users size={13} className="text-slate-400" />{t.users}
                        </span>
                      </td>
                      <td className="text-[13px] text-slate-500">{fmtDate(t.created_at)}</td>
                      <td className="text-[13px] text-slate-500">{fmtDate(t.expires_at)}</td>
                      <td>
                        <div className="flex justify-end gap-1">
                          <Link to={`/tenants/${t.id}`} className="btn-ghost p-2"><ChevronRight size={15} /></Link>
                          <button className="btn-ghost p-2" onClick={() => setEditing(t)}><MoreHorizontal size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>

      <TenantModal open={showNew} onClose={() => setShowNew(false)}
        onSave={(d) => { console.log("create", d); setShowNew(false); }} />
      <TenantModal open={!!editing} initial={editing ?? {}} onClose={() => setEditing(null)}
        onSave={(d) => { console.log("update", d); setEditing(null); }} />
      <ConfirmDialog open={!!deleting} onClose={() => setDeleting(null)}
        onConfirm={() => { console.log("delete", deleting); setDeleting(null); }}
        title="Delete tenant" message="This permanently removes the tenant and all their data. Cannot be undone." />
    </div>
  );
}
