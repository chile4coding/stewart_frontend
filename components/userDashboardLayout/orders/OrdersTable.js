import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getSingleOrders, getuserOrders } from "@/redux/storeSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { pagination } from "@/services/request";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
export default function OrdersTable() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, toggleMode, orders, orderDetails } = useSelector(
    (state) => state.store
  );
  const { isDark } = toggleMode;
  const [table, setTable] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const page = pagination(orders);
    setTable(page);
       setPage((prev) => 0);
  }, [orders]);

  function handleOrderDetails(id) {
    dispatch(getSingleOrders({ id, orders: user.orders }));
    router.push(`/orders/${id}`);
  }

  function handlePageination(pageId) {
    setPage((prev) => pageId);
  }


  
  return (
    <div
      className={`  h-[100vh] pb-3 mb-6  rounded-md ${
        isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
      }`}>
      {orders &&  table.length > 0 ? <div
        className={` card-body overflow-x-auto mb-6  rounded-md ${
          isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
        }`}>
        <table className="table">
          <thead className="">
            <tr
              className={
                isDark ? " text-white border-0" : " border-0  text-black"
              }>
              <th>Product</th>
              <th>Order ID</th>
              <th>Payment status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 &&
              table.length > 0 &&
              table[page].map((item) => (
                <tr
                  className={
                    isDark ? " text-white border-0" : "  text-black border-0"
                  }>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle rounded-md w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                            className=" w-full h-full bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm opacity-50">T-Shirt</div>
                      </div>
                    </div>
                  </td>
                  <td> #{item.id.slice(0, 6)}</td>
                  <td>
                    <p
                      className={
                        item.status === "SUCCESS"
                          ? "text-[#52db70]"
                          : item.status === "PAY ON DELIVERY"
                          ? " text-[yellow]"
                          : " text-[red]"
                      }>
                      {item.status}
                    </p>
                    <p className={isDark ? "active_label" : ""}>Pending</p>
                  </td>
                  <th>
                    <span
                      className=" normal-case hover:underline hover:cursor-pointer"
                      onClick={handleOrderDetails.bind(this, item.id)}>
                      View details
                    </span>
                  </th>
                </tr>
              ))}
          </tbody>
          {/* foot */}
        </table>
        <div className=" flex items-center gap-3 mt-6">
          {table.length > 0 &&
            table.map((item, i) => (
              <button
                onClick={handlePageination.bind(this, i)}
                className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                  isDark
                    ? "hover:border-white hover:bg-black hover:text-white"
                    : " bg-black text-white hover:border-black  "
                }  ${page === i ? " bg-[#302999]" : ""}`}>
                {i + 1}
              </button>
            ))}

          {
            <button
              onClick={handlePageination.bind(this, table.length - 1)}
              className={`btn  flex gap-0  capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}>
              <IoIosArrowForward />
              <IoIosArrowForward />
            </button>
          }
        </div>
      </div>: <h2 className="text-center">No item found</h2> }
     
    </div>
  );
}
