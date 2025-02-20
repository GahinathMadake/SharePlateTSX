import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Import Components
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import logo from '@/assets/logobg.png';


export function TeamSwitcher(): JSX.Element {
  const { user } = useAuth();

  const [teams, setTeams] = useState({
    name: "SharePlate",
    logo: logo,
    plan: "India",
  });

  useEffect(() => {
    if (user) {
      setTeams((prevTeams) => ({
        ...prevTeams, // Keep previous state
        plan: user.role, // Update only `plan`
      }));
    }
  }, [user]);  

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <img src={teams.logo} alt="logo" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {teams.name}
            </span>
            <span className="truncate text-xs">{teams.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}