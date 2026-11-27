import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Building2, ChevronRight, CreditCard,
  FileText, TrendingUp, Users, AlertTriangle,
} from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import clsx from "clsx";
import { useAuth } from "@/Context/AuthContext";
import { SchoolHeader } from "@/components/SchoolHeader";
import { Avatar, Badge } from "@/components/ui";
import { money, fmtRelative, fmtDate } from "@/Helpers/formatters";

// ── Mock data ─────────────────────────────────────────────────────────────────
const STATS = {
  total_tenants: 142, active_tenants: 128, trial_tenants: 9, suspended_tenants: 5,
  total_users: 3847, new_users_30d: 214,
  mrr: 48600, arr: 583200,
  pending_invoices: 7, open_tickets: 12, expiring_soon: 4,
};
const MRR_DATA = [
  { month: "Jun", mrr: 38200 }, { month: "Jul", mrr: 40500 },
  { month: "Aug", mrr: 41800 }, { month: "Sep", mrr: 43100 },
  { month: "Oct", mrr: 45600 }, { month: "Nov", mrr: 48600 },
];
const NEW_TENANT_DATA = [
  { month: "Jun", count: 8 }, { month: "Jul", count: 11 },
  { month: "Aug", count: 9 }, { month: "Sep", count: 14 },
  { month: "Oct", count: 12 }, { month: "Nov", count: 15 },
];
const PLAN_DIST = [
  { name: "Starter",    count: 48, pct: 34, color: "#94A3B8" },
  { name: "Growth",     count: 61, pct: 43, color: "#12ACA2" },
  { name: "Pro",        count: 29, pct: 20, color: "#0F2F58" },
  { name: "Enterprise", count: 4,  pct: 3,  color: "#7C3AED" },
];
const RECENT_TENANTS = [
  { id: "1", name: "Nexus Realty",         plan: "Growth",     status: "active", created_at: "2026-11-25T10:00:00Z", users: 12 },
  { id: "2", name: "Bright Motors",        plan: "Pro",        status: "trial",  created_at: "2026-11-24T14:00:00Z", users: 7  },
  { id: "3", name: "Global Fin Services",  plan: "Enterprise", status: "active", created_at: "2026-11-22T09:00:00Z", users: 42 },
  { id: "4", name: "ClearPath Advisors",   plan: "Starter",    status: "active", created_at: "2026-11-20T11:00:00Z", users: 4  },
];
const TIP = { borderRadius: 12, border: "1px solid #E4E9F0", fontSize: 13 };

