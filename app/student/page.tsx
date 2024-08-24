import StudentClassDetails from '@/components/student/StudentClassDetails'
import UserWelcome from '@/components/utils/UserWelcome'
import UserMenu from '@/components/utils/UserMenu'
import SidebarLayout from '@/components/wrappers/SidebarLayout'
import React from 'react'

const StudentPage = () => {
  return (
    <div className="dark:bg-[#1E1E1E]">
      <SidebarLayout>
        <div>
          <div className="flex items-center justify-end">
            <UserMenu />
          </div>
          <UserWelcome welcomeMessage='welcome to your learning journey!' />
          <StudentClassDetails />
        </div>
      </SidebarLayout>
    </div>
  )
}

export default StudentPage