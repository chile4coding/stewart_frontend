import React from 'react'
import { AiFillCloseSquare, AiOutlineCloseSquare } from 'react-icons/ai';
import { BsFillChatSquareQuoteFill } from "react-icons/bs";

import { useSelector } from 'react-redux';

export function NoSavedItems(){
      const isDark = useSelector((state) => state.store.toggleMode.isDark);

    return (
      <div className="w-full  flex flex-col justify-center items-center h-[88vh] ">
        <div className="comment p-1">
          <BsFillChatSquareQuoteFill className=" text-2xl text-[#0d58af]" />
        </div>

        <h2 className=" lg:text-[24px] xl:text-[24px] font-semibold mt-6 mb-2">
          No saved items yet
        </h2>
        <p className=" mb-6 text-center">
          Your saved products will appear here.
        </p>

        <button
          className={`btn  shadow-md   normal-case sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
            isDark
              ? "hover:border-white hover:bg-black hover:text-white"
              : " bg-black text-white hover:border-black"
          }`}>
          Continue Shopping
        </button>
      </div>
    );
}

export default function SavedItemsDetails() {
      const isDark = useSelector((state) => state.store.toggleMode.isDark);

    
  return (
    <div
      className={` h-[88vh]  pb-3 mb-6  rounded-md ${
        isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
      }`}>

      <div
        className={` card-body overflow-x-auto mb-6  rounded-md ${
          isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
        }`}>
        <table className="table">
          <tbody>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
              }>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask  rounded-md w-12 h-12">
                      <img
                        src="/tshirt.png"
                        alt="Avatar Tailwind CSS Component"
                        className=" w-full h-full bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      Stewart Collection Unisex Cotton
                    </div>
                  </div>
                </div>
              </td>
              <td> ₦0.00</td>
              <td>
                <button
                  className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
                    isDark
                      ? "hover:border-white hover:bg-black hover:text-white"
                      : " bg-black text-white hover:border-black"
                  }`}>
                  Buy now
                </button>
              </td>
              <th>
                <div className=" flex items-center gap-2">
                  <span
                    className={
                      isDark
                        ? "   text-white bg-black"
                        : " bg-white text-black"
                    }>
                    <AiFillCloseSquare  className=' text-xl'/>
                  </span>
                  <span className=" normal-case hover:underline hover:cursor-pointer">
                    Remove
                  </span>
                </div>
              </th>
            </tr>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
              }>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask  rounded-md w-12 h-12">
                      <img
                        src="/tshirt.png"
                        alt="Avatar Tailwind CSS Component"
                        className=" w-full h-full bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      Stewart Collection Unisex Cotton
                    </div>
                  </div>
                </div>
              </td>
              <td> ₦0.00</td>
              <td>
                <button
                  className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
                    isDark
                      ? "hover:border-white hover:bg-black hover:text-white"
                      : " bg-black text-white hover:border-black"
                  }`}>
                  Buy now
                </button>
              </td>
              <th>
                <div className=" flex items-center gap-2">
                  <span
                    className={
                      isDark
                        ? "   text-white bg-black"
                        : " bg-white text-black"
                    }>
                    <AiFillCloseSquare  className=' text-xl'/>
                  </span>
                  <span className=" normal-case hover:underline hover:cursor-pointer">
                    Remove
                  </span>
                </div>
              </th>
            </tr>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
              }>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask  rounded-md w-12 h-12">
                      <img
                        src="/tshirt.png"
                        alt="Avatar Tailwind CSS Component"
                        className=" w-full h-full bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      Stewart Collection Unisex Cotton
                    </div>
                  </div>
                </div>
              </td>
              <td> ₦0.00</td>
              <td>
                <button
                  className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
                    isDark
                      ? "hover:border-white hover:bg-black hover:text-white"
                      : " bg-black text-white hover:border-black"
                  }`}>
                  Buy now
                </button>
              </td>
              <th>
                <div className=" flex items-center gap-2">
                  <span
                    className={
                      isDark
                        ? "   text-white bg-black"
                        : " bg-white text-black"
                    }>
                    <AiFillCloseSquare  className=' text-xl'/>
                  </span>
                  <span className=" normal-case hover:underline hover:cursor-pointer">
                    Remove
                  </span>
                </div>
              </th>
            </tr>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
              }>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask  rounded-md w-12 h-12">
                      <img
                        src="/tshirt.png"
                        alt="Avatar Tailwind CSS Component"
                        className=" w-full h-full bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      Stewart Collection Unisex Cotton
                    </div>
                  </div>
                </div>
              </td>
              <td> ₦0.00</td>
              <td>
                <button
                  className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
                    isDark
                      ? "hover:border-white hover:bg-black hover:text-white"
                      : " bg-black text-white hover:border-black"
                  }`}>
                  Buy now
                </button>
              </td>
              <th>
                <div className=" flex items-center gap-2">
                  <span
                    className={
                      isDark
                        ? "   text-white bg-black"
                        : " bg-white text-black"
                    }>
                    <AiFillCloseSquare  className=' text-xl'/>
                  </span>
                  <span className=" normal-case hover:underline hover:cursor-pointer">
                    Remove
                  </span>
                </div>
              </th>
            </tr>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
              }>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask  rounded-md w-12 h-12">
                      <img
                        src="/tshirt.png"
                        alt="Avatar Tailwind CSS Component"
                        className=" w-full h-full bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      Stewart Collection Unisex Cotton
                    </div>
                  </div>
                </div>
              </td>
              <td> ₦0.00</td>
              <td>
                <button
                  className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
                    isDark
                      ? "hover:border-white hover:bg-black hover:text-white"
                      : " bg-black text-white hover:border-black"
                  }`}>
                  Buy now
                </button>
              </td>
              <th>
                <div className=" flex items-center gap-2">
                  <span
                    className={
                      isDark
                        ? "   text-white bg-black"
                        : " bg-white text-black"
                    }>
                    <AiFillCloseSquare  className=' text-xl'/>
                  </span>
                  <span className=" normal-case hover:underline hover:cursor-pointer">
                    Remove
                  </span>
                </div>
              </th>
            </tr>
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
}
