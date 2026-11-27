import { useState } from "react";
import { Modal, Field, Input, Select, enumOptions } from "@/components/ui";
import { USER_ROLES } from "@/constants";

export function UserModal({ open, onClose, onSave, initial = {}, tenants = [] }) {
  const [form, setForm] = useState({
    full_name:  initial.full_name  ?? "",
    email:      initial.email      ?? "",
    role:       initial.role       ?? "employee",
    tenant_id:  initial.tenant_id  ?? "",
    password:   "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isEdit = !!initial.id;

  return (
    <Modal open={open} onClose={onClose}
      title={isEdit ? "Edit user" : "Create user"}>
      <form
        onSubmit={(e) => { e.preventDefault(); onSave(form); }}
        className="space-y-4"
      >
        <Field label="Full name">
          <Input required value={form.full_name} onChange={set("full_name")}
            placeholder="Jane Smith" />
        </Field>
        <Field label="Email">
          <Input type="email" required value={form.email} onChange={set("email")}
            placeholder="jane@company.com" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Role">
            <Select value={form.role} onChange={set("role")}
              options={enumOptions(USER_ROLES)} />
          </Field>
          <Field label="Tenant">
            <Select value={form.tenant_id} onChange={set("tenant_id")}
              placeholder="Select tenant…"
              options={tenants.map((t) => ({ value: t.id, label: t.name }))} />
          </Field>
        </div>
        {!isEdit && (
          <Field label="Password" hint="Min 8 characters">
            <Input type="password" required value={form.password}
              onChange={set("password")} placeholder="Temporary password" />
          </Field>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">
            {isEdit ? "Save changes" : "Create user"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
