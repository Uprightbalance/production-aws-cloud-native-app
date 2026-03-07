import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { fetchServices } from "../api/client";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const loadServices = async () => {
      try {
        const { data } = await fetchServices();
        if (mounted) {
          setServices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load services.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadServices();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Services
        </h1>

        {loading && <p className="text-sm text-slate-500">Loading services…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {services.length > 0 ? (
              services.map((service) => (
                <li
                  key={service}
                  className="rounded-lg bg-white p-4 text-sm text-slate-800 shadow-sm"
                >
                  {service}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500">
                No services available at the moment.
              </li>
            )}
          </ul>
        )}
      </div>
    </MainLayout>
  );
}
