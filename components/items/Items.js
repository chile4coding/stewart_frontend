import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
export function ItemCategory() {
    const isDark = useSelector((state) => state.store.toggleMode.isDark);
  return (
    <div className="card relative rounded-md ">
      <figure className="    ">
        <img
          src="/tshirt.png"
          alt="Shoes"
          className={`rounded-md w-full  lg:m-8 xl:m-8 md-m-8 ${
            isDark ? "item-category" : "bg-[#D9D9D9]"
          }`}
        />
      </figure>
      <span
        className={`break-before-all flex-wrap  sm:text-[9px]   font-semibold sm:text-sm sm:py-0 sm:my-0 absolute bottom-10   sm:bottom-2 md:bottom-2 ${
          isDark ? "text-white" : "text-black"
        }`}>
        Hoodies
      </span>
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
      className={` items-category rounded-md  hover:cursor-pointer card  shadow-xl ${
        isDark ? " bg-[#212121]" : "bg-[#D9D9D9]"
      }`}>
      <div className=" card-body sm:p-2 lg:p-4 md:p-3 xl:p-4">
      <figure className="  ">
        <img
          src="/tshirt.png"
          alt="Shoes"
          className={`  sm:w-full  ${
            isDark
              ? "bg-[white]  rounded-md"
              : "bg-[#e4e1e1] border-0 rounded-none"
          }`}
        />
      </figure>
      <div className="  mx-auto text-center">
        <h2 className=" font-normal  text-center text-[14px] sm:text-sm sm:py-0 sm:my-0 sm:text-[7px]  sm:font-normal">
          Cotton T-shirt
        </h2>
        <p className="my-3 sm:text-[10px] sm:my-0 ">₦10000.00</p>
   
      </div>

      </div>
    </div>
  );
}
