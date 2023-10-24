import AdminLayout from '@/components/admin/AdminLayout'
import AdminSettings from '@/components/admin/settings/AdminSettings'
import React from 'react'

export default function Settings() {
  return (
    <AdminLayout>
        <main className='px-10 sm:px-4'>
            <AdminSettings/>
        </main>
    </AdminLayout>
  )
}
