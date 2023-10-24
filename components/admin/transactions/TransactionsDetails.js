import { useRouter } from 'next/router';
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';
function TransactionList() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router = useRouter();

  function handleNavigation(id) {
    router.push(`/admin/orders/${id}`);
  }

  return (
    <div
      className={`  pb-3 mb-6  rounded-md ${
        isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
      }`}>
      <div
        className={` card-body overflow-x-auto mb-6  rounded-md ${
          isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
        }`}>
        <div
          className={` flex justify-end items-center pb-2 ${
            isDark ? " " : " "
          }`}>
          <div className=" flex gap-3 items-center lg:text-[18px] font-semibold xl:text-[18px] ">
            <select
              className={`select  select-sm ${
                isDark
                  ? " bg-[#646464]"
                  : " bg-[#646464] border-black text-white"
              }`}>
              <option>weekly</option>
              <option>monthly</option>
              <option>yearly</option>
            </select>
          </div>{" "}
        </div>
        <div className=" overflow-x-auto ">
          <table className="table">
            <thead className="">
              <tr
                className={` ${
                  isDark
                    ? " border-b border-b-white text-white opacity-50 "
                    : " border-b border-b-black text-black"
                }`}>
                <th>Date & Time</th>
                <th>Method</th>
                <th>Tax</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div>
                    <h2>03/08/2023</h2>
                    <h2 className=" opacity-50">At 10:30 AM</h2>
                  </div>
                </td>
                <td>Paystack</td>
                <td>N00.00</td>
                <td className=" ">₦0.00</td>
                <td className=" text-[#34C759] normal-case">Approved</td>
              </tr>
              <tr
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div>
                    <h2>03/08/2023</h2>
                    <h2 className=" opacity-50">At 10:30 AM</h2>
                  </div>
                </td>
                <td>Paystack</td>
                <td>N00.00</td>
                <td className=" ">₦0.00</td>
                <td className=" text-[#FCBB16] normal-case">Waiting</td>
              </tr>
              <tr
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div>
                    <h2>03/08/2023</h2>
                    <h2 className=" opacity-50">At 10:30 AM</h2>
                  </div>
                </td>
                <td>Paystack</td>
                <td>N00.00</td>
                <td className=" ">₦0.00</td>
                <td className=" text-[#34C759] normal-case">Approved</td>
              </tr>
              <tr
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div>
                    <h2>03/08/2023</h2>
                    <h2 className=" opacity-50">At 10:30 AM</h2>
                  </div>
                </td>
                <td>Paystack</td>
                <td>N00.00</td>
                <td className=" ">₦0.00</td>
                <td className=" text-[#FCBB16] normal-case">Waiting</td>
              </tr>
              <tr
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div>
                    <h2>03/08/2023</h2>
                    <h2 className=" opacity-50">At 10:30 AM</h2>
                  </div>
                </td>
                <td>Paystack</td>
                <td>N00.00</td>
                <td className=" ">₦0.00</td>
                <td className=" text-[#D73300] normal-case">Decline</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className=" flex items-center gap-3 mt-6">
          <button
            className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black"
            }`}>
            1
          </button>
          <button
            className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black"
            }`}>
            2
          </button>
          <button
            className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black"
            }`}>
            3
          </button>
          <button
            className={`btn  flex gap-0  capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black"
            }`}>
            <IoIosArrowForward />
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}


export default function TransactionsDetails() {
  return (
    <div>
      <p className=' my-6 opacity-50'>Showing payment transactions made in the last 7 days</p>

      <TransactionList />
    </div>
  );
}
