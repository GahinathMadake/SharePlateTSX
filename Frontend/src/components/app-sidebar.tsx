
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


import { LucideIcon } from "lucide-react";
// Define types for the props
interface BaseMenuItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface SubMenuItem {
  title: string;
  url: string;
  items: { title: string; url: string }[];
  icon: LucideIcon;
  isActive: boolean;
}

type MenuItem = BaseMenuItem | SubMenuItem;

interface Data {
  navMenu: MenuItem[];
}

interface AppSidebarProps {
  data: Data;
}

export function AppSidebar({ data }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        {/* Sidebar menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>

          <SidebarMenu>
          {data.navMenu.map((menu, index) => {
            if ("items" in menu) {
              return <NavMain key={index} item={{ ...menu, icon: menu.icon as LucideIcon }} />;
            } else {
              return <NavProjects key={index} projects={{ ...menu, icon: menu.icon as LucideIcon }} />;
            }
          })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
