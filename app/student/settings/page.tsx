import SidebarLayout from "@/components/wrappers/SidebarLayout";
import React from "react";

import UserMenu from "@/components/utils/UserMenu";
import UserInfo from "@/components/utils/UserInfo";

const StudentSettings = () => {
  return (
    <div className="dark:bg-[#1E1E1E]">
      <SidebarLayout>
        <div>
          <div className="flex items-center justify-end">
            <UserMenu />
          </div>
          <UserInfo />
        </div>
      </SidebarLayout>
    </div>)
};

export default StudentSettings;
