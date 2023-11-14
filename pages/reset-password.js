import AppLayoout from '@/components/Layout/AppLayoout';
import Spinner from '@/components/spinner/Spinner';
import { setCurrentUserEmail } from '@/redux/storeSlice';
import { reqOtp, resetPassword } from '@/services/request';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
function ResetPasswordform() {
   const { shop, toggleMode, currentUserEmail } = useSelector(
     (state) => state.store
   );  const router = useRouter();
  const { isDark } = toggleMode;
    const [showPassword, setShowPassword] = useState(false);

   const [user, setUser] = useState({
     email: "",
     password:"",
     confirmPassword:"",
     loading: false,
     passwordSame:false
   });

   console.log(currentUserEmail);
   const dispatch = useDispatch();
    const handleShowPassword = () => setShowPassword((password) => !password);

   function handleInputChage(e) {
     const { name, value } = e.target;
     setUser({ ...user, [name]: value });
   }

   async function handleForgottenPassword(e) {
     e.preventDefault();
 if (user.password !== user.confirmPassword) {
   setUser({ ...user, passwordSame: true });
   return;
 }

   setUser({...user, loading: true})
     const response = await resetPassword({ email: currentUserEmail, password: user.password });
     const data = await response.json();

     if (response.status === 200) {
 
       toast.success(<div className=" normal-case">Password reset successful</div>);
       router.push("/reset-successful");
     } else {
       toast.error(<h2 className=" normal-case">{data.message}</h2>);
     }

     setUser({ ...user, loading: false });
   }

   async function resendOtp() {
     const response = await reqOtp({ email: currentUserEmail });
     if (response.status === 200) {

       toast.success(<div className=" normal-case">OTP sent</div>);
       router.push("/otp")
     } else {
       toast.error(<h2 className=" normal-case">Error Occurred</h2>);
     }
   }
  // function handleSuccessfulReset() {
  //   router.push("/reset-successful");
  // }

  return (
    <form
      onSubmit={handleForgottenPassword}
      className=" max-w-[588px] mx-auto my-auto">
      <h2 className=" text-center  xl:text-[36px] lg:text-[36px]  font-semibold normal-case opacity-50">
        Reset password{" "}
      </h2>

      <div className="my-4 sm:my-2">
        <div
          class={`flex items-center w-full   md:max-w-lg border   rounded-lg ${
            isDark ? "" : "border border-black "
          } `}
          style={{
            border: user.passwordSame ? "1px solid red" : "",
          }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            required
            name="password"
            value={user.password}
            onChange={handleInputChage}
            className="  text-[16px] p-4 bg-transparent w-full  border-0 outline-0 outline-none border-none sm:text-xs sm:p-3  "
          />
          <div class="flex items-center   ">
            {showPassword ? (
              <AiOutlineEye
                className="text-2xl text-gray-400  cursor-pointer  mr-2 sm:text-sm "
                onClick={handleShowPassword}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="text-2xl text-gray-400  cursor-pointer  mr-2 sm:text-sm "
                onClick={handleShowPassword}
              />
            )}
          </div>
        </div>
      </div>
      <div className="my-4 sm:my-2 ">
        <div
          class={`flex items-center w-full   md:max-w-lg border   rounded-lg ${
            isDark ? "" : "border border-black "
          }`}
          style={{
            border: user.passwordSame ? "1px solid red" : "",
          }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            required
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInputChage}
            className="  text-[16px] p-4 bg-transparent w-full  border-0 outline-0 outline-none border-none sm:text-xs sm:p-3  "
          />
          <div class="flex items-center   ">
            {showPassword ? (
              <AiOutlineEye
                className="text-2xl text-gray-400  cursor-pointer  mr-2 sm:text-sm "
                onClick={handleShowPassword}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="text-2xl text-gray-400  cursor-pointer  mr-2 sm:text-sm "
                onClick={handleShowPassword}
              />
            )}
          </div>
        </div>
      </div>

      <button
        className={`my-6  btn  btn-outline border normal-case  w-full   px-8 py-4  ${
          isDark
            ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
            : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
        }`}>
        Submit {user.loading && <Spinner/>}
      </button>
      <div className="flex justify-end">
        <span className=" flex justify-end text-[#616183] normal-case cursor-pointer" onClick={resendOtp}>Request OTP</span>
      </div>
    </form>
  );
}

export default function ResetPassowrd() {

        const isDark = useSelector((state) => state.store.toggleMode.isDark);
  return (
    <AppLayoout>
      <main className={`px-4 py-12 ${isDark ? "" : "bg-[#D1D1D1] "}   `}>
        <div className="   px-10 gap-6 py-10">
          <ResetPasswordform />
        </div>
      </main>
    </AppLayoout>
  );
}
