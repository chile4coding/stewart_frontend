import UserLayout from '@/components/userDashboardLayout/UserLayout'
import Inbox, { NoInbox } from '@/components/userDashboardLayout/inbox/Inbox'
import React from 'react'

export default function Messages() {
  return (
    <UserLayout>
        <div className='px-10 sm:px-4 mt-6'>
            <Inbox/>
            {/* <NoInbox/> */}

        </div>
    </UserLayout>
  )
}
