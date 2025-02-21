import {
  type LucideIcon,
} from "lucide-react"
import { Link } from "react-router-dom";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }
}) {

  return (
    <>
      <SidebarMenuItem key={projects.name}>
        <SidebarMenuButton asChild>
            <Link to={projects.url}>
              <projects.icon />
              <span>{projects.name}</span>
            </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  )
}
