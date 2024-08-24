import ClassDetailsForm from "@/components/manager/ClassDetailsForm";
import UserMenu from "@/components/utils/UserMenu";
import UserWelcome from "@/components/utils/UserWelcome";
import SidebarLayout from "@/components/wrappers/SidebarLayout";
import React from "react";

const managerPage = () => {
  return (
    <div className="dark:bg-[#1E1E1E]">
      <SidebarLayout>
        <div>
          <div className="flex items-center justify-end">
            <UserMenu />
          </div>
          <UserWelcome welcomeMessage="welcome aboard to the TechTuto Management Team!" />
          <ClassDetailsForm />
        </div>
      </SidebarLayout>
    </div>
  );
};

export default managerPage;
