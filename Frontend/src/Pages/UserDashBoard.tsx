import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

import { 
  LayoutDashboard,
  House,
  Captions,
  CircleUserRound,
  Bell,
  GalleryVerticalEnd,
} from "lucide-react";

const data = {
  user: {
    name: "Gahinath Madake",
    email: "gahinathmadake@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  Platform: {
    name: "AI Tutor",
    logo: GalleryVerticalEnd,
    plan: "MITAOE",
  },
  navMenu: [
      {
          name: "Dashboard",
          url: "/student",
          icon: LayoutDashboard, 
      },
      { 
          name: "SiteHome", 
          url: "/student/sitehome", 
          icon: House,
      },
      {
          title: "Courses",
          url: "#",
          icon: Captions,
          isActive: false,
          items:[
              {
                  title:"Ongoing",
                  url:'/student/courses/ongoing'
              },
              {
                  title:"Completed",
                  url:'/student/courses/completed'
              },
              {
                  title:"All",
                  url:'/student/courses/All'
              },
          ],
          
      },
      {
          name: "Notifications",
          url: "/student/notifications",
          icon: Bell, 
      },
      {
          name: "Help",
          url: "/student/help",
          icon: CircleUserRound, 
      },
  ],
};

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar data={data}/>
      <SidebarInset>
        <header className="py-2 flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    NGO
                  </BreadcrumbLink>
                </BreadcrumbItem>
                
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <hr />

        <div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
