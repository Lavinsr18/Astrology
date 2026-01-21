import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Trash2, CheckCircle, Mail, Phone } from "lucide-react";

export default function QueriesAdmin() {
  const [queries, setQueries] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
const [deleting, setDeleting] = useState(false);

 const confirmDelete = async () => {
  if (!deleteId) return;

  try {
    setDeleting(true);
    await api.adminDelete(`/api/admin/queries/${deleteId}`);

    setQueries((q) => q.filter((x) => x._id !== deleteId));
    setDeleteId(null);
  } finally {
    setDeleting(false);
  }
};

  useEffect(() => {
    api.adminGet("/api/admin/queries").then(setQueries);
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this query?")) return;
    await api.adminDelete(`/api/admin/queries/${id}`);
    setQueries((q) => q.filter((x) => x._id !== id));
  };

  const markReplied = async (id: string) => {
    const updated = await api.adminPut(`/api/admin/queries/${id}/reply`, {});
    setQueries((q) =>
      q.map((item) => (item._id === id ? updated : item))
    );
  };

  if (queries.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white">Queries</h1>
        <p className="text-center text-white/60 py-20">
        No queries received yet
      </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
       
      {queries.map((q) => (
        <div
          key={q._id}
          className="bg-white/10 border border-white/10 rounded-2xl p-5"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-white">{q.name}</h3>

              <div className="flex gap-4 text-xs text-white/60 mt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {q.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {q.phone}
                </span>
              </div>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                q.status === "replied"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {q.status}
            </span>
          </div>

          <p className="mt-4 text-sm text-white/80 leading-relaxed">
            {q.message}
          </p>

          <div className="flex justify-between items-center mt-5">
            <span className="text-xs text-white/40">
              {new Date(q.createdAt).toLocaleString()}
            </span>

            <div className="flex gap-4">
              {q.status !== "replied" && (
                <button
                  onClick={() => markReplied(q._id)}
                  className="flex items-center gap-1 text-green-400 hover:underline"
                >
                  <CheckCircle className="w-4 h-4" />
                  Reply
                </button>
              )}

             <button
  onClick={() => setDeleteId(q._id)}
  className="flex items-center gap-1 text-red-400 hover:underline"
>
  <Trash2 className="w-4 h-4" />
  Delete
</button>

            </div>
          </div>
        </div>
        
      ))}
      {deleteId && (
  <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-[#12091f] border border-white/10 rounded-2xl p-6">

      <h3 className="text-xl font-semibold text-white mb-2">
        Delete Query
      </h3>

      <p className="text-white/70 text-sm mb-6">
        Are you sure you want to permanently delete this query?
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setDeleteId(null)}
          className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10"
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          disabled={deleting}
          className={`px-5 py-2 rounded-lg font-semibold
            ${
              deleting
                ? "bg-red-500/40 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }
          `}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );

}
