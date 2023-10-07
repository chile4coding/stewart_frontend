import React from "react";
import Items from "@/components/items/Items";
import AppLayoout from "@/components/Layout/AppLayoout";
import { AiOutlineDownCircle } from "react-icons/ai";
import { useState } from "react";
import { useSelector } from "react-redux";

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
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  const handleShowState = () => setShow((prev) => !prev);
  return (
    <AppLayoout>
      <div className="flex  justify-between  items-center mt-10 flex-wrap relative px-10">
        <h2>Showing 7 products</h2>
        <button
          onClick={handleShowState}
          className={` btn btn-outline flex normal-case  ${isDark?" border-white text-white":""}`}>
          Sort <AiOutlineDownCircle />
        </button>

        {show && <SortComponent />}
      </div>
      <div
        className={`grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  gap-10 my-8 px-10`}>
        <Items />
        <Items />
        <Items />

        <Items />
        <Items />
        <Items />

        <Items />
        <Items />
        <Items />
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
    </AppLayoout>
  );
}
