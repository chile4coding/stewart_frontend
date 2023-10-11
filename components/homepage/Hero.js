import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Hero() {
 const router  =  useRouter()
  const isDark  = useSelector(state=>state.store.toggleMode.isDark)

    function handleShopNav() {
      router.replace("/shop");
    }
    function handleCreateAccountNav() {
      router.replace("/signup");
    }

  return (
    <section
      className={`grid  grid-cols-2 md:grid-cols-1 sm:min-h-[200px]  bg  sm:grid-cols-1   p-10       sm:px-5 ${
        isDark ? " bg-[#D9D9D9]" : " bg-[#D9D9D9]"
      }`}>
      <div className="  md:order-2 sm:order-2  self-center sm:self-end">
        <h2 className="text-[48px] text-white    font-semibold sm:text-[30px]  sm:font-normal ">
          Modern Fashion
          <br /> Redefined
        </h2>
        <p className="text-[18px]  leading-7 mt-6 text-white">
          Welcome to Stewart Collection, where fashion meets passion and
          individuality. Get ready to redefine your style with us!
        </p>
        <div className="  flex items-center gap-8   sm:gap-4 sm:mt-4  ">
          <button
            className={`  btn normal-case   font-normal mt-6 sm:mt-0 px-6 sm:btn-sm sm:text-xs   bg-transparent text-white hover:bg-white  hover:text-black`}
            onClick={handleShopNav}>
            Start shopping
          </button>
          <button
            className={`  btn normal-case   font-normal mt-6 sm:mt-0 px-6 sm:btn-sm sm:text-xs   bg-transparent text-white hover:bg-white  hover:text-black`}
            onClick={handleCreateAccountNav}>
            Create Account
          </button>
        </div>
      </div>
      {/* <div className=" lg:justify-self-center  self-center  xl:justify-self-center xs:order-1 md:order-1 sm:order-1 sm:hidden">
        {isDark ? (
          <Image
            src="/triangle.png"
            alt="hero triangle"
            width={456}
            height={425}
          />
        ) : (
          <Image
            src="/triangledark.png"
            alt="hero triangle"
            width={456}
            height={425}
          />
        )}
      </div> */}
    </section>
  );
}
