import { useEffect, useState } from "react";
import { fetchServices } from "../services/business";

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadServices = async () => {
      try {
        const response = await fetchServices();
        const data = response?.data || [];

        if (mounted) {
          setServices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Failed to load services");
        }
      }
    };

    loadServices();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error loading services: {error}
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
            className="rounded-lg bg-white p-4 shadow"
          >
            <h2 className="font-semibold">{service.name}</h2>

            <p className="text-sm text-slate-600 mt-1">
              {service.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
