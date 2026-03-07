import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { fetchAreas } from "../api/client";

export default function Areas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const loadAreas = async () => {
      try {
        const { data } = await fetchAreas();
        if (mounted) {
          setAreas(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load areas.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadAreas();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Service Areas
        </h1>

        {loading && <p className="text-sm text-slate-500">Loading service areas…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {areas.length > 0 ? (
              areas.map((area) => (
                <li
                  key={area}
                  className="rounded-lg bg-white p-4 text-sm text-slate-800 shadow-sm"
                >
                  {area}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500">
                No areas available at the moment.
              </li>
            )}
          </ul>
        )}
      </div>
    </MainLayout>
  );
}
