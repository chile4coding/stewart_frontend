import UserLayout from '@/components/userDashboardLayout/UserLayout'
import SavedItemsDetails, { NoSavedItems } from '@/components/userDashboardLayout/savedItems/SavedItems'
import { setUser } from '@/redux/storeSlice';
import { getCookie, getCurrentUser } from '@/services/request';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MetaDataC } from './orders';

export default function SavedItems() {
   const { user, toggleMode, singleProduct } = useSelector(
     (state) => state.store
   );
const dispatch  = useDispatch()
   useEffect(()=>{
    const token  = getCookie()
    if(token){
      async  function getUser(){
   const resp = await getCurrentUser(token);
   const user = await resp.json();
   
   dispatch(setUser(user?.user));
      }
      getUser()
    }


   }, [])
  return (

    <>


      <MetaDataC title="Saved Items"/>
       <UserLayout>
      <div className=" px-10 sm:ps-4 max-h-[100vh]  overflow-y-scroll">
        {user?.save_items?.length > 0 ? (
          <SavedItemsDetails />
        ) : (
          <NoSavedItems />
        )}
      </div>
    </UserLayout>
    </>
   
  );
}
