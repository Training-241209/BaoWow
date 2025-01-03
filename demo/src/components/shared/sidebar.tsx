import React from "react";
import { LucideIcon, SidebarIcon } from "lucide-react";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const { mounted } = useSidebar();

  if (!mounted) return null;

  return <div className="flex">{children}</div>;
}

export function SidebarTrigger() {
  const { toggle } = useSidebar();

  return (
    <SidebarIcon className="fixed m-5" role="button" onClick={() => toggle()} />
  );
}

export function SidebarChildren({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out w-full",
        isOpen ? "ml-64" : "ml-0"
      )}
    >
      {children}
    </div>
  );
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div
      className={cn(
        "min-h-[calc(100vh-65px)] max-h-[calc(100vh-65px)] bg-slate-900 transition-all duration-300 ease-in-out fixed text-white overflow-y-auto overflow-x-hidden",
        isOpen ? "w-64" : "w-0"
      )}
    >
      {children}
    </div>
  );
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-10">{children}</div>;
}

export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col px-2">{children}</div>;
}

export function SidebarLabel({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  return (
    <Label
      className={cn(
        "text-muted-foreground h-9 flex items-center px-4",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {children}
    </Label>
  );
}

export function SidebarItem({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon: LucideIcon;
}) {
  const { isOpen } = useSidebar();

  return (
    <Button variant={"ghost"} className="flex justify-start">
      <Icon />
      <Link
        to={href}
        className={cn(isOpen ? "opacity-100" : "opacity-0 pointer-events-none")}
      >
        {label}
      </Link>
    </Button>
  );
}
