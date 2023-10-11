import React from "react";
import { useSelector } from "react-redux";

function Wallet() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2 className="mb-3">Wallet Balance</h2>

        <div className="flex  justify-between items-center flex-wrap">
          <h2 className="lg:text-[30px] xl:text-[30px] lg:font-semibold xl:font-semibold">
            ₦0.00
          </h2>
          <button
            className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black"
            }`}>
            Fund Account
          </button>
        </div>
      </div>
    </div>
  );
}
function AccountInfo() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2
          className={`mb-3 border-b pb-1 ${
            isDark ? " border-b-white" : " border-black"
          }`}>
          Account Information
        </h2>

        <div className=" flex gap-5 sm:mb-3 lg:mb-3 xl:mb-3 flex-wrap">
          <h2>Name</h2>
          <h2>John Does</h2>
        </div>
        <div className=" flex gap-5 flex-wrap">
          <h2>Email</h2>
          <h2 className="   break-all   normal-case md:text-sm">
            chileomereji@gmail.com
          </h2>
        </div>
      </div>
    </div>
  );
}
function ShippingInfo() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2
          className={`mb-3 border-b pb-1 ${
            isDark ? " border-b-white" : " border-black"
          }`}>
          Shipping Information
        </h2>

        <div className=" flex gap-5 sm:mb-3 lg:mb-3 xl:mb-3 flex-wrap">
          <h2>Phone:</h2>
          <h2>08104274522</h2>
        </div>
        <div className=" flex gap-5 ">
          <h2>Address</h2>
          <h2 className="    normal-case md:text-sm">
            No. 12, Maryland street Rumuigbo, Port Harcourt, Rivers state
            Nigeria.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default function Accountupdate() {
  return (
    <div className="  ">
      <Wallet />
      <AccountInfo />
      <ShippingInfo />
    </div>
  );
}
