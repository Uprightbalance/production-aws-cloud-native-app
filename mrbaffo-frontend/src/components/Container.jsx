export default function Container({ children }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col px-4 py-8">
      {children}
    </div>
  );
}
