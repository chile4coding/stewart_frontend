import React from 'react'
import UserLayout from '@/components/userDashboardLayout/UserLayout'
import OrdersTable from '@/components/userDashboardLayout/orders/OrdersTable'

export default function Orders() {
  return (
   <UserLayout>
<main className=' px-10 '>
   <OrdersTable/>
  
</main>
    
   </UserLayout>
  )
}
