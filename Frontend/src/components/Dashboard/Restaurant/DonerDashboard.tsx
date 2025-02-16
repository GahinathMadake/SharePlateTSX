import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import logo from "../../../assets/logo.png";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  House,
  Captions,
  CircleUserRound,
  Bell,
} from "lucide-react";

// Sidebar data
const data = {
  user: {
    name: "Shreyash Padase",
    email: "gahinathmadake@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  Platform: {
    name: "SharePlate",
    logo:logo,
    plan: "Doner",
  },
  navMenu: [
    {
      name: "Donate",
      url: "/restaurant/Donatemain",
      icon: LayoutDashboard,
    },
    {
      name: "Past Donations",
      url: "/restaurant/past-donations",
      icon: House,
    },
    {
      name: "Track Location",
      url: "/restaurant/track-location",
      icon: Captions,
    },
    {
      name: "Notifications",
      url: "/restaurant/notifications",
      icon: Bell,
    },
    {
        name: "Profile",
        url: "/restaurant/profile",
        icon: CircleUserRound,
      },
  ],
};

const DonerDashboard: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <SidebarInset>
        <header className="py-2 flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 p-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Restaurant</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <hr />

        {/* Render nested routes dynamically */}
        <div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DonerDashboard;