import { useState } from "react";
import { Modal, Field, Input, Select, enumOptions } from "@/components/ui";
import { TENANT_STATUSES, PLANS } from "@/constants";

export function TenantModal({ open, onClose, onSave, initial = {} }) {
  const [form, setForm] = useState({
    name:        initial.name        ?? "",
    slug:        initial.slug        ?? "",
    plan:        initial.plan        ?? "Starter",
    status:      initial.status      ?? "trial",
    owner_email: initial.owner_email ?? "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial.id ? "Edit tenant" : "Create new tenant"}
    >
      <form
        onSubmit={(e) => { e.preventDefault(); onSave(form); }}
        className="space-y-4"
      >
        <Field label="Organisation name">
          <Input required value={form.name} onChange={set("name")} placeholder="Acme Corp" />
        </Field>
        <Field label="Slug" hint="Lowercase letters and dashes — used in URLs">
          <Input required value={form.slug} onChange={set("slug")} placeholder="acme-corp" pattern="[a-z0-9\-]+" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Plan">
            <Select value={form.plan} onChange={set("plan")}
              options={PLANS.map((p) => ({ value: p, label: p }))} />
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={set("status")}
              options={enumOptions(TENANT_STATUSES)} />
          </Field>
        </div>
        <Field label="Owner email">
          <Input type="email" required value={form.owner_email} onChange={set("owner_email")}
            placeholder="admin@company.com" />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">
            {initial.id ? "Save changes" : "Create tenant"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
