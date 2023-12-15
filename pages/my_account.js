import React, { useEffect } from 'react'
import UserLayout from '@/components/userDashboardLayout/UserLayout'
import Accountupdate from '@/components/userDashboardLayout/Account/Accountupdate'
import ProfileUpdate from '@/components/userDashboardLayout/Account/ProfileUpdate'
import { getCookie, getCurrentUser } from '@/services/request'
import { setUser, getSingleOrders, getuserOrders } from "@/redux/storeSlice";
import { useDispatch, useSelector } from 'react-redux'
import { MetaDataC } from './orders'

export default function Account() {
 const { orders, orderDetails, user } = useSelector((state) => state.store);
  
  const dispatch  = useDispatch()

  useEffect(()=>{
  const token  = getCookie()
dispatch(getuserOrders(user.orders));
  async function fetchRequest(){
          if (Boolean(token)) {
            const response = await getCurrentUser(token);
            if (response.status === 200) {
              const user = await response.json();
              dispatch(setUser(user?.user));
            }
          }
  }

fetchRequest()

  },[])
  return (
    <>
      <MetaDataC  title="Dashboard"/>

      <UserLayout>
        <div className=" grid grid-cols-2 gap-8 px-10 sm:px-4 sm:grid-cols-1 max-h-[100vh]  overflow-y-scroll">
          <Accountupdate />
          <ProfileUpdate />
        </div>
      </UserLayout>
    </>
  );
}
