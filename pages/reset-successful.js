import AppLayoout from '@/components/Layout/AppLayoout';
import { useRouter } from 'next/router';
import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { MetaDataC } from './orders';

export default function ResetSuccessful() {
const router  = useRouter()
        const isDark = useSelector((state) => state.store.toggleMode.isDark);
  function handleLogin() {
    router.push("/login");
  }

  return (
    <>
<MetaDataC title=" Reset Successful"/>
    <AppLayoout>
      <main
        className={` h-[80dvh] flex flex-col w-full px-4 ${
          isDark ? "" : "bg-[#D1D1D1]"
        }`}>
        <div className=" max-w-[588px] mx-auto my-auto w-full  max-h-[200px]  flex flex-col items-center justify-center px-10 gap-6 py-10">
          <div>
            <BsFillCheckCircleFill className=" text-3xl" />
          </div>

          <h2 className=" normal-case text-center">
            You have successfully reset your password
          </h2>

          <button
            className={` btn  btn-outline border normal-case  w-full   px-8 py-4  ${
              isDark
                ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
                : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
            }`}
            onClick={handleLogin}>
            Login
          </button>
        </div>
      </main>
    </AppLayoout>

    </>
  );


}



