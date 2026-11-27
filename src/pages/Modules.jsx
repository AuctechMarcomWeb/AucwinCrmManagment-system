import { useState } from "react";
import {
  Bell, CalendarDays, CalendarRange, Facebook, Globe,
  MessageCircle, StickyNote, UserCheck, Users, CheckSquare, ListTodo,
} from "lucide-react";
import clsx from "clsx";
import { Avatar, Empty } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { ToggleSwitch } from "@/components/ToggleSwitch";

const ALL_MODULES = [
  { key:"leads",    label:"Lead Management",    icon:Users,       color:"#DB2777", bg:"#FCE7F3" },
  { key:"tasks",    label:"Task Management",    icon:CheckSquare, color:"#7C3AED", bg:"#EDE9FE" },
  { key:"clients",  label:"Customer Management",icon:UserCheck,   color:"#16A34A", bg:"#DCFCE7" },
  { key:"reminders",label:"Reminders",          icon:Bell,        color:"#D97706", bg:"#FEF3C7" },
  { key:"meetings", label:"Meeting Management", icon:CalendarDays,color:"#EA580C", bg:"#FFEDD5" },
  { key:"todos",    label:"To-Do",              icon:ListTodo,    color:"#2563EB", bg:"#DBEAFE" },
  { key:"notes",    label:"Notes",              icon:StickyNote,  color:"#9333EA", bg:"#F3E8FF" },
  { key:"chat",     label:"Chat",               icon:MessageCircle,color:"#E11D48",bg:"#FFE4E6" },
  { key:"calendar", label:"Calendar",           icon:CalendarRange,color:"#0284C7",bg:"#E0F2FE" },
  { key:"facebook", label:"Facebook Integration",icon:Facebook,  color:"#1877F2", bg:"#DBEAFE" },
  { key:"website",  label:"Website Integration",icon:Globe,      color:"#0D9488", bg:"#CCFBF1" },
];

const MOCK_TENANTS = [
  { id:"1", name:"Nexus Realty",        enabled:["leads","tasks","clients","reminders","meetings","chat","calendar"] },
  { id:"2", name:"Bright Motors",       enabled:["leads","tasks","clients","reminders"] },
  { id:"3", name:"Global Fin Services", enabled:["leads","tasks","clients","reminders","meetings","todos","notes","chat","calendar","facebook","website"] },
  { id:"4", name:"PrimeCare Health",    enabled:["leads","tasks","clients","reminders","meetings","todos","notes","chat","calendar"] },
];

export default function Modules() {
  const [selected, setSelected] = useState("1");
  const [modules, setModules]   = useState(() => {
    const map = {};
    MOCK_TENANTS.forEach((t) => { map[t.id] = new Set(t.enabled); });
    return map;
  });

  const tenant   = MOCK_TENANTS.find((t) => t.id === selected);
  const enabled  = modules[selected] ?? new Set();

  const toggle = (key) => {
    setModules((prev) => {
      const next = new Set(prev[selected]);
      next.has(key) ? next.delete(key) : next.add(key);
      return { ...prev, [selected]: next };
    });
  };

  return (
    <div className="space-y-6">
      <SchoolHeader
        moduleKey="modules"
        title="Module Control"
        subtitle="Enable or disable features per tenant"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {/* Tenant list */}
        <aside className="card h-fit overflow-hidden">
          <div className="border-b border-mist-2 px-4 py-3">
            <p className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Tenants</p>
          </div>
          <ul>
            {MOCK_TENANTS.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setSelected(t.id)}
                  className={clsx(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-mist",
                    selected === t.id && "bg-teal-50 font-semibold text-teal-700"
                  )}
                >
                  <Avatar name={t.name} size={30} />
                  <span className="text-sm">{t.name}</span>
                  <span className="ml-auto text-[12px] text-slate-400 num">{modules[t.id]?.size ?? 0}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Module toggles */}
        <section className="card p-6">
          <div className="mb-5 flex items-center gap-3">
            <Avatar name={tenant?.name} size={36} />
            <div>
              <h2 className="text-[16px] font-bold text-ink">{tenant?.name}</h2>
              <p className="text-[13px] text-slate-500">{enabled.size} of {ALL_MODULES.length} modules enabled</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ALL_MODULES.map((m) => (
              <div key={m.key}
                className="flex items-center justify-between gap-4 rounded-xl border border-mist-2 p-4 transition hover:bg-mist/40">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: m.bg, color: m.color }}>
                    <m.icon size={17} strokeWidth={2.2} />
                  </span>
                  <span className="text-sm font-semibold text-ink">{m.label}</span>
                </div>
                <ToggleSwitch
                  checked={enabled.has(m.key)}
                  onChange={() => toggle(m.key)}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <button className="btn-primary"
              onClick={() => console.log("save modules", selected, [...enabled])}>
              Save changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
