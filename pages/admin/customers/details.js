import AdminLayout from '@/components/admin/AdminLayout'
import SingleCustomer from '@/components/admin/customers/SingleCustomer'
import React from 'react'

export default function Customer() {
  return (
    <AdminLayout>
        <main className=' px-10 sm:px-4'>
            <SingleCustomer/>
        </main>
    </AdminLayout>
  )
}
