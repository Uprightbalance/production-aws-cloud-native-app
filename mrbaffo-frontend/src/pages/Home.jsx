import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goToPickup = () => {
    navigate("/pickup");
  };

  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <div className="mx-auto max-w-5xl p-6 text-center">
      <h1 className="text-3xl font-bold text-slate-900">
        Welcome to Our Laundry Service
      </h1>

      <p className="mt-4 text-slate-600">
        Professional laundry and dry cleaning with
        convenient pickup and delivery.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={goToPickup}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700"
        >
          Book a Pickup
        </button>

        <button
          onClick={goToContact}
          className="rounded-lg bg-slate-200 px-6 py-3 text-slate-800 font-medium hover:bg-slate-300"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}
