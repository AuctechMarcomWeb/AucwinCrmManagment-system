import { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { Avatar, Badge, ConfirmDialog, Empty } from "@/components/ui";
import { SchoolHeader } from "@/components/SchoolHeader";
import { ExportButton } from "@/components/ExportButton";
import { UserModal } from "@/modals/UserModal";
import { fmtDate, label } from "@/Helpers/formatters";
import { USER_ROLES } from "@/constants";

const MOCK_TENANTS = [
  { id:"1", name:"Nexus Realty" }, { id:"2", name:"Bright Motors" },
  { id:"3", name:"Global Fin Services" }, { id:"4", name:"PrimeCare Health" },
];
const MOCK_USERS = [
  { id:"u1", full_name:"Sarah Connor",    email:"sarah@nexusrealty.com",     role:"admin",       tenant_id:"1", tenant:"Nexus Realty",         status:"active", created_at:"2026-09-10T10:00:00Z" },
  { id:"u2", full_name:"James Kirk",      email:"james@brightmotors.com",    role:"super_admin", tenant_id:"2", tenant:"Bright Motors",        status:"active", created_at:"2026-11-01T10:00:00Z" },
  { id:"u3", full_name:"Olivia Pope",     email:"olivia@globalfin.com",      role:"employee",    tenant_id:"3", tenant:"Global Fin Services",  status:"active", created_at:"2025-01-15T10:00:00Z" },
  { id:"u4", full_name:"Tony Stark",      email:"tony@nexusrealty.com",      role:"employee",    tenant_id:"1", tenant:"Nexus Realty",         status:"active", created_at:"2026-10-01T10:00:00Z" },
  { id:"u5", full_name:"Bruce Wayne",     email:"bruce@primecarehealth.com", role:"admin",       tenant_id:"4", tenant:"PrimeCare Health",     status:"suspended", created_at:"2024-06-01T10:00:00Z" },
];

export default function Users() {
  const [q, setQ]       = useState("");
  const [role, setRole] = useState("");
  const [showNew, setShowNew]   = useState(false);
  const [editing, setEditing]   = useState(null);
  const [deleting, setDeleting] = useState(null);

  const list = MOCK_USERS.filter((u) =>
    (!q    || u.full_name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())) &&
    (!role || u.role === role)
  );

  return (
    <div className="space-y-6">
      <SchoolHeader
        moduleKey="users"
        title="All Users"
        subtitle={`${MOCK_USERS.length} users across ${MOCK_TENANTS.length} tenants`}
        actions={
          <>
            <ExportButton data={MOCK_USERS} filename="users" />
            <button className="btn-primary" onClick={() => setShowNew(true)}>
              <Plus size={15} /> Add user
            </button>
          </>
        }
      />

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search users…" className="input py-2 pl-9" />
          {q && <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"><X size={14} /></button>}
        </div>
        <select className="input w-auto py-2" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All roles</option>
          {USER_ROLES.map((r) => <option key={r} value={r}>{label(r)}</option>)}
        </select>
      </div>

      <div className="card overflow-hidden">
        {list.length === 0
          ? <Empty title="No users found" />
          : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th><th>Tenant</th><th>Role</th><th>Status</th><th>Joined</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <Avatar name={u.full_name} size={32} />
                          <div>
                            <div className="font-semibold text-ink">{u.full_name}</div>
                            <div className="text-[12px] text-slate-400">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-[13px] text-slate-600">{u.tenant}</td>
                      <td><Badge value={u.role} /></td>
                      <td><Badge value={u.status} /></td>
                      <td className="text-[13px] text-slate-500">{fmtDate(u.created_at)}</td>
                      <td>
                        <button className="btn-ghost py-1 px-2 text-[13px]" onClick={() => setEditing(u)}>Edit</button>
                        <button className="btn-ghost py-1 px-2 text-[13px] text-amber-700 hover:bg-amber-50"
                          onClick={() => setDeleting(u.id)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>

      <UserModal open={showNew} tenants={MOCK_TENANTS} onClose={() => setShowNew(false)}
        onSave={(d) => { console.log("create user", d); setShowNew(false); }} />
      <UserModal open={!!editing} initial={editing ?? {}} tenants={MOCK_TENANTS}
        onClose={() => setEditing(null)}
        onSave={(d) => { console.log("update user", d); setEditing(null); }} />
      <ConfirmDialog open={!!deleting} onClose={() => setDeleting(null)}
        onConfirm={() => { setDeleting(null); }}
        title="Remove user" message="This will delete the user account permanently." />
    </div>
  );
}
