import AdminLayout from '@/components/admin/AdminLayout'
import SentMessage from '@/components/admin/message/SentMessage';
import { MetaDataC } from '@/pages/orders';
import { handleGetMessages } from '@/redux/storeSlice';
import { adminMessages, getCookie, sendMessage } from '@/services/request';
import { data } from 'autoprefixer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Sent() {
      const { shop, toggleMode, singleProduct,  messages} = useSelector(
        (state) => state.store
      );


      const [token, setToken] = useState(null)
      const router  = useRouter()
      const { isDark } = toggleMode;
      const dispatch = useDispatch()
      useEffect(()=>{
        const token = getCookie()
        setToken(token)

        async function getMessage(){
if(token){
  const response = await adminMessages(token);
  const data  = await response.json()
  dispatch(handleGetMessages(data.messages));
}
        }
        getMessage()
      }, [messages])

  return (
    <>


      <MetaDataC title="Admin Messages"/>
    <AdminLayout>
      <main className="px-10 sm:px-4    ">
        <div className=" flex justify-between items-center  mt-6">
          <h2 className=" font-bold">Messages</h2>

          <button
            onClick={() => router.push("/admin/messages/new-message")}
            className={`  btn sm:btn-sm  shadow-md   capitalize sm:my-4   ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black "
            }`}>
            New
          </button>
        </div>
        <div className=" my-4 h-[100vh]   overflow-y-scroll w-full">
          {messages &&
            messages.length > 0 &&
            messages.map((message) => {
              return <SentMessage key={message.id} message={message} />;
            })}
        </div>
      </main>
    </AdminLayout>
    </>
  );
}
