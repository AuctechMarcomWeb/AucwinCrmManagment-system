import { useState } from "react";
import { Check, Edit2, Plus, Trash2 } from "lucide-react";
import clsx from "clsx";
import { ConfirmDialog, Field, Input, Modal, Select, Textarea, enumOptions } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { money } from "@/Helpers/formatters";
import { PLAN_INTERVALS } from "@/constants";

const MOCK_PLANS = [
  { id:"p1", name:"Starter",    price_monthly:29,  price_yearly:290,  interval:"monthly", max_users:5,   features:["Lead Management","Tasks","Reminders"],               popular:false },
  { id:"p2", name:"Growth",     price_monthly:79,  price_yearly:790,  interval:"monthly", max_users:20,  features:["All Starter","Clients","Chat","Calendar","Notes"],    popular:true  },
  { id:"p3", name:"Pro",        price_monthly:149, price_yearly:1490, interval:"monthly", max_users:50,  features:["All Growth","Integrations","Reports","API Access"],   popular:false },
  { id:"p4", name:"Enterprise", price_monthly:299, price_yearly:2990, interval:"monthly", max_users:999, features:["All Pro","Unlimited Users","SLA","Dedicated Support"],popular:false },
];

function PlanCard({ plan, onEdit, onDelete }) {
  return (
    <div className={clsx("card relative overflow-hidden p-6 flex flex-col gap-4", plan.popular && "ring-2 ring-teal-500")}>
      {plan.popular && (
        <span className="absolute right-4 top-4 rounded-full bg-teal-500 px-2.5 py-0.5 text-[11px] font-bold text-white">
          Most popular
        </span>
      )}
      <div>
        <h3 className="text-lg font-extrabold text-ink">{plan.name}</h3>
        <p className="mt-1 text-[13px] text-slate-500">Up to {plan.max_users === 999 ? "Unlimited" : plan.max_users} users</p>
      </div>
      <div>
        <span className="text-[32px] font-extrabold tracking-tight text-ink num">{money(plan.price_monthly)}</span>
        <span className="text-sm text-slate-500"> /mo</span>
        <p className="text-[12px] text-slate-400">{money(plan.price_yearly)}/yr when billed annually</p>
      </div>
      <ul className="flex-1 space-y-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-[13px] text-slate-700">
            <Check size={14} className="text-teal-500 shrink-0" />{f}
          </li>
        ))}
      </ul>
      <div className="flex gap-2 pt-2">
        <button className="btn-secondary flex-1" onClick={() => onEdit(plan)}><Edit2 size={14} /> Edit</button>
        <button className="btn-ghost p-2.5 text-amber-700 hover:bg-amber-50" onClick={() => onDelete(plan.id)}><Trash2 size={15} /></button>
      </div>
    </div>
  );
}

export default function Plans() {
  const [showNew, setShowNew]   = useState(false);
  const [editing, setEditing]   = useState(null);
  const [deleting, setDeleting] = useState(null);

  function PlanForm({ initial = {}, onSave, onClose }) {
    const [form, setForm] = useState({
      name:          initial.name          ?? "",
      price_monthly: initial.price_monthly ?? "",
      price_yearly:  initial.price_yearly  ?? "",
      max_users:     initial.max_users     ?? 10,
      features:      (initial.features ?? []).join("\n"),
    });
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
    return (
      <form onSubmit={(e) => { e.preventDefault(); onSave({ ...form, features: form.features.split("\n").filter(Boolean) }); }} className="space-y-4">
        <Field label="Plan name"><Input required value={form.name} onChange={set("name")} placeholder="Growth" /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Monthly price (USD)"><Input type="number" required value={form.price_monthly} onChange={set("price_monthly")} /></Field>
          <Field label="Yearly price (USD)"><Input type="number" required value={form.price_yearly} onChange={set("price_yearly")} /></Field>
        </div>
        <Field label="Max users"><Input type="number" required value={form.max_users} onChange={set("max_users")} /></Field>
        <Field label="Features" hint="One feature per line">
          <Textarea value={form.features} onChange={set("features")} rows={5} placeholder={"Lead Management\nChat\nCalendar"} />
        </Field>
        <div className="flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">{initial.id ? "Save" : "Create plan"}</button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <SchoolHeader
        moduleKey="plans"
        title="Plans"
        subtitle="Subscription tiers and feature sets"
        actions={
          <button className="btn-primary" onClick={() => setShowNew(true)}>
            <Plus size={15} /> New plan
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {MOCK_PLANS.map((p) => (
          <PlanCard key={p.id} plan={p}
            onEdit={setEditing}
            onDelete={setDeleting} />
        ))}
      </div>

      <Modal open={showNew} onClose={() => setShowNew(false)} title="Create plan">
        <PlanForm onSave={(d) => { console.log("create", d); setShowNew(false); }} onClose={() => setShowNew(false)} />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit plan">
        {editing && <PlanForm initial={editing} onSave={(d) => { console.log("update", d); setEditing(null); }} onClose={() => setEditing(null)} />}
      </Modal>
      <ConfirmDialog open={!!deleting} onClose={() => setDeleting(null)}
        onConfirm={() => setDeleting(null)}
        title="Delete plan" message="Tenants on this plan must be migrated first." />
    </div>
  );
}
