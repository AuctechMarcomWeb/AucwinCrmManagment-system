import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

/**
 * ExportButton — downloads data as CSV.
 *
 * @param {{ data: object[], filename?: string, label?: string }} props
 */
export function ExportButton({ data = [], filename = "export", label = "Export CSV" }) {
  const [busy, setBusy] = useState(false);

  function download() {
    if (!data.length) return;
    setBusy(true);
    try {
      const headers = Object.keys(data[0]);
      const rows    = data.map((row) =>
        headers.map((h) => JSON.stringify(row[h] ?? "")).join(","),
      );
      const csv  = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      className="btn-secondary"
      onClick={download}
      disabled={busy || !data.length}
      title={!data.length ? "No data to export" : undefined}
    >
      {busy ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
      {label}
    </button>
  );
}
