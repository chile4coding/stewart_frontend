import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useRouter } from "next/router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { userSignup } from "@/services/request";
import toast from "react-hot-toast";
import Spinner from "../spinner/Spinner";
import { setCurrentUserEmail } from "@/redux/storeSlice";

export default function SignupForm() {
  const router = useRouter();
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    confirmPassword: "",
    loading: false,
    passwordSame: false,
  });

  const dispatch = useDispatch();
  function handleInputChage(e) {
    const { name, value } = e.target;
    setUserDetails({ ...user, [name]: value, passwordSame: false });
  }
  const handleShowPassword = () => setShowPassword((password) => !password);

  function handleLoginNav() {
    router.replace("/login");
  }

  function formatDateToDayMonthYear(date) {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  async function handleSignup(e) {
    e.preventDefault();
    const dateDOB = formatDateToDayMonthYear(user.dob);

    if (user.password !== user.confirmPassword) {
      setUserDetails({ ...user, passwordSame: true });
      return;
    }
    setUserDetails({ ...user, loading: true });
    const response = await userSignup({ ...user, dob: dateDOB });
    const data = await response.json();

    if (response.status === 201) {
      dispatch(setCurrentUserEmail(user.email));
      toast.success(
        <h className=" normal-case">Sign up successful, verify your account</h>
      );
      router.push("/otp");
    } else {
      toast.error(<h1 className="  lowercase">{data.message} </h1>);
    }
    setUserDetails({ ...user, loading: false });

    // router.push("/otp");
  }
  return (
    <form onSubmit={handleSignup} className=" flex flex-col justify-center ">
      <h2 className="text-center text-[18px] font-semibold leading-6 mb-1 normal-case">
        Welcome to Stewart Collection!
      </h2>
      <h2 className="text-center text-[18px]  font-norma leading-6  normal-case">
        Let’s create your account{" "}
      </h2>
      <div className="my-6 sm:mb-0 ">
        <input
          onChange={handleInputChage}
          value={user.name}
          name="name"
          type="text"
          required
          placeholder="Name"
          className={`input input-bordered  w-full  ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>
      <div className="my-6 sm:mb-0">
        <input
          type="email"
          onChange={handleInputChage}
          value={user.email}
          name="email"
          required
          placeholder="Email"
          className={`input input-bordered  w-full  ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>

      <div className="grid my-6  sm:my-4grid-cols-2 gap-4 sm:grid-cols-1">
        <select
          onChange={handleInputChage}
          value={user.gender}
          name="gender"
          required
          className={`input input-bordered  w-full max-w-xs sm:max-w-full ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}>
          <option selected>Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="date"
          onChange={handleInputChage}
          required
          value={user.dob}
          name="dob"
          className={`input input-bordered  w-full max-w-xs sm:max-w-full ${
            isDark
              ? " bg-black border-white nput  "
              : " text-black  border-black"
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
        className={` my-6 btn  sm:my-2 btn-outline border normal-case    px-8 py-4 w-full ${
          isDark
            ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
            : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
        }`}>
        Create Account {user.loading && <Spinner />}
      </button>
      {/* <div className=" flex  justify-between items-center">
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
      </div> */}
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
    </form>
  );
}
