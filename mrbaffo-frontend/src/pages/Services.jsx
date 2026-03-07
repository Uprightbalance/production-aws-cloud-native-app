import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { fetchServices } from "../api/client";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        const { data } = await fetchServices();

        if (isMounted) {
          setServices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load services");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Our Services</h1>

        {loading && (
          <p className="text-slate-500">Loading services...</p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.name}
                className="rounded-lg bg-white p-5 shadow-sm border"
              >
                <h2 className="text-lg font-semibold">
                  {service.name}
                </h2>

                <p className="text-sm text-slate-600 mt-2">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
