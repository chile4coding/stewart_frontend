import React from "react";
import Image from "next/image";

function CartCard(){

    return(
        <div>
            
        </div>
    )
}

export default function Checkout() {
  return (
    <div className=" grid grid-cols-2 sm:grid-cols-1 gap-14 md:grid-cols-1 ">
      <div className="md:order-2 sm:order-2">
        <h2 className="text-[18px] font-semibold my-7">Shipping Address</h2>
        <div className="grid  grid-cols-2 gap-4 sm:grid-cols-1">
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered  w-full max-w-xs  bg-black border-white sm:max-w-full"
          />
          <input
            type="text"
            placeholder="Surname"
            className="input input-bordered  w-full max-w-xs bg-black border-white sm:max-w-full"
          />
        </div>

        <div className=" my-8   ">
          <input
            type="text"
            placeholder="Country/Region"
            className="input input-bordered  w-full bg-black border-white"
          />
        </div>
        <div className=" my-8   ">
          <input
            type="text"
            placeholder="State"
            className="input input-bordered  w-full bg-black border-white"
          />
        </div>
        <div className=" my-8   ">
          <input
            type="text"
            placeholder="City"
            className="input input-bordered  w-full bg-black border-white"
          />
        </div>
        <div className=" my-8   ">
          <input
            type="text"
            placeholder="Postal code"
            className="input input-bordered  w-full bg-black border-white"
          />
        </div>
        <div className=" my-8   ">
          <input
            type="text"
            placeholder="Address"
            className="input input-bordered  w-full bg-black border-white"
          />
        </div>
        <div className=" my-8   ">
          <input
            type="text"
            placeholder="Phone number"
            className="input input-bordered  w-full bg-black border-white"
          />
        </div>
        <div className=" my-8   ">
          <input
            type="text"
            placeholder="Email address"
            className="input input-bordered  w-full bg-black border-white"
          />
        </div>
        <div className="flex gap-2 my-8">
          <input type="checkbox" />
          <span className=" normal-case">
            Remember this information for next time
          </span>
        </div>
        <div className="  flex justify-center mb-24">
          <button className="btn hover:bg-white hover:text-black  btn-outline border normal-case   border-white text-white  px-8 py-4">
            Proceed to Payment
          </button>
        </div>
      </div>
      <div className="  flex  flex-col  my-20  md:order-1 sm:order-1">
        <div className=" card bg-[#212121] text-[#F8F8F8]  px-10 py-6 ">
          <h1 className=" border-b border-[#6b6b6b] text-[18px] font-semibold text-center py-4">
            Your Order
          </h1>

          <div className="grid grid-cols-2  sm:grid-cols-1  py-8">
            <div className="  flex  gap-3 items-center   relative">
              {" "}
              <Image
                src="/tshirt.png"
                height={70}
                width={70}
                alt="item"
                className=" bg-white"
              />
              <span
                className="absolute  bottom-14 left-14 font-bold text-black  p-1 px-2 bg-white "
                style={{ borderRadius: "50%" }}>
                7
              </span>
              <h2 className=" text-[18px] font-normal">
                Heavy Blend™ Crewneck Sweatshirt
              </h2>
            </div>
            <h2 className=" justify-self-end self-center">00.00</h2>
          </div>
          <div className="grid grid-cols-2  sm:grid-cols-1 my-6">
            <div className="  flex  gap-3 items-center relative  ">
              {" "}
              <Image
                src="/tshirt.png"
                height={70}
                width={70}
                alt="item"
                className=" bg-white"
              />
              <span
                className="absolute  bottom-14 left-14 font-bold text-black  p-1 px-2 bg-white "
                style={{ borderRadius: "50%" }}>
                7
              </span>
              <h2 className=" text-[18px] font-normal">
                Heavy Blend™ Crewneck Sweatshirt
              </h2>
            </div>
            <h2 className=" justify-self-end self-center">00.00</h2>
          </div>
          <div className="grid grid-cols-2  sm:grid-cols-1 my-6 border-b border-[#6b6b6b] pb-8">
            <div className="  flex  gap-3 items-center   relative">
              {" "}
              <Image
                src="/tshirt.png"
                height={70}
                width={70}
                alt="item"
                className=" bg-white"
              />
              <span
                className="absolute  bottom-14 left-14 text-black  p-1 px-2 bg-white font-bold "
                style={{ borderRadius: "50%" }}>
                7
              </span>
              <h2 className=" text-[18px] font-normal">
                Heavy Blend™ Crewneck Sweatshirt
              </h2>
            </div>
            <h2 className=" justify-self-end self-center">00.00</h2>
          </div>

          <div className="grid grid-cols-2  sm:grid-cols-1 my-4  text-[18px] font-normal">
            <h2>Subtotal</h2>
            <h2 className=" justify-self-end self-center  text-[18px] font-normal">
              00.00
            </h2>
          </div>
          <div className="grid grid-cols-2  sm:grid-cols-1 my-4  text-[18px] font-normal">
            <h2>Subtotal</h2>
            <h2 className=" justify-self-end self-center">00.00</h2>
          </div>
          <div className="grid grid-cols-2  sm:grid-cols-1 my-4  text-[18px] font-normal">
            <h2>Subtotal</h2>
            <h2 className=" justify-self-end self-center">00.00</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
