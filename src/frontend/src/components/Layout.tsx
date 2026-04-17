import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  showSidebar?: boolean;
}

const Attribution = () => (
  <footer className="bg-card border-t border-border py-3 px-6 flex-shrink-0">
    <p className="text-center text-micro">
      &copy; {new Date().getFullYear()}.{" "}
      <a
        href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        Built with love using caffeine.ai
      </a>
    </p>
  </footer>
);

export function Layout({ showSidebar = true }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {showSidebar && <Sidebar />}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <Attribution />
      </main>
    </div>
  );
}

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
