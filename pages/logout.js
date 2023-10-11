import UserLayout from '@/components/userDashboardLayout/UserLayout'
import LogoutModal from '@/components/userDashboardLayout/logout/LogoutModal'
import React from 'react'

export default function Logout() {
  return (
   <UserLayout>
    <div className=' h-[100vh]'><LogoutModal/></div>
   </UserLayout>
  )
}
