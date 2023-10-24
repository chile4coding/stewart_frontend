import React from 'react'
import { BiMessage } from 'react-icons/bi';
import { GrLocationPin } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import {IoLocationSharp} from  "react-icons/io5"
import { BsFillTelephoneFill } from 'react-icons/bs';


function ProfileCard() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body flex flex-col  items-center">
        <div className=" max-h-[100px] max-w-[100px] ">
          <img src="/tshirt.png" className=" bg-[white]  rounded-full" />
        </div>
        <button className=" pointer-events-none btn font-thin border-none  my-4 mb-2  btn-sm normal-case bg-[#1e9c3d] text-[white]">
          Admin
        </button>
        <p className=" font-thin opacity-40  text-[12px] italic">
          Last visit 08/09/2023
        </p>

        <button
          className={`  btn  btn-outline border normal-case   btn-sm   ${
            isDark
              ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
              : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
          }`}>
          Log out
        </button>
      </div>
    </div>
  );
}
function ProfileInfoCard() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body ">
        <h2>Profile Information</h2>
        <div className=" flex gap-3 items-center my-2">
          <MdEmail />
          <span className=" normal-case break-all flex flex-wrap">
            princestewart@gmail.com
          </span>
        </div>
        <div className=" flex gap-3 items-center">
          <IoLocationSharp />
          <span className=" normal-case break-all flex flex-wrap">
            Port Harcourt, Rivers State, Nigeria
          </span>
        </div>
        <div className=" flex gap-3 items-center my-2">
          <BsFillTelephoneFill />
          <span className=" normal-case break-all flex flex-wrap">
            080976543212
          </span>
        </div>
      </div>
    </div>
  );
}
function ProfileInfoForm() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body ">
        <h2 className=" lg:text-[24px] font-semibold xl:text-[24px]">
          My profile details
        </h2>

        <div className="grid  grid-cols-2 gap-4 sm:grid-cols-1">
          <div className="">
            <label className={isDark ? "active_label" : ""}>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className={`input input-bordered w-full max-w-xs sm:max-w-full ${
                isDark
                  ? " bg-black border-white  "
                  : " text-black  border-black"
              }`}
            />
          </div>
          <div>
            <label className={isDark ? "active_label" : ""}>Last Name</label>
            <input
              type="text"
              placeholder="Surname"
              className={`input input-bordered  w-full max-w-xs sm:max-w-full ${
                isDark ? " bg-black border-white " : " text-black  border-black"
              }`}
            />
          </div>
        </div>
        <div className=" my-3">
          <label className={isDark ? "active_label" : ""}>Email</label>
          <input
            type="email"
            placeholder="example@example.com"
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" my-3">
          <label className={isDark ? "active_label" : ""}>Phone</label>
          <input
            type="text"
            placeholder=" 081023445"
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>Password</label>
          <input
            type="password"
            placeholder=""
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>Country</label>
          <input
            type="text"
            placeholder=""
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>State</label>
          <input
            type="text"
            placeholder=""
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>City</label>
          <input
            type="text"
            placeholder=""
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
 
        <div className="flex justify-evenly  gap-8">
          <button
            className={`  btn  shadow-md   capitalize sm:my-4  flex-1   ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black "
            }`}>
            Change Password
          </button>
          <button
            className={`  btn  shadow-md   capitalize sm:my-4 flex-1   ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black "
            }`}>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
export default function AdminSettings() {
  return (
   <>
    <div className=' grid grid-cols-3 sm:grid-cols-1 gap-5 md:grid-cols-2'>
    <div>
        <ProfileCard/>
        <ProfileInfoCard/>

    </div>
    <div className=' lg:col-span-2'>
        <ProfileInfoForm/>
    </div>
    </div>
   </>
  )
}
