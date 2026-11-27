import { useState } from "react";
import { Search, X, AlertTriangle } from "lucide-react";
import clsx from "clsx";
import { Avatar, Badge, Empty, Modal, Field, Select, enumOptions } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { ExportButton } from "@/components/ExportButton";
import { fmtDate, label, money } from "@/Helpers/formatters";
import { PLAN_INTERVALS, PLANS } from "@/constants";

const MOCK = [
  { id:"s1", tenant:"Nexus Realty",        plan:"Growth",     interval:"monthly",  amount:79,  status:"active",   start:"2026-09-10", end:"2027-09-10", auto_renew:true  },
  { id:"s2", tenant:"Bright Motors",       plan:"Pro",        interval:"monthly",  amount:149, status:"trial",    start:"2026-11-01", end:"2026-12-01", auto_renew:false },
  { id:"s3", tenant:"Global Fin Services", plan:"Enterprise", interval:"yearly",   amount:2990,status:"active",   start:"2025-01-15", end:"2027-01-15", auto_renew:true  },
  { id:"s4", tenant:"ClearPath Advisors",  plan:"Starter",    interval:"monthly",  amount:29,  status:"active",   start:"2026-07-20", end:"2026-12-01", auto_renew:false },
  { id:"s5", tenant:"Summit Properties",   plan:"Growth",     interval:"monthly",  amount:79,  status:"suspended",start:"2026-02-11", end:"2026-11-11", auto_renew:false },
  { id:"s6", tenant:"Orion Insurance",     plan:"Pro",        interval:"yearly",   amount:1490,status:"active",   start:"2026-04-05", end:"2027-04-05", auto_renew:true  },
  { id:"s7", tenant:"BlueSky Logistics",   plan:"Starter",    interval:"monthly",  amount:29,  status:"trial",    start:"2026-11-15", end:"2026-12-15", auto_renew:false },
  { id:"s8", tenant:"PrimeCare Health",    plan:"Enterprise", interval:"yearly",   amount:2990,status:"active",   start:"2024-06-01", end:"2027-06-01", auto_renew:true  },
];

const expiringSoon = MOCK.filter((s) => {
  const days = (new Date(s.end) - new Date()) / (1000 * 60 * 60 * 24);
  return days <= 30 && days > 0 && s.status === "active";
});

export default function Subscriptions() {
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null);

  const list = MOCK.filter((s) =>
    !q || s.tenant.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SchoolHeader
        moduleKey="subscriptions"
        title="Subscriptions"
        subtitle={`${MOCK.length} subscriptions · ${expiringSoon.length} expiring within 30 days`}
        actions={<ExportButton data={MOCK} filename="subscriptions" />}
      />

      {expiringSoon.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-600" />
            <span className="font-semibold text-amber-800">Expiring soon</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {expiringSoon.map((s) => (
              <span key={s.id} className="rounded-full bg-amber-100 px-3 py-1 text-[13px] font-medium text-amber-800">
                {s.tenant} · {fmtDate(s.end)}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Search tenants…" className="input py-2 pl-9" />
        {q && <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"><X size={14} /></button>}
      </div>

      <div className="card overflow-hidden">
        {list.length === 0 ? <Empty title="No subscriptions found" /> : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr><th>Tenant</th><th>Plan</th><th>Interval</th><th>Amount</th><th>Status</th><th>Start</th><th>Renews / Ends</th><th>Auto-renew</th><th></th></tr>
              </thead>
              <tbody>
                {list.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Avatar name={s.tenant} size={28} />
                        <span className="font-semibold text-ink">{s.tenant}</span>
                      </div>
                    </td>
                    <td><span className="rounded-full bg-mist px-2.5 py-0.5 text-[12px] font-bold text-slate-600">{s.plan}</span></td>
                    <td className="capitalize text-[13px]">{s.interval}</td>
                    <td className="font-bold num">{money(s.amount)}</td>
                    <td><Badge value={s.status} /></td>
                    <td className="text-[13px] text-slate-500">{fmtDate(s.start)}</td>
                    <td className={clsx("text-[13px] font-medium",
                      (new Date(s.end) - new Date()) / (1000*60*60*24) <= 30 ? "text-amber-600" : "text-slate-500"
                    )}>{fmtDate(s.end)}</td>
                    <td>
                      <span className={clsx("rounded-full px-2.5 py-0.5 text-[12px] font-bold",
                        s.auto_renew ? "bg-teal-50 text-teal-700" : "bg-mist text-slate-500"
                      )}>
                        {s.auto_renew ? "On" : "Off"}
                      </span>
                    </td>
                    <td>
                      <button className="btn-ghost py-1 px-3 text-[13px]" onClick={() => setEditing(s)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit subscription">
        {editing && (
          <form onSubmit={(e) => { e.preventDefault(); setEditing(null); }} className="space-y-4">
            <Field label="Plan">
              <Select value={editing.plan} onChange={(e) => setEditing({ ...editing, plan: e.target.value })}
                options={PLANS.map((p) => ({ value: p, label: p }))} />
            </Field>
            <Field label="Billing interval">
              <Select value={editing.interval} onChange={(e) => setEditing({ ...editing, interval: e.target.value })}
                options={enumOptions(PLAN_INTERVALS)} />
            </Field>
            <Field label="Renewal date">
              <input type="date" className="input" value={editing.end}
                onChange={(e) => setEditing({ ...editing, end: e.target.value })} />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="btn-primary">Save changes</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
