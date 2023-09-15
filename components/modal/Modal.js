import Image from "next/image";
import React from "react";
import { BiCross, BiMinus, BiPlus, BiTime } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { MdOutlineClose } from "react-icons/md";

function ItemsDesc() {
  return (
    <>
      <div className=" flex gap-2 col-span-2  items-center  font-normal ">
        <Image
          src="/tshirt.png"
          height={70}
          width={70}
          alt="item"
          className=" bg-white"
        />
        <h2>Heavy Blend™ Crewneck Sweatshirt</h2>
      </div>
      <h2 className=" self-center font-normal">N00.00</h2>
      <div className=" flex items-center max-w-[120px] border border-white self-center py-1 px-2 rounded">
        <span className=" font-bold text-2xl">
          {" "}
          <BiMinus style={{ cursor: "pointer" }} />{" "}
        </span>{" "}
        <input
          type="number"
          min={1}
          className=" h-7 bg-[#212121] border-0 outline-none w-full"
        />{" "}
        <span className=" font-bold text-2xl">
          {" "}
          <BiPlus style={{ cursor: "pointer" }} />
        </span>
      </div>

      <div className=" flex  justify-between items-center">
        <h2 className="font-normal">N00.00</h2>

        <div className="border border-white text-white">
          <MdOutlineClose
            className=" text-white fill-white"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </>
  );
}
export default function Modal() {
  return (
    <>
      <dialog id="my_modal_2" className="modal modal-left">
        <form
          method="dialog"
          className=" modal-box bg-[#212121]  xl:max-w-5xl lg:max-w-2xl    sm:text-xs text-[white]">
          <div className="  mt-0    text-[16px]  font-semibold  p-10">
            <div className="grid grid-cols-5  border-b-2 border-white py-4">
              <h2 className=" col-span-2">Products</h2>
              <h2>Products</h2>
              <h2>Products</h2>
              <h2>Products</h2>
            </div>
            <div className="grid grid-cols-5  border-b-2 border-white py-4 gap-10 sm:grid-cols-1">
              <ItemsDesc />
            </div>
            <div className=" grid  grid-cols-2 sm:grid-cols-1 my-4">
              <h2>Cart total</h2>
              <h2 className=" justify-self-end">N00.00</h2>
            </div>
            <div className=" grid  grid-cols-2 sm:grid-cols-1 my-4 ">
              <div className=" flex  gap-4">
                <h2 className=" ">Shipping</h2>
                <div className="  flex  items-center gap-2">
                  <input
                    type="radio"
                    name="radio-7"
                    className="radio radio-info"
                    style={{ transform: "scale(1)" }}
                  />
                  <span>Express</span>
                </div>
              </div>
              <h2 className=" justify-self-end">0.00</h2>
            </div>
            <div className=" grid  grid-cols-2 sm:grid-cols-1 my-4  border-b-2 py-4 border-white ">
              <div className=" flex   gap-20 ">
                <h2 className="  justify-self-end"></h2>
                <div className=" flex gap-2 items-center">
                  <input
                    type="radio"
                    name="radio-7"
                    className="radio radio-info"
                    style={{ transform: "scale(1)" }}
                  />
                  <span>Standard</span>
                </div>
              </div>
              <h2 className=" justify-self-end">0.00</h2>
            </div>
            <div className=" grid grid-cols-2">
              <h2>Total</h2>
              <h2 className=" justify-self-end">Total</h2>
            </div>
            <div className=" flex justify-center gap-4 normal-case">
              <button className=" btn btn-outline border normal-case  border-white text-white">
                Proceed to Checkout
              </button>
              <button className="btn btn-outline border normal-case   border-white text-white">
                Continue Shopping
              </button>
            </div>
          </div>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
