import MainLayout from "../layouts/MainLayout";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex flex-1 flex-col justify-center gap-8">
        <section className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            MR. BAFFO Dry Cleaning – Toronto
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-slate-700">
            Professional laundry, dry cleaning, and pickup services tailored for you.
          </p>
        </section>

        <section className="flex justify-center gap-3">
          <Button variant="primary" onClick={() => navigate("/pickup")}>
            Book a Pickup
          </Button>
          <Button variant="secondary" onClick={() => navigate("/contact")}>
            Contact Us
          </Button>
        </section>
      </div>
    </MainLayout>
  );
}
