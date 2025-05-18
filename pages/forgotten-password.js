import AppLayout from "@/components/Layout/AppLayout";
import LoginDetails from "@/components/login/Login";
import Spinner from "@/components/spinner/Spinner";
import { setCurrentUserEmail } from "@/redux/storeSlice";
import { reqOtp } from "@/services/request";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { MetaDataC } from "./orders";

function ForgotPasswordform() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router = useRouter();
  const [userEmail, setuserEmail] = useState({
    email: "",
    loading: false,
  });

  const dispatch = useDispatch();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setuserEmail({ ...userEmail, [name]: value });
  }

  async function handleForgottenPassword(e) {
    e.preventDefault();
    setuserEmail({ ...userEmail, loading: true });
    const response = await reqOtp({ email: userEmail.email });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(setCurrentUserEmail(userEmail.email));
      toast.success(<div className=" normal-case">OTP sent</div>);
      router.push({
        pathname: "/otp",
        query: { forgotten_password: true },
      });
    } else {
      toast.error(<h2 className=" normal-case">{data.message}</h2>);
    }

    setuserEmail({ ...userEmail, loading: false });
  }

  return (
    <form
      onSubmit={handleForgottenPassword}
      className=" flex flex-col justify-center">
      <h2 className=" lg:text-[18px]  font-normal normal-case opacity-50">
        Enter the email address associated with your account.
      </h2>
      <div className="my-6">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userEmail.email}
          required
          onChange={handleInputChange}
          className={`input input-bordered  w-full  ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>
      <p className=" lg:text-[18px]  font-normal normal-case opacity-50 ">
        We will send you a 6-digit OTP to reset your password
      </p>
      <button
        className={`my-6 btn  btn-outline border normal-case    px-8 py-4 w-full ${
          isDark
            ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
            : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
        }`}>
        Next {userEmail.loading && <Spinner />}
      </button>
    </form>
  );
}

export default function ForgottenPassowrd() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <>
      <MetaDataC title="Forgot Password" />
      <AppLayout>
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
      </AppLayout>
    </>
  );
}
