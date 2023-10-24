import React from 'react'
import { useSelector } from 'react-redux';
import { CustomerPieChart } from './CustormersPieChart';
import { useRouter } from 'next/router';


function SummaryCard({ title, total, percentage }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <div className=" flex   items-center  justify-between">
          <p className=' md:text-xs'>{title}</p>
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

export default function CustomersDetails() {
      const isDark = useSelector((state) => state.store.toggleMode.isDark);
      const router  = useRouter()

      function handleSingleCustomerDetails(){
        router.push("/admin/customers/details")
      }

  return (
    <>
      <div className=" grid grid-cols-3 sm:grid-cols-1 gap-5">
        <SummaryCard title="All customers" total={"930"} percentage="+6%" />
        <SummaryCard title="New customers" total={"930"} percentage="-6%" />
        <SummaryCard title="Regular customers" total={"930"} percentage="+6%" />
      </div>

      <div
        className={`mb-6 h-[100%]    card ${
          isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
        }`}>
          <div className=' flex justify-between px-10 py-5'>
            <h2>Customer retention rate</h2>
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
          </div>
        <div className=" card-body  m-auto w-[100%] lg:w-[50%] md:w-[60%] xl:w-[50%]">
          <CustomerPieChart />
          <div className=" flex justify-end">
            <span className=" hover:underline  cursor-pointer" onClick={handleSingleCustomerDetails}>
              View customer list
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
