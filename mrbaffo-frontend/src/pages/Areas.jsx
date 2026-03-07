import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { fetchAreas } from "../api/client";

export default function Areas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const { data } = await fetchAreas();
        if (isMounted) {
          // Backend contract: data is string[]
          setAreas(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message || "Failed to load service areas.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <MainLayout>
      <div className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Service Areas
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            MR. BAFFO proudly serves neighbourhoods across Toronto.
          </p>
        </header>

        {loading && (
          <p className="text-sm text-slate-500">Loading service areas…</p>
        )}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {areas.map((area) => (
              <li
                key={area}
                className="rounded-lg bg-white p-4 text-sm text-slate-800 shadow-sm"
              >
                {area}
              </li>
            ))}
            {areas.length === 0 && (
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
