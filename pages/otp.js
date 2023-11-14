import AppLayoout from "@/components/Layout/AppLayoout";
import Spinner from "@/components/spinner/Spinner";
import { reqOtp, verifyOtp } from "@/services/request";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
function Otpform() {
  const { currentUserEmail, toggleMode } = useSelector((state) => state.store);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]; // Refs to focus inputs

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { isDark } = toggleMode;

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field
    if (value && index < otp.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }

    setOtp(newOtp);


    submit(newOtp.join(""));
  };


  
  async function submit(otp) {
    setLoading(true);

    const response = await verifyOtp({ otp });
    const data = await response.json();

    if (response.status === 200) {
      toast.success(<h2>{data.message}</h2>);
      if (Boolean(router?.query?.forgotten_password) === true) {
        
        router.push("/reset-password");
        
        return;
      } else {
        
        router.push("/login");
      }
    } else {
      toast.error(<h2>{data.message}</h2>);
    }

    setLoading(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (otp.join("").length !== 6) {
      return;
    }
    submit(otp.join(""));
  }

  async function resendOtp() {
    const response = await reqOtp({ email: currentUserEmail });
    if (response.status === 200) {
      toast.success(<div className=" normal-case">OTP sent</div>);
    } else {
      toast.error(<h2 className=" normal-case">Error Occurred</h2>);
    }
  }

  return (
    <form onSubmit={handleSubmit} form className="">
      <h2 className=" text-center  xl:text-[36px] lg:text-[36px]  font-semibold normal-case opacity-50">
        We,ve sent your OTP, check your inbox.{" "}
      </h2>
      <p className=" lg:text-[18px]  font-normal normal-case opacity-50 text-center mt-4">
        Enter the OTP that was sent to your email
      </p>
      <div className="my-6 flex gap-4 sm:gap-2 justify-center items-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className={`input input-bordered max-w-[48px]    ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onPaste={handlePaste}
            ref={inputRefs[index]}
          />
        ))}
      </div>

      <button
        className={`my-6 btn  btn-outline border normal-case  w-full   px-8 py-4  ${
          isDark
            ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
            : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
        }`}>
        Submit {loading && <Spinner />}
      </button>

      <h1 className=" normal-case text-center">
        Didn't get an OTP?{" "}
        <span className="text-[#4c4c86] cursor-pointer" onClick={resendOtp}>
          resend OTP
        </span>
      </h1>
    </form>
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
