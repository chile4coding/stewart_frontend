import AdminLayout from '@/components/admin/AdminLayout'
import RevieswDetails from '@/components/admin/reviews/RevieswDetails'
import React from 'react'

export default function Reviews() {
  return (
    <AdminLayout>
        <main className=' px-10 sm:px-4'>
        <RevieswDetails/>

        </main>
    </AdminLayout>
  )
}
