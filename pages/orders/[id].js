import React from 'react'
import UserLayout from '@/components/userDashboardLayout/UserLayout'
import OrdersDetails from '@/components/userDashboardLayout/orders/OrderDetails'


export default function OrderDetail() {
  return (
    <UserLayout>

<div className=' px-10 sm:px-4 '>
       <OrdersDetails/>

</div>
    </UserLayout>
  )
}
