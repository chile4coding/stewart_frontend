import AdminLayout from '@/components/admin/AdminLayout'
import AddProducts from '@/components/admin/products/AddProduct'
import React from 'react'


export default function AddProduct(){
  return (

    <AdminLayout>
<div className=' px-10 sm:px-4'>
    <AddProducts/>
</div>

    </AdminLayout>

  )
}

