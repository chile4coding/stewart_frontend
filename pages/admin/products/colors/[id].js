import AdminLayout from '@/components/admin/AdminLayout'
import AddProductColor from '@/components/admin/products/AddProductColor'
import React from 'react'

export default function Colors() {
  return (
    <AdminLayout>
        <main className=' px-10 sm:px-4'>
            <AddProductColor/>
        </main>
    </AdminLayout>
  )
}
