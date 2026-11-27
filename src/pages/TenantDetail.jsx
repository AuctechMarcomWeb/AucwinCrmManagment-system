import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, Building2, CreditCard, Edit2, Mail, Shield, Users,
} from "lucide-react";
import clsx from "clsx";
import { Avatar, Badge, Empty } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { TenantModal } from "@/modals/TenantModal";
import { fmtDate } from "@/Helpers/formatters";

const MOCK_TENANTS = {
  "1": {
    id:"1", name:"Nexus Realty", slug:"nexus-realty", plan:"Growth", status:"active",
    owner_email:"admin@nexusrealty.com", created_at:"2026-09-10T10:00:00Z", expires_at:"2027-09-10T10:00:00Z",
    users: [
      { id:"u1", full_name:"Sarah Connor",  email:"sarah@nexusrealty.com",  role:"admin",    status:"active" },
      { id:"u2", full_name:"Tony Stark",    email:"tony@nexusrealty.com",   role:"employee", status:"active" },
      { id:"u3", full_name:"Pepper Potts",  email:"pepper@nexusrealty.com", role:"employee", status:"active" },
    ],
    invoices: [
      { id:"inv1", amount:79,  status:"paid",    issued:"2026-09-10", description:"Monthly · Growth" },
      { id:"inv2", amount:79,  status:"paid",    issued:"2026-10-10", description:"Monthly · Growth" },
      { id:"inv3", amount:79,  status:"sent",    issued:"2026-11-10", description:"Monthly · Growth" },
    ],
  },
};

const TABS = ["Overview","Users","Invoices","Modules"];

export default function TenantDetail() {
  const { id }   = useParams();
  const tenant   = MOCK_TENANTS[id];
  const [tab, setTab]     = useState("Overview");
  const [editing, setEditing] = useState(false);

  if (!tenant) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Building2 size={40} className="text-slate-300 mb-4" />
      <p className="font-semibold text-ink">Tenant not found</p>
      <Link to="/tenants" className="mt-4 btn-secondary"><ArrowLeft size={15} /> Back to tenants</Link>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link to="/tenants" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-ink">
        <ArrowLeft size={15} /> All tenants
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={tenant.name} size={52} />
          <div>
            <h1 className="text-[24px] font-extrabold tracking-tight text-ink">{tenant.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge value={tenant.status} />
              <span className="rounded-full bg-mist px-2.5 py-0.5 text-[12px] font-bold text-slate-600">{tenant.plan}</span>
              <span className="text-[13px] text-slate-400">/{tenant.slug}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => setEditing(true)}>
            <Edit2 size={15} /> Edit tenant
          </button>
        </div>
      </div>

      {/* Meta cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: Mail,       label:"Owner email",   value: tenant.owner_email,       color:"#0F2F58", bg:"#DCE6F2" },
          { icon: CreditCard, label:"Renews",         value: fmtDate(tenant.expires_at), color:"#0B857D", bg:"#E6F7F5" },
          { icon: Users,      label:"Users",          value: `${tenant.users.length} team members`, color:"#DB2777", bg:"#FCE7F3" },
        ].map((m) => (
          <div key={m.label} className="card flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: m.bg, color: m.color }}>
              <m.icon size={19} />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">{m.label}</p>
              <p className="text-[15px] font-bold text-ink">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-mist-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={clsx(
              "px-4 py-2.5 text-[14px] font-semibold transition border-b-2 -mb-px",
              tab === t ? "border-teal-500 text-teal-700" : "border-transparent text-slate-500 hover:text-ink"
            )}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="card p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label:"Status",   value: <Badge value={tenant.status} /> },
              { label:"Plan",     value: tenant.plan },
              { label:"Created",  value: fmtDate(tenant.created_at) },
              { label:"Expires",  value: fmtDate(tenant.expires_at) },
            ].map((r) => (
              <div key={r.label}>
                <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400">{r.label}</p>
                <div className="mt-1 text-sm font-semibold text-ink">{r.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Users" && (
        <div className="card overflow-hidden">
          {tenant.users.length === 0 ? <Empty title="No users yet" /> : (
            <table className="table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
              <tbody>
                {tenant.users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Avatar name={u.full_name} size={28} />
                        <span className="font-semibold text-ink">{u.full_name}</span>
                      </div>
                    </td>
                    <td className="text-[13px] text-slate-500">{u.email}</td>
                    <td><Badge value={u.role} /></td>
                    <td><Badge value={u.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === "Invoices" && (
        <div className="card overflow-hidden">
          {tenant.invoices.length === 0 ? <Empty title="No invoices" /> : (
            <table className="table">
              <thead><tr><th>Description</th><th>Amount</th><th>Status</th><th>Issued</th></tr></thead>
              <tbody>
                {tenant.invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="font-medium">{inv.description}</td>
                    <td className="font-bold num">${inv.amount}</td>
                    <td><Badge value={inv.status} /></td>
                    <td className="text-[13px] text-slate-500">{fmtDate(inv.issued)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === "Modules" && (
        <div className="card p-6">
          <p className="text-sm text-slate-500">Module control is managed from the <Link to="/modules" className="font-semibold text-teal-700 hover:underline">Module Control</Link> page.</p>
        </div>
      )}

      <TenantModal open={editing} initial={tenant} onClose={() => setEditing(false)}
        onSave={(d) => { console.log("update tenant", d); setEditing(false); }} />
    </div>
  );
}
