import React, { useEffect } from "react";
import Items from "@/components/items/Items";
import AppLayoout from "@/components/Layout/AppLayoout";
import { AiOutlineDownCircle } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";


function SortComponent() {
    const isDark = useSelector((state) => state.store.toggleMode.isDark);



  return (
    <div
      className={`card normal-case p-4 absolute  top-14 border right-10  z-50 ${
        isDark ? " bg-white border-black" : " bg-black text-white"
      }`}>
      <button
        className={`btn  btn-sm btn-outline border-0 normal-case ${
          isDark ? " hover:bg-black  hover:text-white" : "text-white"
        }`}>
        hoodies{" "}
      </button>
      <button
        className={`btn btn-sm btn-outline border-0 normal-case ${
          isDark ? "hover:bg-black  hover:text-white" : "text-white"
        }`}>
        Joggers{" "}
      </button>
      <button
        className={`btn btn-sm btn-outline border-0 normal-case ${
          isDark ? "hover:bg-black  hover:text-white" : "text-white"
        }`}>
        Polo{" "}
      </button>
    </div>
  );
}
export default function Shop() {
  const [show, setShow] = useState(false);
   const {
     shop,
     toggleMode,
   } = useSelector((state) => state.store);



   const { isDark } = toggleMode;
  const router   = useRouter()

  const handleShowState = () => setShow((prev) => !prev);
  return (
    <AppLayoout>
      <main className=" px-10 sm:px-4">
        <div className="flex  justify-between  items-center mt-10 flex-wrap relative ">
          <h2>Showing {shop.length } products</h2>
          <button
            onClick={handleShowState}
            className={` btn btn-outline flex normal-case  ${
              isDark ? " border-white text-white" : ""
            }`}>
            Sort <AiOutlineDownCircle />
          </button>

          {show && <SortComponent />}
        </div>
        <div
          className={`grid xl:grid-cols-4 lg:grid-cols-5 md:grid-cols-4 md:gap-4 sm:grid-cols-3  gap-5  sm:gap-3 my-8 `}>
          {shop && shop.length > 0 && shop.map((prod) => <Items  items={prod}/>)}
        </div>
        <div className=" flex justify-center ">
          <button
            className={` my-4 btn btn-outline  mx-auto normal-case sm:btn-sm ${
              isDark
                ? "  border-white text-white hover:bg-white  hover:text-black"
                : " bg-black text-white hover:border-black hover:bg-white hover:text-black"
            } `}>
            Load More
          </button>
        </div>
      </main>
    </AppLayoout>
  );
}
