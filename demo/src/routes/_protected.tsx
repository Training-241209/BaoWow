import { sidebarItems } from "@/components/constants/sidebar-items";
import { Navbar } from "@/components/shared/navabr";
import {
  Sidebar,
  SidebarChildren,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarLabel,
  SidebarTrigger,
  SidebarWrapper,
} from "@/components/shared/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-[200vh]">
      <Navbar />

      <SidebarWrapper>
        <Sidebar>
          <SidebarContent>
            {sidebarItems.map((group) => (
              <SidebarGroup key={group.label}>
                <SidebarLabel>{group.label}</SidebarLabel>
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                  />
                ))}
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>

        <SidebarChildren>
          <SidebarTrigger />
          <main className="max-w-screen-2xl mx-auto w-11/12 py-16">
            <Outlet />
          </main>
        </SidebarChildren>
      </SidebarWrapper>
    </div>
  );
}
