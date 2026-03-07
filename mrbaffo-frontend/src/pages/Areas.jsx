import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { fetchAreas } from "../api/client";

export default function Areas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadAreas() {
      try {
        const { data } = await fetchAreas();

        if (isMounted) {
          setAreas(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load service areas");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAreas();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Service Areas</h1>

        {loading && (
          <p className="text-slate-500">Loading service areas...</p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {!loading && !error && (
          <ul className="grid gap-4 md:grid-cols-2">
            {areas.map((area) => (
              <li
                key={area.name}
                className="rounded-lg bg-white p-5 shadow-sm border"
              >
                <h2 className="text-lg font-semibold">
                  {area.name}
                </h2>

                <p className="text-sm text-slate-600 mt-2">
                  {area.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  );
}
