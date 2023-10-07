import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

export default function LoginDetails() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router  = useRouter()

  function handleCreateAccountNav(){
    router.replace("/signup")
  }

  return (
    <div className=" flex flex-col justify-center">
      <h2 className="text-center text-[18px] font-semibold">
        Welcome! Log in to your account
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
      <div className="my-6">
        <input
          type="password"
          placeholder="Password"
          className={`input input-bordered  w-full  ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>
      <div className="flex justify-between">
        <div>
          <input type="checkbox" /> <span>Remember me</span>
        </div>

        <span
          className={` cursor-pointer hover:underline ${
            isDark ? "text-[#6FEAE2]" : "text-[blue]"
          }`}>
          Forgot password?
        </span>
      </div>
      <button
        className={`my-6 btn  btn-outline border normal-case    px-8 py-4 w-full ${
          isDark
            ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
            : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
        }`}>
        Login
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
    </div>
  );
}