function StatCard({ icon: Icon, color, bg, title, value, sub, to, trend }) {
  const body = (
    <div className="relative overflow-hidden p-5">
      <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-25" style={{ background: bg }} />
      <div className="relative flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: bg, color }}>
          <Icon size={21} strokeWidth={2.2} />
        </span>
        {trend !== undefined && (
          <span className={clsx("flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-bold",
            trend >= 0 ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-amber-700")}>
            <ArrowUpRight size={12} />{Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="relative mt-4 text-[13px] font-semibold text-slate-500">{title}</p>
      <p className="relative mt-1 text-[30px] font-extrabold leading-none tracking-tight text-ink num">{value}</p>
      {sub && <p className="relative mt-1.5 text-[12.5px] text-slate-400">{sub}</p>}
    </div>
  );
  return to
    ? <Link to={to} className="group card block transition hover:-translate-y-0.5 hover:shadow-lift">{body}</Link>
    : <div className="card">{body}</div>;
}

export default function Dashboard() {
  const { profile } = useAuth();
  const h = new Date().getHours();
  const hello = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">
      <SchoolHeader
        moduleKey="dashboard"
        title="Platform Overview"
        subtitle={`${hello}, ${profile?.full_name?.split(" ")[0] ?? ""} — here is how the platform is doing.`}
        actions={<Link to="/tenants" className="btn-primary">Manage tenants <ArrowRight size={15} /></Link>}
      />

      {/* Alerts */}
      <div className="space-y-2">
        {[
          { text: `${STATS.expiring_soon} subscriptions expiring in 7 days`, to: "/subscriptions", type: "warning" },
          { text: `${STATS.pending_invoices} invoices unpaid and overdue`,    to: "/invoices",      type: "error"   },
          { text: `${STATS.open_tickets} open support tickets`,               to: "/support",       type: "info"    },
        ].map((a) => (
          <Link key={a.text} to={a.to}
            className={clsx("flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition hover:opacity-90",
              a.type === "warning" && "border-amber-100 bg-amber-50 text-amber-800",
              a.type === "error"   && "border-red-100 bg-red-50 text-red-800",
              a.type === "info"    && "border-blue-100 bg-blue-50 text-blue-800",
            )}>
            <AlertTriangle size={15} className="shrink-0" />
            {a.text}
            <ChevronRight size={14} className="ml-auto shrink-0" />
          </Link>
        ))}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Building2} color="#0F2F58" bg="#DCE6F2"
          title="Total tenants" value={STATS.total_tenants}
          sub={`${STATS.active_tenants} active · ${STATS.trial_tenants} trial`}
          to="/tenants" trend={8} />
        <StatCard icon={Users} color="#DB2777" bg="#FCE7F3"
          title="Total users" value={STATS.total_users.toLocaleString()}
          sub={`+${STATS.new_users_30d} in last 30 days`}
          to="/users" trend={6} />
        <StatCard icon={TrendingUp} color="#0B857D" bg="#E6F7F5"
          title="Monthly recurring revenue" value={money(STATS.mrr)}
          sub={`${money(STATS.arr)} ARR`} trend={12} />
        <StatCard icon={CreditCard} color="#7C3AED" bg="#EDE9FE"
          title="Unpaid invoices" value={STATS.pending_invoices}
          sub="Need follow-up" to="/invoices" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <section className="card col-span-1 p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[16px] font-bold text-ink">MRR Trend</h2>
              <p className="text-[13px] text-slate-500">Monthly recurring revenue</p>
            </div>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-[13px] font-bold text-teal-700">{money(STATS.mrr)}/mo</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer>
              <LineChart data={MRR_DATA} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid vertical={false} stroke="#EEF2F6" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false}
                  width={70} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [money(v), "MRR"]} contentStyle={TIP} />
                <Line type="monotone" dataKey="mrr" stroke="#12ACA2" strokeWidth={2.5}
                  dot={{ fill: "#12ACA2", r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card p-5">
          <h2 className="text-[16px] font-bold text-ink">Plan Distribution</h2>
          <p className="mb-5 text-[13px] text-slate-500">{STATS.total_tenants} tenants</p>
          <ul className="space-y-3.5">
            {PLAN_DIST.map((p) => (
              <li key={p.name}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-slate-700">{p.name}</span>
                  <span className="text-sm font-bold text-ink num">{p.count} <span className="font-normal text-slate-400">({p.pct}%)</span></span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-mist-2">
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </li>
            ))}
          </ul>
          <Link to="/plans" className="mt-5 flex items-center gap-1 text-[13px] font-semibold text-teal-700 hover:underline">
            Manage plans <ChevronRight size={14} />
          </Link>
        </section>
      </div>

      {/* Recent tenants */}
      <section className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h2 className="text-[16px] font-bold text-ink">Recent Tenants</h2>
            <p className="text-[13px] text-slate-500">Latest organisations to join</p>
          </div>
          <Link to="/tenants" className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] font-semibold text-teal-700 hover:bg-teal-50">
            See all <ChevronRight size={15} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Organisation</th><th>Plan</th><th>Status</th>
                <th className="text-right">Users</th><th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_TENANTS.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar name={t.name} size={30} />
                      <Link to={`/tenants/${t.id}`} className="font-semibold text-ink hover:underline">{t.name}</Link>
                    </div>
                  </td>
                  <td><span className="rounded-full bg-mist px-2.5 py-0.5 text-[12px] font-bold text-slate-600">{t.plan}</span></td>
                  <td><Badge value={t.status} /></td>
                  <td className="text-right font-bold num">{t.users}</td>
                  <td className="text-[13px] text-slate-500">{fmtRelative(t.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
