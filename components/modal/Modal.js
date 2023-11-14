import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiCross, BiMinus, BiPlus, BiTime } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { MdModeEdit, MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { increaseOrDecraseItem, deleteCartItem } from "@/redux/storeSlice";
import { AiFillCloseSquare } from "react-icons/ai";
function ItemsDesc({ item }) {
  const { toggleMode, cart, cartTotal } = useSelector((state) => state.store);

  const { isDark } = toggleMode;
  const dispatch = useDispatch();
  function handleInput(e) {
    const { name, value } = e.target;

    dispatch(increaseOrDecraseItem({ image: name, value }));
  }

  function handleDeleteItem(id) {
    dispatch(deleteCartItem(id));
  }

  return (
    <>
      <div className=" overflow-x-auto ">
        <table className="table">
          <thead className="">
            <tr
              className={
                isDark
                  ? " text-white border-b "
                  : "   text-black border-b-2  border-b-black"
              }>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sub total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart && cart?.length > 0 &&
              cart.map((item) => (
                <tr
                  className={
                    isDark ? " text-white border-0" : "  text-black border-0"
                  }>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask  rounded-md w-12 h-12">
                          <img
                            src={item.image}
                            alt={`${item.name} ${item.initial_color} ${item.initial_size}`}
                            className=" w-full h-full bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="  text-[12px]  lowercase">
                          {`${item.name} ${item.initial_color} ${item.initial_size}`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="  text-[12px]  lowercase">
                    {" "}
                    ₦{item?.price.toFixed(2)}
                  </td>
                  <td>
                    {" "}
                    <div
                      className={`flex items-center max-w-[60px] border  self-center py-1 px-2 rounded ${
                        isDark
                          ? " border border-1 border-white"
                          : "border border-1 border-black"
                      }`}>
                      {" "}
                      <input
                        type="number"
                        name={item.image}
                        onChange={handleInput}
                        autoFocus
                        min={1}
                        value={item.qty}
                        className={` h-7  border-0 outline-none w-full text-[12px] ${
                          isDark
                            ? "  bg-[212121] text-[black]"
                            : " text-black bg-[white]"
                        }`}
                      />{" "}
                    </div>
                  </td>
                  <td className="  text-[12px]  lowercase">
                    ₦{item?.subTotal.toFixed(2)}
                  </td>
                  <td>
                    <AiFillCloseSquare
                      className=" text-xl hover:cursor-pointer"
                      onClick={handleDeleteItem.bind(this, item.image)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default function Modal() {
  const { toggleMode, cart, cartTotal } = useSelector((state) => state.store);

  const { isDark } = toggleMode;

  const router = useRouter();
  function handleCheckoutNav() {
    router.replace("/checkout");
  }
  function handleShopNav() {
    router.replace("/shop");
  }
  return (
    <>
      <dialog id="my_modal_2" className="modal modal-left">
        <form
          method="dialog"
          className={` modal-box   xl:max-w-5xl lg:max-w-2xl    sm:text-xs ${
            isDark ? "bg-[#212121] text-[white] " : " text-black bg-[#eeecec]"
          }`}>
          {cart &&  cart.length > 0 ? (
            <div className="  mt-0      font-semibold  py-5 px-2">
              <div
                className={`grid    gap-10 sm:grid-cols-1 ${
                  isDark
                    ? "border-b-2 border-white"
                    : "border-b-2 border-[#212121]"
                }`}>
                <ItemsDesc />
              </div>
              <div className="  flex justify-between mt-3">
                <h2>Cart total</h2>
                <h2 className=" justify-self-end">₦{Boolean(cartTotal) && cartTotal.toFixed(2)}</h2>
              </div>

              <div className=" flex justify-center gap-4 normal-case">
                <button
                  className={`  btn  shadow-md sm:btn-sm   capitalize sm:my-4    ${
                    isDark
                      ? "hover:border-white hover:bg-black hover:text-white"
                      : " bg-black text-white hover:border-black "
                  }`}
                  onClick={handleCheckoutNav}>
                  Checkout
                </button>
                <button
                  className={`  btn  shadow-md sm:btn-sm   capitalize sm:my-4    ${
                    isDark
                      ? "hover:border-white hover:bg-black hover:text-white"
                      : " bg-black text-white hover:border-black "
                  }`}
                  onClick={handleShopNav}>
                  Shop
                </button>
              </div>
            </div>
          ) : (
            <div className=" py-5">
            <h2 className=" text-center normal-case mt-4">Your cart is empty</h2>
              <div className=" flex justify-center gap-4 normal-case">
       
                <button
                  className={`  btn  shadow-md sm:btn-sm   capitalize my-4    ${
                    isDark
                      ? "hover:border-white hover:bg-black hover:text-white"
                      : " bg-black text-white hover:border-black "
                  }`}
                  onClick={handleShopNav}>
                  Shop now
                </button>
              </div>
            </div>
          )}
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
