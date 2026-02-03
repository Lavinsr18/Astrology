import { useEffect, useState } from "react";
import { Trash2, Ban, CheckCircle, UserPlus } from "lucide-react";
import { cn } from "../lib/utils";

const API = import.meta.env.VITE_API_BASE_URL;



type User = {
  _id: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
  suspended: boolean;
  createdAt: string;
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"users" | "admins">("users");
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= FETCH ================= */
  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/admin/${tab}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [tab]);


  
const [form, setForm] = useState({
  fullName: "",
  email: "",
  phone: "",
  password: "",
});

  /* ================= ACTIONS ================= */

  const toggleStatus = async (id: string) => {
    await fetch(`${API}/api/admin/${tab}/${id}/toggle`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure? This action is irreversible")) return;

    await fetch(`${API}/api/admin/${tab}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

const createAccount = async () => {
  const endpoint =
    tab === "users" ? "/api/admin/users" : "/api/admin/admins";

  await fetch(`${API}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });

  setShowModal(false);
  setForm({ fullName: "", email: "", phone: "", password: "" });
  fetchData();
};


  return (
    <div>
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
  <h2 className="text-xl font-bold">User Management</h2>

  <div className="flex gap-2 items-center">
    <TabButton active={tab === "users"} onClick={() => setTab("users")}>
      Users
    </TabButton>
    <TabButton active={tab === "admins"} onClick={() => setTab("admins")}>
      Admins
    </TabButton>

    {/* ➕ ADD BUTTON */}
    <button
      onClick={() => setShowModal(true)}
      className="ml-3 flex items-center gap-2 bg-primary px-4 py-2 rounded-xl text-sm font-semibold"
    >
      <UserPlus size={16} />
      Add {tab === "users" ? "User" : "Admin"}
    </button>
  </div>
</div>


      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
          <thead className="bg-white/10">
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Created</Th>

            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-white/60">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-white/60">
                  No records found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <Td>{u.fullName || "—"}</Td>
                  <Td>{u.email}</Td>

                

                  <Td>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </Td>
                       
                  <Td className="flex gap-3">
                    

                    <button
                      onClick={() => deleteUser(u._id)}
                      title="Delete"
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
  <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
    <div className="bg-black/80 border border-white/10 rounded-2xl p-6 w-full max-w-md">

      <h3 className="text-lg font-bold mb-4">
        Create New {tab === "users" ? "User" : "Admin"}
      </h3>

      <div className="space-y-3">
        <input
          placeholder="Full Name"
          value={form.fullName}
          onChange={e => setForm({ ...form, fullName: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10"
        />

        {tab === "users" && (
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10"
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded-lg bg-white/10"
        >
          Cancel
        </button>

        <button
          onClick={createAccount}
          className="px-4 py-2 rounded-lg bg-primary font-semibold"
        >
          Create
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    
  );

  
}



/* ================= UI ================= */

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-xl text-sm transition",
        active
          ? "bg-primary text-white"
          : "bg-white/10 text-white/70 hover:bg-white/20"
      )}
    >
      {children}
    </button>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-left">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3">{children}</td>;
}
