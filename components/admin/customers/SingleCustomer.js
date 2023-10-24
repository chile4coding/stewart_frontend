import { useRouter } from 'next/router';
import React from 'react'
import { AiFillCloseSquare, AiFillStar } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';

function CustomersList() {
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
          className={` flex justify-between items-center pb-2 ${
            isDark
              ? " border-b border-b-white text-white"
              : " border-b border-b-black text-black"
          }`}>
          <h2 className="lg:text-[18px] font-semibold xl:text-[18px]">
            Customer list
          </h2>
          <div className=" flex gap-3 items-center lg:text-[18px] font-semibold xl:text-[18px] ">
            <span>Sort by:</span>

            <select
              className={`select  select-sm ${
                isDark
                  ? " bg-[#646464]"
                  : " bg-[#646464] border-black text-white"
              }`}>
              <option>latest</option>
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
                    ? " border-0   text-white opacity-50 "
                    : " border-0 text-black "
                }`}>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th>Country</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask  rounded-full w-12 h-12">
                        <img
                          src="/tshirt.png"
                          alt="Avatar Tailwind CSS Component"
                          className=" w-full h-full bg-white rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">John Doe</div>
                    </div>
                  </div>
                </td>
                <td>Johndoe@gmail.com</td>
                <td>08194567120</td>
                <td className=" ">Nigeria</td>
                <td className=" text-[#34C759] normal-case">New customer</td>
              </tr>
              <tr
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask  rounded-full w-12 h-12">
                        <img
                          src="/tshirt.png"
                          alt="Avatar Tailwind CSS Component"
                          className=" w-full h-full bg-white rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">John Doe</div>
                    </div>
                  </div>
                </td>
                <td>Johndoe@gmail.com</td>
                <td>08194567120</td>
                <td className=" ">Nigeria</td>
                <td className=" text-[#34C759] normal-case">New customer</td>
              </tr>
              <tr
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask  rounded-full w-12 h-12">
                        <img
                          src="/tshirt.png"
                          alt="Avatar Tailwind CSS Component"
                          className=" w-full h-full bg-white rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">John Doe</div>
                    </div>
                  </div>
                </td>
                <td>Johndoe@gmail.com</td>
                <td>08194567120</td>
                <td className=" ">Nigeria</td>
                <td className=" text-[#34C759] normal-case">New customer</td>
              </tr>
              <tr
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask  rounded-full w-12 h-12">
                        <img
                          src="/tshirt.png"
                          alt="Avatar Tailwind CSS Component"
                          className=" w-full h-full bg-white rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">John Doe</div>
                    </div>
                  </div>
                </td>
                <td>Johndoe@gmail.com</td>
                <td>08194567120</td>
                <td className=" ">Nigeria</td>
                <td className=" text-[#FCBB16] normal-case">Regular customer</td>
              </tr>
              <tr
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask  rounded-full w-12 h-12">
                        <img
                          src="/tshirt.png"
                          alt="Avatar Tailwind CSS Component"
                          className=" w-full h-full bg-white rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">John Doe</div>
                    </div>
                  </div>
                </td>
                <td>Johndoe@gmail.com</td>
                <td>08194567120</td>
                <td className=" ">Nigeria</td>
                <td className=" text-[#FCBB16] normal-case">Regular customer</td>
              </tr>
              <tr
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask  rounded-full w-12 h-12">
                        <img
                          src="/tshirt.png"
                          alt="Avatar Tailwind CSS Component"
                          className=" w-full h-full bg-white rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">John Doe</div>
                    </div>
                  </div>
                </td>
                <td>Johndoe@gmail.com</td>
                <td>08194567120</td>
                <td className=" ">Nigeria</td>
                <td className=" text-[#FCBB16] normal-case">Regular customer</td>
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

export default function SingleCustomer() {
  return (
    <div>

        <CustomersList/>
    </div>
  )
}
