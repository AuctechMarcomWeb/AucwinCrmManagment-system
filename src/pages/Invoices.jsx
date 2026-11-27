import { useState } from "react";
import { Download, Plus, Search, X } from "lucide-react";
import { Avatar, Badge, ConfirmDialog, Empty } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { ExportButton } from "@/components/ExportButton";
import { InvoiceModal } from "@/modals/InvoiceModal";
import { fmtDate, money, label } from "@/Helpers/formatters";
import { INVOICE_STATUSES } from "@/constants";

const MOCK_TENANTS = [
  { id:"1", name:"Nexus Realty" }, { id:"2", name:"Bright Motors" },
  { id:"3", name:"Global Fin Services" }, { id:"4", name:"PrimeCare Health" },
];
const MOCK = [
  { id:"inv1", tenant:"Nexus Realty",        tenant_id:"1", amount:79,  status:"paid",    due:"2026-10-10", issued:"2026-09-10", description:"Monthly · Growth"     },
  { id:"inv2", tenant:"Bright Motors",       tenant_id:"2", amount:149, status:"sent",    due:"2026-12-01", issued:"2026-11-01", description:"Monthly · Pro"         },
  { id:"inv3", tenant:"Global Fin Services", tenant_id:"3", amount:2990,status:"paid",    due:"2026-02-15", issued:"2026-01-15", description:"Yearly · Enterprise"   },
  { id:"inv4", tenant:"ClearPath Advisors",  tenant_id:"4", amount:29,  status:"overdue", due:"2026-11-20", issued:"2026-10-20", description:"Monthly · Starter"     },
  { id:"inv5", tenant:"Summit Properties",   tenant_id:"1", amount:79,  status:"void",    due:"2026-10-11", issued:"2026-09-11", description:"Monthly · Growth"      },
  { id:"inv6", tenant:"Orion Insurance",     tenant_id:"2", amount:1490,status:"paid",    due:"2026-05-05", issued:"2026-04-05", description:"Yearly · Pro"          },
  { id:"inv7", tenant:"BlueSky Logistics",   tenant_id:"3", amount:29,  status:"draft",   due:"2026-12-15", issued:"2026-11-15", description:"Monthly · Starter"     },
  { id:"inv8", tenant:"PrimeCare Health",    tenant_id:"4", amount:2990,status:"paid",    due:"2025-07-01", issued:"2025-06-01", description:"Yearly · Enterprise"   },
];

export default function Invoices() {
  const [q, setQ]       = useState("");
  const [status, setS]  = useState("");
  const [showNew, setShowNew]   = useState(false);
  const [editing, setEditing]   = useState(null);

  const totalPaid    = MOCK.filter(i => i.status === "paid").reduce((a, i) => a + i.amount, 0);
  const totalOverdue = MOCK.filter(i => i.status === "overdue").reduce((a, i) => a + i.amount, 0);
  const totalPending = MOCK.filter(i => ["sent","draft"].includes(i.status)).reduce((a, i) => a + i.amount, 0);

  const list = MOCK.filter((i) =>
    (!q      || i.tenant.toLowerCase().includes(q.toLowerCase())) &&
    (!status || i.status === status)
  );

  return (
    <div className="space-y-6">
      <SchoolHeader
        moduleKey="invoices"
        title="Invoices"
        subtitle={`${MOCK.length} total invoices`}
        actions={
          <>
            <ExportButton data={MOCK} filename="invoices" />
            <button className="btn-primary" onClick={() => setShowNew(true)}>
              <Plus size={15} /> New invoice
            </button>
          </>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label:"Total collected",  value: money(totalPaid),    bg:"#DCFCE7", color:"#16A34A" },
          { label:"Pending payment",  value: money(totalPending), bg:"#DBEAFE", color:"#2563EB" },
          { label:"Overdue",          value: money(totalOverdue), bg:"#FFE4E6", color:"#E11D48" },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-[13px] font-semibold text-slate-500">{s.label}</p>
            <p className="mt-1 text-[26px] font-extrabold tracking-tight num" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search tenant…" className="input py-2 pl-9" />
          {q && <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"><X size={14} /></button>}
        </div>
        <select className="input w-auto py-2" value={status} onChange={(e) => setS(e.target.value)}>
          <option value="">All statuses</option>
          {INVOICE_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}
        </select>
      </div>

      <div className="card overflow-hidden">
        {list.length === 0 ? <Empty title="No invoices found" /> : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr><th>Tenant</th><th>Description</th><th>Amount</th><th>Status</th><th>Issued</th><th>Due</th><th></th></tr>
              </thead>
              <tbody>
                {list.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Avatar name={inv.tenant} size={28} />
                        <span className="font-semibold text-ink">{inv.tenant}</span>
                      </div>
                    </td>
                    <td className="text-[13px] text-slate-500">{inv.description}</td>
                    <td className="font-bold num">{money(inv.amount)}</td>
                    <td><Badge value={inv.status} /></td>
                    <td className="text-[13px] text-slate-500">{fmtDate(inv.issued)}</td>
                    <td className="text-[13px] text-slate-500">{fmtDate(inv.due)}</td>
                    <td>
                      <button className="btn-ghost py-1 px-3 text-[13px]" onClick={() => setEditing(inv)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <InvoiceModal open={showNew} tenants={MOCK_TENANTS} onClose={() => setShowNew(false)}
        onSave={(d) => { console.log("create invoice", d); setShowNew(false); }} />
      <InvoiceModal open={!!editing} initial={editing ?? {}} tenants={MOCK_TENANTS}
        onClose={() => setEditing(null)}
        onSave={(d) => { console.log("update invoice", d); setEditing(null); }} />
    </div>
  );
}
