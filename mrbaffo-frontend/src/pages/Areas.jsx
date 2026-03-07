import { useEffect, useState } from "react";
import { fetchAreas } from "../services/business";

export default function Areas() {
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadAreas = async () => {
      try {
        const response = await fetchAreas();
        const data = response?.data || [];

        if (mounted) {
          setAreas(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Failed to load areas");
        }
      }
    };

    loadAreas();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error loading areas: {error}
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
            className="rounded-lg bg-white p-4 shadow"
          >
            <h2 className="font-semibold">{area.name}</h2>

            <p className="text-sm text-slate-600 mt-1">
              {area.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
