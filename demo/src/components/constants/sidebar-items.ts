import { Home, LucideIcon, Shield, User } from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

export const sidebarItems: SidebarGroup[] = [
  {
    label: "Applications",
    items: [
      {
        label: "Dashboard",
        href: "/Dashboard",
        icon: Home,
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        label: "Profile",
        href: "/profile",
        icon: User,
      },
    ],
  },
  {
    label: "Admins",
    items: [
      {
        label: "Admins",
        href: "/admin",
        icon: Shield,
      },
    ],
  },
];
