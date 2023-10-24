import AdminLayout from '@/components/admin/AdminLayout'
import ProductColor from '@/components/admin/products/ProductColor'
import React from 'react'

export default function Details() {
  return (
 <AdminLayout>
    <main className=' px-10 sm:px-4'>
        <ProductColor/>
    </main>
 </AdminLayout>
  )
}
