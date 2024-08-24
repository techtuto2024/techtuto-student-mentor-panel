"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IoIosMenu } from "react-icons/io";
import StudentSidebar from "@/components/student/StudentSidebar";
import MentorSidebar from "@/components/mentor/MentorSidebar";
import ManagerSidebar from "@/components/manager/ManagerSidebar";
import { Button } from "@/components/ui/button";

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(largeScreen);
      setIsOpen(largeScreen);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!isLargeScreen) {
      setIsOpen(open);
    }
  };

  const renderSidebarContent = () => {
    if (pathname?.startsWith("/student")) {
      return <StudentSidebar />;
    } else if (pathname?.startsWith("/mentor")) {
      return <MentorSidebar />;
    } else if (pathname?.startsWith("/manager")) {
      return <ManagerSidebar />;
    } else {
      return null;
    }
  };

  return (
    <div className="w-full md:h-screen dark:bg-[#1e1e1e]">
      {isLargeScreen ? (
        <div className="flex h-full">
          <div className="w-72 overflow-x-hidden h-full overflow-y-auto border-r border-gray-200 p-4">
            {renderSidebarContent()}
          </div>
          <div className="flex-grow overflow-y-auto p-4">{children}</div>
        </div>
      ) : (
        <div className="h-full p-2">
          <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
              <Button className="p-2 m-2 bg-violet-500 text-white rounded">
                <IoIosMenu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              {renderSidebarContent()}
            </SheetContent>
          </Sheet>
          <div className="p-2">{children}</div>
        </div>
      )}
    </div>
  );
};

export default SidebarLayout;