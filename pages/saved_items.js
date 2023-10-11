import UserLayout from '@/components/userDashboardLayout/UserLayout'
import SavedItemsDetails, { NoSavedItems } from '@/components/userDashboardLayout/savedItems/SavedItems'
import React from 'react'

export default function SavedItems() {
  return (
  <UserLayout>
    <div className=' px-10 sm:ps-4'>
    <SavedItemsDetails/>

    {/* <NoSavedItems/> */}

    </div>
  </UserLayout>
  )
}
