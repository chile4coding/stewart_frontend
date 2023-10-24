import AdminLayout from '@/components/admin/AdminLayout'
import OrderDetails from '@/components/admin/orders/OrderDetails'
import React from 'react'

export default function Orders() {
  return (
    <AdminLayout>
    <div className=' px-10 sm:px-4'>
        <OrderDetails/>
    </div>

    </AdminLayout>
  )
}
