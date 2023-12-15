import Spinner from "@/components/spinner/Spinner";
import { handleGetMessages } from "@/redux/storeSlice";
import { adminMessages, deleteMessages, getCookie, getMessages } from "@/services/request";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function SentMessage({ message }) {
  const { shop, toggleMode, singleProduct } = useSelector(
    (state) => state.store
  );
  const { isDark } = toggleMode;
        const [token, setToken] = useState(null);
        const [loading, setLoading] =  useState(false)
     const dispatch = useDispatch();
     useEffect(() => {
       const token = getCookie();
       setToken(token);
     }, []);
  async function deleteMessage(id){
 setLoading(true)
    const res= await deleteMessages(id, token)
    const dataD  = await res.json()

    console.log(dataD)

if(res.ok){
  
  const response = await adminMessages(token);
  const data = await response.json();

  console.log(res)
  if(res.ok){

    dispatch(handleGetMessages(data.messages));
    toast.success(<div>{dataD.message}</div>);

  }

}else{
    toast.error(<div>{dataD.message}</div>);

}

setLoading(false)
  }
  return (
    <div>
      <div className=" flex justify-between items-center">
        <h1 className="  font-bold my-4 normal-case">{message?.title}</h1>
        <button
        onClick={ deleteMessage.bind(this, message.id)}
          className={`  btn sm:btn-sm  shadow-md   capitalize sm:my-4   ${
            isDark
              ? "hover:border-white hover:bg-black hover:text-white"
              : " bg-black text-white hover:border-black "
          }`}>
          delete {loading && <Spinner/>}
        </button>
      </div>
      <div
        className={` normal-case  text-justify   pb-6  ${
          isDark
            ? "  text-white border-b border-b-white"
            : " text-black  border-b border-b-black "
        }`}>
        {message?.message}
      </div>
    </div>
  );
}
