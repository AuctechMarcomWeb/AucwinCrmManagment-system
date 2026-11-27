import { useState } from "react";
import clsx from "clsx";
import { Save, User, Lock, Globe, Bell, Shield } from "lucide-react";
import { Field, Input, PasswordInput, Textarea, Select } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { ToggleSwitch } from "@/components/ToggleSwitch";

const TABS = [
  { key:"profile",   label:"Profile",          icon: User   },
  { key:"security",  label:"Security",         icon: Lock   },
  { key:"platform",  label:"Platform",         icon: Globe  },
  { key:"notifications", label:"Notifications",icon: Bell   },
];

function ProfileTab() {
  const [form, setForm] = useState({ full_name:"Platform Admin", email:"admin@aucwin.com", phone:"" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); console.log("save profile", form); }} className="max-w-lg space-y-5">
      <Field label="Full name"><Input required value={form.full_name} onChange={set("full_name")} /></Field>
      <Field label="Email address"><Input type="email" required value={form.email} onChange={set("email")} /></Field>
      <Field label="Phone (optional)"><Input type="tel" value={form.phone} onChange={set("phone")} placeholder="+1 555 000 0000" /></Field>
      <button type="submit" className="btn-primary"><Save size={15} /> Save profile</button>
    </form>
  );
}

function SecurityTab() {
  const [form, setForm] = useState({ current:"", next:"", confirm:"" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); console.log("change password"); }} className="max-w-lg space-y-5">
      <Field label="Current password"><PasswordInput required value={form.current} onChange={set("current")} /></Field>
      <Field label="New password"><PasswordInput required value={form.next} onChange={set("next")} /></Field>
      <Field label="Confirm new password"><PasswordInput required value={form.confirm} onChange={set("confirm")} /></Field>
      <button type="submit" className="btn-primary"><Lock size={15} /> Update password</button>
    </form>
  );
}

function PlatformTab() {
  const [form, setForm] = useState({
    platform_name: "AucWin CRM",
    support_email: "support@aucwin.com",
    timezone: "UTC",
    currency: "USD",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); console.log("save platform", form); }} className="max-w-lg space-y-5">
      <Field label="Platform name"><Input required value={form.platform_name} onChange={set("platform_name")} /></Field>
      <Field label="Support email"><Input type="email" required value={form.support_email} onChange={set("support_email")} /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Default timezone">
          <Select value={form.timezone} onChange={set("timezone")} options={[
            { value:"UTC",        label:"UTC" },
            { value:"America/New_York", label:"Eastern (US)" },
            { value:"America/Los_Angeles", label:"Pacific (US)" },
            { value:"Europe/London", label:"London" },
            { value:"Asia/Karachi", label:"Karachi (PKT)" },
          ]} />
        </Field>
        <Field label="Default currency">
          <Select value={form.currency} onChange={set("currency")} options={[
            { value:"USD", label:"USD — US Dollar" },
            { value:"CAD", label:"CAD — Canadian Dollar" },
            { value:"GBP", label:"GBP — British Pound" },
            { value:"PKR", label:"PKR — Pakistani Rupee" },
          ]} />
        </Field>
      </div>
      <button type="submit" className="btn-primary"><Save size={15} /> Save platform settings</button>
    </form>
  );
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    new_tenant:  true,
    expiry:      true,
    overdue:     true,
    new_ticket:  true,
    login:       false,
  });
  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }));
  const rows = [
    { key:"new_tenant",  label:"New tenant registered"           },
    { key:"expiry",      label:"Subscription expiring soon"      },
    { key:"overdue",     label:"Invoice overdue"                 },
    { key:"new_ticket",  label:"New support ticket"              },
    { key:"login",       label:"Admin login from new IP"         },
  ];
  return (
    <div className="max-w-lg space-y-3">
      {rows.map((r) => (
        <div key={r.key} className="flex items-center justify-between rounded-xl border border-mist-2 p-4">
          <span className="text-sm font-medium text-slate-700">{r.label}</span>
          <ToggleSwitch checked={prefs[r.key]} onChange={() => toggle(r.key)} />
        </div>
      ))}
      <button className="btn-primary mt-2" onClick={() => console.log("save notif prefs", prefs)}>
        <Save size={15} /> Save preferences
      </button>
    </div>
  );
}

export default function Settings() {
  const [tab, setTab] = useState("profile");
  const content = { profile:<ProfileTab />, security:<SecurityTab />, platform:<PlatformTab />, notifications:<NotificationsTab /> };

  return (
    <div className="space-y-6">
      <SchoolHeader moduleKey="settings" title="Settings" />
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Sidebar tabs */}
        <nav className="flex lg:flex-col gap-1 lg:w-48 shrink-0">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={clsx(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[14px] font-semibold transition text-left",
                tab === t.key ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-mist hover:text-ink"
              )}>
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </nav>
        {/* Content */}
        <div className="card flex-1 p-6">
          {content[tab]}
        </div>
      </div>
    </div>
  );
}
