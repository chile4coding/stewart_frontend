import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useRouter } from "next/router";

export default function SignupForm() {
  const router = useRouter();
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  function handleLoginNav() {
    router.replace("/login");
  }
  return (
    <div className=" flex flex-col justify-center">
      <h2 className="text-center text-[18px] font-semibold leading-6 mb-1 normal-case">
        Welcome to Stewart Collection!
      </h2>
      <h2 className="text-center text-[18px]  font-norma leading-6  normal-case">
        Let’s create your account{" "}
      </h2>
      <div className="my-6">
        <input
          type="text"
          placeholder="Name"
          className={`input input-bordered  w-full  ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>
      <div className="my-6">
        <input
          type="email"
          placeholder="Email"
          className={`input input-bordered  w-full  ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>

      <div className="grid my-6 grid-cols-2 gap-4 sm:grid-cols-1">
        <select
          className={`input input-bordered  w-full max-w-xs sm:max-w-full ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}>
          <option selected>Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <input
          type="date"
          placeholder="Surname"
          className={`input input-bordered  w-full max-w-xs sm:max-w-full ${
            isDark
              ? " bg-black border-white nput  "
              : " text-black  border-black"
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
      <div className="my-6">
        <input
          type="password"
          placeholder="Confirm Password"
          className={`input input-bordered  w-full  ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>
      <div className="flex justify-between">
        <div>
          <input type="checkbox" /> <span>Remember me</span>
        </div>
      </div>
      <button
        className={` my-6 btn  btn-outline border normal-case    px-8 py-4 w-full ${
          isDark
            ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
            : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
        }`}>
        Create Account
      </button>
      <div className=" flex  justify-between items-center">
        <h2
          className={`flex-1  ${
            isDark ? "border-b border-b-white" : "border-b border-b-black"
          }`}></h2>
        <h2 className="px-4">OR</h2>
        <h2
          className={`flex-1  ${
            isDark ? "border-b border-b-white" : "border-b border-b-black"
          }`}></h2>
      </div>

      <h2 className="  text-center my-4 normal-case">Continue with</h2>
      <div className=" flex justify-center gap-4  my-4">
        <div className="bg-[white] p-2 rounded-sm">
          <FcGoogle className=" text-[24px]  cursor-pointer" />
        </div>
        <div className=" text-[#1877F2] bg-[white] p-2  rounded-sm">
          <BsFacebook className=" text-[24px] cursor-pointer" />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-center normal-case">
          Already have an account?{" "}
          <span
            className={` cursor-pointer hover:underline ${
              isDark ? "text-[#6FEAE2]" : " text-[blue]"
            }`}
            onClick={handleLoginNav}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
