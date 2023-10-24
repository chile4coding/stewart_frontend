import AppLayoout from '@/components/Layout/AppLayoout'
import { useRouter } from 'next/router';
import React from 'react'
import { useSelector } from 'react-redux';
function Otpform() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router = useRouter();


  function handleResetPassowrd() {
    router.push("/reset-password");
  }

  return (
    <div className="">
      <h2 className=" text-center  xl:text-[36px] lg:text-[36px]  font-semibold normal-case opacity-50">
        We,ve sent your OTP, check your inbox.{" "}
      </h2>
      <p className=" lg:text-[18px]  font-normal normal-case opacity-50 text-center mt-4">
        Enter the OTP that was sent too your email
      </p>
      <div className="my-6 flex gap-4 sm:gap-2 justify-center items-center">
        <input
          type="text"
          className={`input input-bordered max-w-[48px]    ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
        <input
          type="text"
          className={`input input-bordered max-w-[48px]    ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
        <input
          type="text"
          className={`input input-bordered max-w-[48px]    ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
        <input
          type="text"
          className={`input input-bordered max-w-[48px]    ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
        <input
          type="text"
          className={`input input-bordered max-w-[48px]    ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
        <input
          type="text"
          className={`input input-bordered max-w-[48px]    ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>

      <button
        className={`my-6 btn  btn-outline border normal-case  w-full   px-8 py-4  ${
          isDark
            ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
            : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
        }`}
        onClick={handleResetPassowrd}>
        Submit
      </button>
    </div>
  );
}

export default function OTP() {
        const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <AppLayoout>
      <main className={`px-4 ${isDark ? "" : "bg-[#D1D1D1]"}`}>
        <div className="   flex flex-col items-center justify-center px-10 gap-6 py-10">
          <div>
            <img src="otp.png" />
          </div>
          <Otpform />
        </div>
      </main>
    </AppLayoout>
  );
}
