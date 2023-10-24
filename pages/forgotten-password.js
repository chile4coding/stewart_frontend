import AppLayoout from '@/components/Layout/AppLayoout'
import LoginDetails from '@/components/login/Login';
import { useRouter } from 'next/router';
import React from 'react'
import { useSelector } from 'react-redux';

function ForgotPasswordform() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router  = useRouter()

  function handleCreateAccountNav(){
    router.replace("/signup")
  }


    function handleForgottenPassword() {
      router.push("/forgotten-password");
    }

    function handleNext(){
      router.push("/otp")
    }

  return (
    <div className=" flex flex-col justify-center">
      <h2 className=" lg:text-[18px]  font-normal normal-case opacity-50">
        Enter the email address associated with your account.
      </h2>
      <div className="my-6">
        <input
          type="email"
          placeholder="Email"
          className={`input input-bordered  w-full  ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>
      <p className=" lg:text-[18px]  font-normal normal-case opacity-50">
        We will send you a 6-digit OTP to reset your password
      </p>
      <button
        className={`my-6 btn  btn-outline border normal-case    px-8 py-4 w-full ${
          isDark
            ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
            : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
        }`}
        onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default function ForgottenPassowrd() {
    const isDark = useSelector((state) => state.store.toggleMode.isDark);
  
  
  return (
    <AppLayoout>
      <main className={isDark ? "" : " bg-[#D1D1D1]"}>
        <div className=" text-center pt-5">
          <h2 className=" lg:text-[36px] xl:text-[36px] font-semibold ">
            Forgot password?
          </h2>
          <p className=" lg:text-[18px] font-normal leading-6 mt-3">
            Don’t worry, it happens!
          </p>
        </div>
        <div className="   grid grid-cols-2 sm:grid-cols-1 px-10 gap-6 my-10">
          <div>
            <img src="password.png" />
          </div>
          <ForgotPasswordform />
        </div>
      </main>
    </AppLayoout>
  );
}
