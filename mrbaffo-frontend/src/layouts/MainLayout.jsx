import Navbar from "../components/Navbar";
import Container from "../components/Container";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <Container>{children}</Container>
      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} MR. BAFFO Dry Cleaning – Toronto</span>
          <span>+1 647 575 7404 · uprightwitdbalance@gmail.com</span>
        </div>
      </footer>
    </div>
  );
}
