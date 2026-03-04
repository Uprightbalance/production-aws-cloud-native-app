import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { submitPickupRequest } from "../api/client";

export default function Pickup() {
  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    service_type: "",
    preferred_date: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await submitPickupRequest(form);
      setSuccessMessage("Thank you! Your pickup request has been submitted.");
      setForm({
        customer_name: "",
        email: "",
        phone: "",
        address: "",
        service_type: "",
        preferred_date: "",
        notes: ""
      });
    } catch (e) {
      setError(e.message || "Failed to submit your pickup request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Pickup Request
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Schedule a pickup for your garments. We&apos;ll confirm details with you before arrival.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
          <Input
            label="Customer Name"
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            placeholder="Your full name"
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 647 575 7404"
            required
          />
          <Input
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Street, city, postal code"
            required
          />
          <Input
            label="Service Type"
            name="service_type"
            value={form.service_type}
            onChange={handleChange}
            placeholder="e.g. Dry cleaning, Laundry, Alterations"
            required
          />
          <Input
            label="Preferred Date"
            name="preferred_date"
            type="date"
            value={form.preferred_date}
            onChange={handleChange}
            required
          />
          <Input
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Apartment buzzer, special instructions, etc."
            textarea
          />

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-sm text-emerald-700">
              {successMessage}
            </p>
          )}

          <div className="pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting…" : "Submit Pickup Request"}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
