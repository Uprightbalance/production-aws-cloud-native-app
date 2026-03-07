import { useEffect, useState } from "react";
import { fetchServices } from "../services/business";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        const response = await fetchServices();
        const { data } = response;

        if (isMounted) {
          setServices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load services.");
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

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <p className="text-slate-600">Loading services...</p>
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
      <h1 className="text-2xl font-bold mb-6">Our Services</h1>

      <ul className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <li
            key={service.name}
            className="rounded-lg bg-white p-4 shadow-sm border"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {service.name}
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              {service.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
