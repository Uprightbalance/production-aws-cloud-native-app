import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { submitContact } from "../api/client";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
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
      await submitContact(form);
      setSuccessMessage("Thank you! Your message has been sent.");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (e) {
      setError(e.message || "Failed to submit your message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-xl space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Contact Us
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Have a question about our services, pricing, or turnaround time? We&apos;d love to hear from you.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
          <Input
            label="Name"
            name="name"
            value={form.name}
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
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="How can we help?"
            required
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
              {loading ? "Sending…" : "Send Message"}
            </Button>
          </div>
        </form>

        <section className="rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          <h2 className="text-sm font-semibold">Direct Contact</h2>
          <p className="mt-1">
            Phone: <span className="font-mono">+1 647 575 7404</span>
          </p>
          <p>
            Email:{" "}
            <span className="font-mono">uprightwitdbalance@gmail.com</span>
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
