import React from 'react'
import UserLayout from '@/components/userDashboardLayout/UserLayout'
import OrdersDetails from '@/components/userDashboardLayout/orders/OrderDetails'
import { MetaDataC } from '.';


export default function OrderDetail() {
  return (

    <>

    <MetaDataC title="Order Details"/>
    <UserLayout>
      <div className=" px-10 sm:px-4  max-h-[100vh]  overflow-y-scroll">
        <OrdersDetails />
      </div>
    </UserLayout>

    </>
  );
}
