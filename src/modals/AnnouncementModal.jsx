import { useState } from "react";
import { Modal, Field, Input, Select, Textarea, enumOptions } from "@/components/ui";
import { ANNOUNCEMENT_TYPES } from "@/constants";

export function AnnouncementModal({ open, onClose, onSave, initial = {} }) {
  const [form, setForm] = useState({
    title:   initial.title   ?? "",
    body:    initial.body    ?? "",
    type:    initial.type    ?? "info",
    pinned:  initial.pinned  ?? false,
  });
  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Modal open={open} onClose={onClose}
      title={initial.id ? "Edit announcement" : "New announcement"}>
      <form
        onSubmit={(e) => { e.preventDefault(); onSave(form); }}
        className="space-y-4"
      >
        <Field label="Title">
          <Input required value={form.title} onChange={set("title")}
            placeholder="Platform maintenance on Dec 1" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Type">
            <Select value={form.type} onChange={set("type")}
              options={enumOptions(ANNOUNCEMENT_TYPES)} />
          </Field>
          <Field label="Pinned">
            <Select
              value={form.pinned ? "yes" : "no"}
              onChange={(e) => setForm((f) => ({ ...f, pinned: e.target.value === "yes" }))}
              options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes — pin to top" }]}
            />
          </Field>
        </div>
        <Field label="Message">
          <Textarea required rows={4} value={form.body} onChange={set("body")}
            placeholder="Details about this announcement…" />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">
            {initial.id ? "Save changes" : "Publish"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
