import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Graph, { PieChart } from "./Graph";
import { AiFillEye, AiFillStar } from "react-icons/ai";
import {
  adminGetOrders,
  adminGetreviews,
  getAdminGraph,
  getCookie,
  getCustomers,
  getShopProducts,
  getVisitors,
} from "@/services/request";
import {
  getGraphData,
  initUser,
  initVisitor,
  setAdminOrder,
  setAdminReviews,
  setRevenueOrders,
  setTopSale,
} from "@/redux/storeSlice";
import { useRouter } from "next/router";

function SummaryCard({ title, total, percentage, isRevenue }) {
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
            <option>All Time</option>
            {/* <option>monthly</option>
            <option>yearly</option> */}
          </select>
        </div>
        <div className=" flex   items-center  justify-between">
          <h2 className=" lg:text-[30px]  xl:text-[30px] font-semibold">
            {isRevenue && "₦"} {total && isRevenue ? total.toFixed(2) : total}
          </h2>
        </div>
      </div>
    </div>
  );
}

function Visitor({ title, total, percentage, value }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <div className=" flex   items-center  justify-between">
          <div className=" flex items-center gap-1">
            <AiFillEye className=" text-lg" />
            <p>{title}</p>
          </div>
          <select
            className={`select  select-sm ${
              isDark ? " bg-[#646464]" : " bg-[#646464] border-black text-white"
            }`}>
            <option>All Time</option>
            {/* <option>weekly</option>
            <option>monthly</option>
            <option>yearly</option> */}
          </select>
        </div>
        <h2 className="  my-2 lg:text-[30px]  xl:text-[30px] font-semibold">
          {total}
        </h2>

        <div className=" flex   items-center  justify-between">
          <h2 className=" "></h2>
          {/* <h2
            className={
              percentage.includes("+") ? "text-[#34C759]" : "text-[#D73300]"
            }>
            {percentage}
          </h2> */}
        </div>
      </div>
    </div>
  );
}
function Reviews({ title, total, percentage, value }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router = useRouter();

  function handleRoute() {
    router.push("/admin/reviews");
  }

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <div className=" flex   items-center  justify-between">
          <div className=" flex items-center gap-1">
            <AiFillStar className=" text-lg" />
            <p>{title}</p>
          </div>
          <select
            className={`select  select-sm ${
              isDark ? " bg-[#646464]" : " bg-[#646464] border-black text-white"
            }`}>
            <option>All Time</option>
            {/* <option>weekly</option>
            <option>monthly</option>
            <option>yearly</option> */}
          </select>
        </div>
        <h2 className="  my-2 lg:text-[30px]  xl:text-[30px] font-semibold">
          {total && total}
        </h2>

        <div className=" flex   items-center  justify-between">
          <h2 className=" "></h2>
          <h2
            className=" hover:underline hover:cursor-pointer"
            onClick={handleRoute}>
            {percentage}
          </h2>
        </div>
      </div>
    </div>
  );
}

function TopSellingItems({ sale }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2 className=" lg:text-[24px] lg:font-semibold xl:text-[24px] xl:font-semibold  ">
          Top Selling Products
        </h2>
        <table className="table">
          <thead className="">
            <tr
              className={
                isDark
                  ? " text-white border-b"
                  : " border-b  text-black border-b-black"
              }>
              <th>Product</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {sale.map((item) => (
              <tr
                key={item.id}
                className={
                  isDark ? " text-white border-0" : "  text-black border-0"
                }>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask  rounded-md w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                          className=" w-full h-full bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>

                <th>
                  <span className=" normal-case hover:underline hover:cursor-pointer">
                    {item.sales}
                  </span>
                </th>
              </tr>
            ))}
          </tbody>

          {/* foot */}
        </table>
      </div>
    </div>
  );
}

export default function OverviewDetails() {
  const [btn, setBtn] = useState([
    { id: 0, name: "weekly" },
    { id: 1, name: "Monthly" },
    { id: 2, name: "Yearly" },
  ]);
  const [activeBtn, setActiveBtn] = useState(0);
  const {
    toggleMode,
    admin,
    revenue,
    totalOrders,
    userCount,
    visiorCount,
    adminReviews,
    graphData,
    saleByCategory,
    topSale,
  } = useSelector((state) => state.store);
  const [token, setToken] = useState(null);
  const isDark = toggleMode?.isDark;
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getCookie();

    setToken(token);
    async function fetchOrders() {
      const response = await adminGetOrders(token);
      const data = await response.json();
      const res = await adminGetreviews(token);
      const dataR = await res.json();
      const dataG = await getAdminGraph(token);
      dispatch(getGraphData(dataG?.userData1));

      const dataC = await getCustomers(token);

      const dataV = await getVisitors(token);
      const dataP = await getShopProducts();

      dispatch(initUser(dataC?.users?.length));
      if (data?.orders?.length > 0 && dataP.products?.length > 0) {
        dispatch(
          setAdminOrder({ orders: data.orders, products: dataP?.products })
        );
      }
      dispatch(setTopSale(data?.orders));

      dispatch(setRevenueOrders(data.orders));
      dispatch(
        initVisitor(
          dataV?.visitors[0]?.count ? dataV?.visitors[0]?.count - 1 : 0
        )
      );
      dispatch(setAdminReviews(dataR?.reviews));
    }
    fetchOrders();
  }, []);

  function handleWeeklybtnClick(id) {
    setActiveBtn(id);
  }

  return (
    <div>
      <h2 className=" normal-case mb-2 xl:mt-6">
        <div className="  py-3">
          Hi <span className="font-bold  capitalize"> {admin?.first_name}</span>{" "}
          here’s how your store is doing today
        </div>{" "}
      </h2>

      <div className=" grid grid-cols-3  gap-6 sm:grid-cols-1 my-6">
        <SummaryCard title="Total Revenue" total={revenue} isRevenue={true} />
        <SummaryCard
          title="Total Customers"
          total={userCount}
          percentage="-6%"
          isRevenue={false}
        />
        <SummaryCard
          title="Total Orders"
          total={totalOrders}
          percentage="+14%"
          isRevenue={false}
        />
      </div>

      <div className=" grid grid-cols-2 sm:grid-cols-1 mt-10 mb-5 gap-10">
        <Visitor
          title="Website Visitors"
          total={visiorCount}
          percentage="+31%"
          value="+1,340 this week"
        />
        <Reviews
          title="Reviews"
          total={adminReviews?.length}
          percentage="See all reviews"
          value="+12 this week"
        />
      </div>
      <div className=" grid grid-cols-2  sm:grid-cols-1 gap-10  md:grid-cols-1">
        {topSale && topSale?.length > 0 && <TopSellingItems sale={topSale} />}

        <div
          className={`mb-6  card  flex    ${
            isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
          }`}>
          <div className=" card-body">
            <h2 className="lg:text-[24px] lg:font-semibold xl:text-[24px] xl:font-semibold  mb-4">
              Sales by Category
            </h2>
            <div className="h-[250px]   my-auto mx-auto">
              {saleByCategory && saleByCategory?.length > 0 && <PieChart />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
