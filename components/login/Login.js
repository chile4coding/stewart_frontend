import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import { loginUser } from "@/services/request";
import toast from "react-hot-toast";
import { setUser } from "@/redux/storeSlice";
import Cookies from "js-cookie";

export default function LoginDetails() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUserDetails] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const dispatch = useDispatch();
  function handleCreateAccountNav() {
    router.replace("/signup");
  }
  const handleShowPassword = () => setShowPassword((password) => !password);

  function handleForgottenPassword() {
    router.push("/forgotten-password");
  }

  function handleInputChage(e) {
    const { name, value } = e.target;
    setUserDetails({ ...user, [name]: value });
  }

  async function handleSignup(e) {
    e.preventDefault();
    setUserDetails({ ...user, loading: true });

    const response = await loginUser(user);
    const data = await response.json();
    Cookies.set("_stewart_collection_token", data.token);
    if (response.status === 200) {
      dispatch(setUser(data?.findUser));
window.location.href =
  "https://stewart-frontend-chile4coding.vercel.app/my_account";
       
      // router.push("/my_account");
      toast.success(<h className=" normal-case">Login successful</h>);
    } else {
      toast.error(<h1 className="  lowercase">{data.message} </h1>);
    }
    setUserDetails({ ...user, loading: false });

    // router.push("/otp");
  }

  return (
    <form onSubmit={handleSignup} className=" flex flex-col justify-center">
      <h2 className="text-center text-[18px] font-semibold normal-case">
        Welcome! Log in to your account
      </h2>
      <div className="my-6">
        <input
          type="email"
          placeholder="Email"
          required
          onChange={handleInputChage}
          name="email"
          value={user.email}
          className={`input input-bordered  w-full  ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>
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
      <div className="flex justify-between">
        <div>
          <input type="checkbox" />{" "}
          <span className=" normal-case">Remember me</span>
        </div>

        <span
          className={` cursor-pointer hover:underline ${
            isDark ? "text-[#6FEAE2]" : "text-[blue]"
          }`}
          onClick={handleForgottenPassword}>
          Forgot password?
        </span>
      </div>
      <button
        className={`my-6 btn  btn-outline border normal-case    px-8 py-4 w-full ${
          isDark
            ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
            : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
        }`}>
        Login {user.loading && <Spinner />}
      </button>

      <div>
        <p className="text-center normal-case">
          Don’t have an account?{" "}
          <span
            className={` cursor-pointer hover:underlin normal-casee ${
              isDark ? "text-[#6FEAE2]" : " text-[blue]"
            }`}
            onClick={handleCreateAccountNav}>
            Create Account
          </span>
        </p>
      </div>
    </form>
  );
}
