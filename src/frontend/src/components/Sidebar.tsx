import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  BrainCircuit,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Mic,
  User,
} from "lucide-react";
import { useState } from "react";
import { useGetProfile } from "../lib/backendQueries";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "Resume Builder", icon: FileText },
  { to: "/interview", label: "Interview Q&A", icon: MessageSquare },
  { to: "/mock-interview", label: "Mock Interview", icon: Mic },
  { to: "/study", label: "Study Topics", icon: BookOpen },
  { to: "/analytics", label: "Analytics", icon: BarChart2 },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function Sidebar() {
  const { clear, identity } = useInternetIdentity();
  const { data: profile } = useGetProfile();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [collapsed, setCollapsed] = useState(false);

  const principalStr = identity?.getPrincipal().toText() ?? "";
  const shortPrincipal =
    principalStr.length > 12
      ? `${principalStr.slice(0, 5)}...${principalStr.slice(-4)}`
      : principalStr;

  return (
    <aside
      className={`flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-smooth ${collapsed ? "w-16" : "w-60"}`}
      data-ocid="sidebar"
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-2.5 px-4 py-5 border-b border-sidebar-border ${collapsed ? "justify-center px-2" : ""}`}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-md bg-accent flex items-center justify-center glow-accent">
          <BrainCircuit
            className="w-4.5 h-4.5 text-accent-foreground"
            size={18}
          />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            AIPS
          </span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1 rounded hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-smooth"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          data-ocid="sidebar.toggle"
        >
          <ChevronLeft
            size={14}
            className={`transition-smooth ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto"
        data-ocid="sidebar.nav"
      >
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const isActive =
            currentPath === to || currentPath.startsWith(`${to}/`);
          return (
            <Link
              key={to}
              to={to}
              className={isActive ? "nav-item-active" : "nav-item"}
              title={collapsed ? label : undefined}
              data-ocid={`sidebar.nav.${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="border-t border-sidebar-border p-3">
        {!collapsed && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
              <User size={12} className="text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground truncate">
                {profile?.name ?? "Authenticated"}
              </p>
              <p className="text-micro truncate">{shortPrincipal}</p>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={clear}
          className={`w-full nav-item text-destructive hover:text-destructive hover:bg-destructive/10 ${collapsed ? "justify-center" : ""}`}
          data-ocid="sidebar.logout_button"
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
