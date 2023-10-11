import React from 'react'
import UserLayout from '@/components/userDashboardLayout/UserLayout'
import Accountupdate from '@/components/userDashboardLayout/Account/Accountupdate'
import ProfileUpdate from '@/components/userDashboardLayout/Account/ProfileUpdate'

export default function Account() {
  return (
    <UserLayout>
    <div className=' grid grid-cols-2 gap-8 px-10 sm:px-4 sm:grid-cols-1'>
    <Accountupdate/>
    <ProfileUpdate/>

    </div>

    </UserLayout>
  )
}
