import {
  type LucideIcon,
} from "lucide-react"

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
            <a href={projects.url}>
              <projects.icon />
              <span>{projects.name}</span>
            </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  )
}
