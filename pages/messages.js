import UserLayout from '@/components/userDashboardLayout/UserLayout'
import Inbox, { NoInbox } from '@/components/userDashboardLayout/inbox/Inbox'
import { handleGetMessages, handleGetNotification } from '@/redux/storeSlice'
import { getCookie, getMessages, getNotification } from '@/services/request'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MetaDataC } from './orders'

export default function Messages() {
  const dispatch  =  useDispatch()
   const { orders, orderDetails, user,messages } = useSelector((state) => state.store);

  useEffect(()=>{
    const token = getCookie()

    async function myNotification(){
      const res = await getMessages(token)
       const data = await res.json();
       dispatch(handleGetMessages(data.inbox))
       const response = await getNotification(token)
       const dataN =  await  response.json();
       dispatch(handleGetNotification(dataN.inbox))
    }

    myNotification()
  }, [])


  return (
    <><MetaDataC title="Messages"/>
    
    <UserLayout>
      <div className="px-10 sm:px-4 mt-6 max-h-[100vh]  overflow-y-scroll">
        {messages && messages.length > 0 && (
          <Inbox message={messages} />
        )}
        {messages && messages.length === 0 && <NoInbox />}
      </div>
    </UserLayout>
    
    </>
  );
}
