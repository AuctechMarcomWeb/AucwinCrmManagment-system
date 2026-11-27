import { useState } from "react";
import { Modal, Field, Input, Select, enumOptions } from "@/components/ui";
import { INVOICE_STATUSES, PLANS } from "@/constants";

export function InvoiceModal({ open, onClose, onSave, initial = {}, tenants = [] }) {
  const [form, setForm] = useState({
    tenant_id:  initial.tenant_id  ?? "",
    amount:     initial.amount     ?? "",
    due_date:   initial.due_date   ?? "",
    status:     initial.status     ?? "draft",
    description:initial.description?? "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial.id ? "Edit invoice" : "Create invoice"}
    >
      <form
        onSubmit={(e) => { e.preventDefault(); onSave(form); }}
        className="space-y-4"
      >
        <Field label="Tenant">
          <Select
            required
            value={form.tenant_id}
            onChange={set("tenant_id")}
            placeholder="Select tenant…"
            options={tenants.map((t) => ({ value: t.id, label: t.name }))}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Amount (USD)">
            <Input type="number" min="0" step="0.01" required
              value={form.amount} onChange={set("amount")} placeholder="99.00" />
          </Field>
          <Field label="Due date">
            <Input type="date" required value={form.due_date} onChange={set("due_date")} />
          </Field>
        </div>
        <Field label="Status">
          <Select value={form.status} onChange={set("status")}
            options={enumOptions(INVOICE_STATUSES)} />
        </Field>
        <Field label="Description">
          <Input value={form.description} onChange={set("description")}
            placeholder="Monthly subscription — Growth plan" />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">
            {initial.id ? "Save changes" : "Create invoice"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
