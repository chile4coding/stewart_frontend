import { useRouter } from 'next/router';
import React from 'react'
import { AiFillCloseSquare, AiFillEye, AiFillStar } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';

function TotalReviews({ title, total, percentage, value , newCustomers, returningCustomers}) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <div className=" flex   items-center  justify-between">
          <div className=" flex items-center gap-1">
            <p>{title}</p>
          </div>
          <select
            className={`select  select-sm ${
              isDark ? " bg-[#646464]" : " bg-[#646464] border-black text-white"
            }`}>
            <option>All Time</option>
            <option>weekly</option>
            <option>monthly</option>
            <option>yearly</option>
          </select>
        </div>
        <h2 className="  my-2 lg:text-[30px]  xl:text-[30px] font-semibold">
          {total}
        </h2>

        <div className=" flex   items-center  justify-between">
          <h2 className=" ">{value}</h2>
          <h2
            className={
              percentage.includes("+") ? "text-[#34C759]" : "text-[#D73300]"
            }>
            {percentage}
          </h2>
        </div>
        <div className=" flex   items-center  justify-between">
          <h2 className=" ">New customers</h2>
          <h2
        >
{newCustomers}
          </h2>
        </div>
        <div className=" flex   items-center  justify-between">
          <h2 className=" ">Returning customers</h2>
          <h2
         >
           {returningCustomers}
          </h2>
        </div>
      </div>
    </div>
  );
}
function ReviewDetails() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <div className=" flex gap-2 justify-between ">
          <div className=" flex  gap-2">
            <h2>5</h2>

            <AiFillStar className=" text-[#FCBB16]" />
          </div>
          <div className="   flex flex-col gap-3">
            {" "}
            <progress
              className="progress w-40 lg:w-56 "
              value={100}
              max="100"></progress>
            <progress
              className="progress progress-warning w-40 lg:w-56 "
              value="40"
              max="100"></progress>
          </div>
          <h2>25%</h2>
        </div>
        <div className=" flex gap-2 justify-between ">
          <div className=" flex   gap-2">
            <h2>4</h2>

            <AiFillStar className=" text-[#FCBB16]" />
          </div>
          <div className="   flex flex-col gap-3">
            {" "}
            <progress
              className="progress w-40 lg:w-56 "
              value={100}
              max="100"></progress>
            <progress
              className="progress progress-warning w-40 lg:w-56 "
              value="60"
              max="100"></progress>
          </div>
          <h2>28%</h2>
        </div>
        <div className=" flex gap-2 justify-between ">
          <div className=" flex  gap-2 ">
            <h2>3</h2>

            <AiFillStar className=" text-[#FCBB16]" />
          </div>
          <div className="   flex flex-col gap-3">
            {" "}
            <progress
              className="progress w-40 lg:w-56 "
              value={100}
              max="100"></progress>
            <progress
              className="progress progress-warning w-40 lg:w-56 "
              value="20"
              max="100"></progress>
          </div>
          <h2>18%</h2>
        </div>
        <div className=" flex gap-2 justify-between ">
          <div className=" flex  gap-2">
            <h2>2</h2>

            <AiFillStar className=" text-[#FCBB16]" />
          </div>
          <div className="   flex flex-col gap-3">
            {" "}
            <progress
              className="progress w-40 lg:w-56 "
              value={100}
              max="100"></progress>
            <progress
              className="progress progress-warning w-40 lg:w-56 "
              value="14"
              max="100"></progress>
          </div>
          <h2>17%</h2>
        </div>
        <div className=" flex gap-2 justify-between ">
          <div className=" flex  gap-2">
            <h2>1</h2>

            <AiFillStar className=" text-[#FCBB16]" />
          </div>
          <div className="   flex flex-col gap-3">
            {" "}
            <progress
              className="progress w-40 lg:w-56 "
              value={100}
              max="100"></progress>
            <progress
              className="progress progress-warning w-40 lg:w-56 "
              value="10"
              max="100"></progress>
          </div>
          <h2>12%</h2>
        </div>
      </div>
    </div>
  );
}


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
        <div className=" overflow-x-auto ">
          <table className="table">
            <thead className="">
              <tr
                className={` ${
                  isDark
                    ? " border-b border-b-white text-white"
                    : " border-b border-b-black text-black"
                }`}>
                <th>Customer</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>
                  {" "}
                  <select
                    className={`select  select-sm ${
                      isDark
                        ? " bg-[#646464]"
                        : " bg-[#646464] border-black text-white"
                    }`}>
                    <option>All Time</option>
                    <option>weekly</option>
                    <option>monthly</option>
                    <option>yearly</option>
                  </select>
                </th>
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
                      <div className="text-sm opacity-50">
                        Johndoe@gmail.com
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  <div className=" flex  gap-2 items-center">
                    <h2>3</h2>

                    <AiFillStar className=" text-[#FCBB16]" />
                  </div>
                </td>
                <td>
                  <div className="collapse  max-w-[200px] border">
                    <input type="checkbox" />
                    <div className="collapse-title  font-normal  flex justify-between pr-2">
                      <div>
                        {" "}
                        Read comment
                      </div>
                      <span className=" justify-self-end  self-center pr-0">
                        <MdKeyboardArrowDown/>
                      </span>
                    </div>
                    <div className="collapse-content">
                      <p>hello</p>
                    </div>
                  </div>
                </td>
                <td className=" ">
                  <div>
                    <h2>03/08/2023</h2>
                    <h2 className=" opacity-50">At 10:30 AM</h2>
                  </div>
                </td>
                <td>
                  <div className=" flex items-center  gap-3 hover:underline hover:cursor-pointer ">
                    <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    <h2>Remove</h2>
                  </div>
                </td>
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
                      <div className="text-sm opacity-50">
                        Johndoe@gmail.com
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  <div className=" flex  gap-2 items-center">
                    <h2>3</h2>

                    <AiFillStar className=" text-[#FCBB16]" />
                  </div>
                </td>
                <td>
                  <div className="collapse  max-w-[200px] border">
                    <input type="checkbox" />
                    <div className="collapse-title  font-normal  flex justify-between pr-2">
                      <div>
                        {" "}
                        Read comment
                      </div>
                      <span className=" justify-self-end  self-center pr-0">
                        <MdKeyboardArrowDown/>
                      </span>
                    </div>
                    <div className="collapse-content">
                      <p>hello</p>
                    </div>
                  </div>
                </td>
                <td className=" ">
                  <div>
                    <h2>03/08/2023</h2>
                    <h2 className=" opacity-50">At 10:30 AM</h2>
                  </div>
                </td>
                <td>
                  <div className=" flex items-center  gap-3 hover:underline hover:cursor-pointer ">
                    <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    <h2>Remove</h2>
                  </div>
                </td>
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
                      <div className="text-sm opacity-50">
                        Johndoe@gmail.com
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  <div className=" flex  gap-2 items-center">
                    <h2>3</h2>

                    <AiFillStar className=" text-[#FCBB16]" />
                  </div>
                </td>
                <td>
                  <div className="collapse  max-w-[200px] border">
                    <input type="checkbox" />
                    <div className="collapse-title  font-normal  flex justify-between pr-2">
                      <div>
                        {" "}
                        Read comment
                      </div>
                      <span className=" justify-self-end  self-center pr-0">
                        <MdKeyboardArrowDown/>
                      </span>
                    </div>
                    <div className="collapse-content">
                      <p>hello</p>
                    </div>
                  </div>
                </td>
                <td className=" ">
                  <div>
                    <h2>03/08/2023</h2>
                    <h2 className=" opacity-50">At 10:30 AM</h2>
                  </div>
                </td>
                <td>
                  <div className=" flex items-center  gap-3 hover:underline hover:cursor-pointer ">
                    <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    <h2>Remove</h2>
                  </div>
                </td>
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


export default function RevieswDetails() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-1 md:grid-cols-1">
        <ReviewDetails />
        <TotalReviews
          title="Total Reviews"
          total="120"
          percentage="+31%"
          value="Last 7 days"
          returningCustomers={40}
          newCustomers={80}
        />
      </div>
      <CustomersList/>
    </div>
  );
}
