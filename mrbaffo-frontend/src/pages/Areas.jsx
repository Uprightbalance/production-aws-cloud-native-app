import { useEffect, useState } from "react";
import { fetchAreas } from "../services/business";

export default function Areas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadAreas() {
      try {
        const response = await fetchAreas();
        const { data } = response;

        if (isMounted) {
          setAreas(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load areas.");
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

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <p className="text-slate-600">Loading service areas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold mb-6">Service Areas</h1>

      <ul className="grid gap-4 sm:grid-cols-2">
        {areas.map((area) => (
          <li
            key={area.name}
            className="rounded-lg bg-white p-4 shadow-sm border"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {area.name}
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              {area.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
