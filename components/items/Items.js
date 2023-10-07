import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
export function ItemCategory() {
  return (
    <div className="card relative">
      <figure className="    ">
        <img
          src="/tshirt.png"
          alt="Shoes"
          className="rounded-xl w-full  lg:m-8 xl:m-8 md-m-8 item-category "
        />
      </figure>
      <h2 className=" text-white  font-semibold sm:text-sm sm:py-0 sm:my-0 absolute bottom-10 right-1/2 text-[28px]  sm:bottom-2">
        Hoodies
      </h2>
    </div>
  );
}

export default function Items() {
     const isDark = useSelector((state) => state.store.toggleMode.isDark);
     const router  = useRouter()

     function handleSingleItemDetailNav(){
router.push("/item/1")
     }
  return (
    <div
      className={`  card  shadow-xl ${
        isDark ? " bg-[#212121]" : "bg-[#D9D9D9]"
      }`}>
      <figure className="  ">
        <img
          src="/tshirt.png"
          alt="Shoes"
          className={` sm:p-4 w-full  lg:m-8 xl:m-8  ${
            isDark
              ? "bg-[white]  rounded-xl"
              : "bg-[#e4e1e1] border-0 rounded-none"
          }`}
        />
      </figure>
      <div className=" px-1 mx-auto text-center">
        <h2 className=" font-normal  text-center text-[18px] sm:text-sm sm:py-2 sm:my-0 sm:text-[7.98px]  sm:font-normal">
          Cotton T-shirt
        </h2>
        <p className="my-3 sm:text-[7.98px] sm:my-0 ">₦10000.00</p>
        <div className="card-actions lg:mb-4 xl:mb-4 md:mb-4 flex gap-16 sm:gap-3">
          <button
            className={`btn  shadow-md    capitalize sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black"
            }`}>
            Add to cart
          </button>
          <button
            className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black"
            }`}
            onClick={handleSingleItemDetailNav}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
