import { useRouter } from 'next/router';
import React from 'react'
import { AiFillCloseSquare } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import { useSelector } from 'react-redux'


function SummaryCard({ title, total, percentage }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <div className=" flex   items-center  justify-between">
          <p>{title}</p>
          <select
            className={`select  select-sm ${
              isDark ? " bg-[#646464]" : " bg-[#646464] border-black text-white"
            }`}>
            <option>weekly</option>
            <option>monthly</option>
            <option>yearly</option>
          </select>
        </div>
        <div className=" flex   items-center  justify-between">
          <h2 className=" lg:text-[30px]  xl:text-[30px] font-semibold">
            {total}
          </h2>
          <h2
            className={
              percentage.includes("+") ? "text-[#34C759]" : "text-[#D73300]"
            }>
            {percentage}
          </h2>
        </div>
      </div>
    </div>
  );
}

function OrdertList() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router = useRouter();

  function handleNavigation(id) {
    router.push(`/admin/orders/${id}`);
  }

  return (
    <div
      className={` h-[80vh]  pb-3 mb-6  rounded-md ${
        isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
      }`}>
      <div
        className={` card-body overflow-x-auto mb-6  rounded-md ${
          isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
        }`}>
        <div
          className={`flex justify-between  ${
            isDark ? " border-b border-b-white" : " border-b border-b-black"
          }`}>
          <span className=" activeBtn pb-2">All orders</span>
          <span className=" activeBtn pb-2">New orders</span>
          <span className=" activeBtn pb-2">Completed orders</span>
          <span className=" activeBtn pb-2">Pending orders</span>
          <span className=" activeBtn pb-2">Cancelled orders</span>
        </div>
        <div className=" overflow-x-auto ">
          <table className="table">
            <thead className="">
              <tr
                className={
                  isDark ? " text-white border-0 " : "   text-black border-0"
                }>
                <th>Order ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Order status</th>
                <th>Action</th>
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
                      <div className="text-sm opacity-50">T-Shirt</div>
                    </div>
                  </div>
                </td>
                <td> Sweatshirts</td>
                <td>N00.00</td>
                <td className=" text-[#FCBB16]">Pending</td>
                <td>
                  <div className=" flex items-center justify-between ">
                    <div
                      className=" flex items-center gap-1 hover:underline hover:cursor-pointer"
                      onClick={handleNavigation.bind(this, "details")}>
                      <span>View</span>
                    </div>
                    <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
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
                      <div className="text-sm opacity-50">T-Shirt</div>
                    </div>
                  </div>
                </td>
                <td> Sweatshirts</td>
                <td>N00.00</td>
                <td className=" text-[#34C759]">Completed</td>
                <td>
                  <div className=" flex items-center justify-between ">
                    <div
                      className=" flex items-center gap-1 hover:underline hover:cursor-pointer"
                      onClick={handleNavigation.bind(this, "details")}>
                      <span>View</span>
                    </div>
                    <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
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
                      <div className="text-sm opacity-50">T-Shirt</div>
                    </div>
                  </div>
                </td>
                <td> Sweatshirts</td>
                <td>N00.00</td>
                <td className=" text-[#D73300]">Cancelled</td>
                <td>
                  <div className=" flex items-center justify-between ">
                    <div
                      className=" flex items-center gap-1 hover:underline hover:cursor-pointer"
                      onClick={handleNavigation.bind(this, "details")}>
                      <span>View</span>
                    </div>
                    <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
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
                      <div className="text-sm opacity-50">T-Shirt</div>
                    </div>
                  </div>
                </td>
                <td> Sweatshirts</td>
                <td>N00.00</td>
                <td className=" text-[#D73300]">Cancelled</td>
                <td>
                  <div className=" flex items-center justify-between ">
                    <div
                      className=" flex items-center gap-1 hover:underline hover:cursor-pointer"
                      onClick={handleNavigation.bind(this, "details")}>
                      <span>View</span>
                    </div>
                    <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
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



function OrderDetails() {
  return (
    <main>
      <div className=" grid grid-cols-3 sm:grid-cols-1 gap-5">
        <SummaryCard title="New orders" total={"930"} percentage="+6%" />
        <SummaryCard title="Completed orders" total={"930"} percentage="-6%" />
        <SummaryCard title="Pending orders" total={"930"} percentage="+6%" />
      </div>
      <OrdertList/>
    </main>
  );
}

export default OrderDetails