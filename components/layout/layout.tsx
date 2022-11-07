import Navigation from "./navigation";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <div>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 xl:px-0 py-8">
        {children}
      </main>
    </div>
  )
}