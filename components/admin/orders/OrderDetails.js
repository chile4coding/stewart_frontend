import { setAdminOrder, setAdminOrderDetail } from '@/redux/storeSlice';
import { adminGetOrders, getCookie, pagination } from '@/services/request';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'


function SummaryCard({ title, total, percentage }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <div className=" flex   items-center  justify-between">
          <p>{title}</p>
          {/* <select
            className={`select  select-sm ${
              isDark ? " bg-[#646464]" : " bg-[#646464] border-black text-white"
            }`}>
            <option>weekly</option>
            <option>monthly</option>
            <option>yearly</option>
          </select> */}
        </div>
        <div className=" flex   items-center  justify-between">
          <h2 className=" lg:text-[30px]  xl:text-[30px] font-semibold">
            {total}
          </h2>
          <h2
            className={
              percentage.includes("+") ? "text-[#34C759]" : "text-[#D73300]"
            }>
           
          </h2>
        </div>
      </div>
    </div>
  );
}

function OrdertList({ orders }) {
  // const isDark = useSelector((state) => state.store.toggleMode.isDark);
     const { user, toggleMode, adminOrderDetails } = useSelector(
       (state) => state.store
     );
     const isDark = toggleMode?.isDark
  const router = useRouter();
  const dispatch  = useDispatch()
    const [table, setTable] = useState([]);
    const [page, setPage] = useState(0);

  useEffect(()=>{
        const page = pagination(orders);
        setTable(page);
        setPage((prev) => 0);

  },[])



  function handleNavigation({id, detail}) {


    dispatch(setAdminOrderDetail({id, orders}));
   
    router.push(`/admin/orders/${id}`);
  }

  function handlePageination(pageId) {
    setPage((prev) => pageId);
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
        {/* <div
          className={`flex justify-between  ${
            isDark ? " border-b border-b-white" : " border-b border-b-black"
          }`}>
          <span className=" activeBtn pb-2">All orders</span>
          <span className=" activeBtn pb-2">New orders</span>
          <span className=" activeBtn pb-2">Completed orders</span>
          <span className=" activeBtn pb-2">Pending orders</span>
          <span className=" activeBtn pb-2">Cancelled orders</span>
        </div> */}
        <div className=" overflow-x-auto ">
          <table className="table">
            <thead className="">
              <tr
                className={
                  isDark
                    ? " text-white  border-b border-b-white"
                    : "   text-black  border-b border-b-black"
                }>
                <th>Order ID</th>

                <th>Price</th>
                <th>Order status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.length > 0 &&
                table.length > 0 &&
                table[page].map((order) => {
                  return (
                    <tr
                      key={order.id}
                      className={
                        isDark
                          ? " text-white border-0"
                          : "  text-black border-0"
                      }>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask  rounded-md w-12 h-12">
                              <img
                                src={order?.orderitem[0]?.image}
                                alt="Avatar Tailwind CSS Component"
                                className=" w-full h-full bg-white"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold normal-case">
                              {order.id.slice(-6)}
                            </div>

                          </div>
                        </div>
                      </td>

                      <td>₦{order.total}</td>
                      <td
                        className={
                          order.status === "SUCCESS"
                            ? "text-[#52c56f]"
                            : "text-[#FCBB16]"
                        }>
                        {order.status}
                      </td>
                      <td>
                        <div className=" flex items-center justify-between ">
                          <div
                            className=" flex items-center gap-1 hover:underline hover:cursor-pointer"
                            onClick={handleNavigation.bind(this, {
                              detail: "details",
                              id: order.id,
                            })}>
                            <span>View</span>
                          </div>
                          <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className=" flex items-center gap-3 mt-6">
          {table.length > 0 &&
            table.map((item, i) => (
              <button
                onClick={handlePageination.bind(this, i)}
                className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                  isDark
                    ? "hover:border-white hover:bg-black hover:text-white"
                    : " bg-black text-white hover:border-black  "
                }  ${page === i ? " bg-[#302999] text-[white]" : ""}`}>
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
      </div>
    </div>
  );
}



function OrderDetails() {
    const { user, toggleMode,  adminOrder } = useSelector(
      (state) => state.store
    );

    const [totalOrder, setTotalOrder]= useState(null)
    const [conpletedOrder, setCompletedOrder]= useState(null)
    const  [pendingOrder, setPendingOrder]   = useState(null)
  const dispatch = useDispatch()
  useEffect(()=>{
    const token = getCookie()
async function fetchOrders(){
  const  response  = await  adminGetOrders(token)
  const data  = await  response.json()
  dispatch(setAdminOrder({orders:data.orders}));
  if(data?.orders.length > 0){
    setTotalOrder(data.orders.length)

    setCompletedOrder(data.orders.filter(item=> item.status === "SUCCESS").length)
    setPendingOrder(
      data.orders.filter((item) => item.status !== "SUCCESS").length
    );
  }

}
fetchOrders()
  },[])
  return (
    <main>
      <div className=" grid grid-cols-3 sm:grid-cols-1 gap-5">
        <SummaryCard title="Total Orders" total={totalOrder} percentage="+6%" />
        <SummaryCard title="Completed orders" total={conpletedOrder} percentage="-6%" />
        <SummaryCard title="Pending orders" total={pendingOrder} percentage="+6%" />
      </div>

      {adminOrder && adminOrder.length > 0 && <OrdertList  orders={adminOrder}/>}
    </main>
  );
}

export default OrderDetails