import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from "@/components/app-sidebar";
import { LucideIcon } from 'lucide-react';
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

interface AdminData {
    navMenu: MenuItem[];
}

interface UserDashboardProps {
    data: AdminData;
}


const UserDashboard: React.FC<UserDashboardProps> = ({ data }) => {

    return (
        <SidebarProvider>
            <AppSidebar data={data} />
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
    );
};

export default UserDashboard;