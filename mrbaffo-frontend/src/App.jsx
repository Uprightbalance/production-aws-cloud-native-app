import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Areas from "./pages/Areas";
import Contact from "./pages/Contact";
import Pickup from "./pages/Pickup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/areas" element={<Areas />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pickup" element={<Pickup />} />
    </Routes>
  );
}
