import React from 'react'
import UserLayout from '@/components/userDashboardLayout/UserLayout'
import OrdersTable from '@/components/userDashboardLayout/orders/OrdersTable'
import { getuserOrders, setUser } from '@/redux/storeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie, getCurrentUser } from '@/services/request';
import { useEffect } from 'react';
export default function Orders() {
    const { user, toggleMode } = useSelector((state) => state.store);

     const dispatch = useDispatch();

     useEffect(() => {
       const token = getCookie();
       dispatch(getuserOrders(user.orders));
       async function fetchRequest() {
         if (Boolean(token)) {
           const response = await getCurrentUser(token);
           if (response.status === 200) {
             const user = await response.json();
             dispatch(setUser(user?.user));
           }
         }
       }

       fetchRequest();
     }, []);
  return (
   <UserLayout>
<main className=' px-10 '>
   <OrdersTable/>
  
</main>
    
   </UserLayout>
  )
}
