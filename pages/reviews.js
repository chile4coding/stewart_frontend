import UserLayout from '@/components/userDashboardLayout/UserLayout'
import ReviewDetails from '@/components/userDashboardLayout/reviews/ReviewDetails'
import React from 'react'


export default function Reviews() {
  return (
   
    <UserLayout>
    <div className=' px-10 sm:px-4'>
<ReviewDetails/>

    </div>
    </UserLayout>
  )
}
