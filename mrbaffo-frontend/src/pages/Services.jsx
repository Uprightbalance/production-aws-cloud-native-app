import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { fetchServices } from "../api/client";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const { data } = await fetchServices();
        if (isMounted) {
          // Backend contract: data is string[]
          setServices(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message || "Failed to load services.");
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
            Services
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Professional dry cleaning, laundry, alterations, and more.
          </p>
        </header>

        {loading && (
          <p className="text-sm text-slate-500">Loading services…</p>
        )}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <li
                key={service}
                className="rounded-lg bg-white p-4 text-sm text-slate-800 shadow-sm"
              >
                {service}
              </li>
            ))}
            {services.length === 0 && (
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
