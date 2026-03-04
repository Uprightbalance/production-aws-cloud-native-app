import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/Button";
import { fetchCompanyInfo } from "../api/client";

export default function Home() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const { data } = await fetchCompanyInfo();
        if (isMounted) {
          setCompany(data);
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message || "Failed to load company information.");
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
      <div className="flex flex-1 flex-col justify-center gap-8">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            MR. BAFFO Dry Cleaning – Toronto
          </h1>
          {loading && <p className="text-sm text-slate-500">Loading company information…</p>}
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}
          {company && (
            <>
              <p className="max-w-2xl text-sm text-slate-700">{company.description}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Services
                  </h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {company.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Service Areas
                  </h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {company.service_areas.map((area) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-slate-700">
                <span className="font-semibold">Contact:</span>
                <span>Phone: {company.phone}</span>
                <span>Email: {company.email}</span>
              </div>
            </>
          )}
        </section>
        <section className="flex flex-wrap gap-3">
          <Button variant="primary">
            Book a Pickup
          </Button>
          <Button variant="secondary">
            Contact Us
          </Button>
        </section>
      </div>
    </MainLayout>
  );
}
