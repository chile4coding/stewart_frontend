import AdminLayout from '@/components/admin/AdminLayout'
import OverviewDetails from '@/components/admin/overview/OverviewDetails'
import React from 'react'

export default function AdminHome() {
  return (<AdminLayout>
  <div className=' px-10 sm:px-4'>
    <OverviewDetails/>
  </div>

  </AdminLayout>
  )
}
