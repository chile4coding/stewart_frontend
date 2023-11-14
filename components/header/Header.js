import React, { useState } from "react";
import Link from "next/link";
import { BsFillCartFill, BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import ActiveLink from "../ActiveLink";
import Modal from "../modal/Modal";
import {AiOutlineMenu} from "react-icons/ai"

import { useSelector, useDispatch } from "react-redux";
import { colors } from "@mui/material";
import {
  getBestSelling,
  getCategory,
  getNewArrival,
  getShop,
  toggler,
  storeGetProducts as getStoreProducts,
} from "@/redux/storeSlice";
import { useRouter } from "next/router";

export default function Header() {
  const [dark, seDark] = useState(true);
    const {
      shop,
      toggleMode,
      singleProduct,
      category,
      newArrival,
      bestSelling,
      cart,
      products: product,
    } = useSelector((state) => state.store);
    const { isDark } = toggleMode;
const dispatch = useDispatch();
const router =  useRouter()
const toggle = () => {
  dispatch(toggler());
};
  const handleShowModal = () => {
    window.my_modal_2.showModal();
  };

  function handleShop() {
    dispatch(getShop(product));
  }
    function handleUserNav() {
      router.push("/my_account");
    }

  return (
    <>
      <Modal />
      <div
        className={`navbar  lg:px-10  md:px-5 sm:px-4  sticky top-0   opacity-95 w-full   py-4 ${
          isDark ? "" : " bg-[#fff] text-black"
        } `}
        style={{ zIndex: 500 }}>
        <div className="navbar-start sm:navbar-end   ">
          <label
            tabIndex={0}
            className="drawer-button  lg:hidden  xl:hidden sm:mr-4 md:mr-4"
            htmlFor="my-drawer-2">
            <AiOutlineMenu className=" font-semibold text-2xl hover:cursor-pointer" />
          </label>

          {/* <div className=" w-24 sm:hidden ">
            <img src="" />
          </div> */}
          <h2 className="text-[24px] font-semibold  w-full sm:text-[15px] sm:font-normal ">
            Stewart Collections
          </h2>
        </div>

        <nav className="navbar-center sm:hidden md:hidden   gap-6">
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/shop">
            <span onClick={handleShop}>Shop</span>
          </ActiveLink>
          <ActiveLink href="/checkout">Checkout</ActiveLink>
        </nav>
        <div className="navbar-end ">
          <div className=" w-24 lg:hidden md:hidden ">
            <img src="" />
          </div>
          <div className="flex gap-6 items-center ">
            <div className=" ]  xl:w-[322px]  sm:hidden ">
              <input
                type="text"
                placeholder="search "
                className={`input  md:hidden input-bordered border-collapse  w-full   sm:hidden ${
                  isDark ? "border-white bg-transparent" : " border-[black] "
                }`}
                style={{ color: !isDark && "black !important" }}
              />
            </div>
            <div className="indicator ">
              <span className="indicator-item badge  bg-[red]  text-[#fff]  ">
                {cart?.length}
              </span>

              <BsFillCartFill
                className=" text-[24px] "
                htmlFor="my_modal_6 btn  "
                style={{ cursor: "pointer" }}
                onClick={handleShowModal}
              />
            </div>
            <div className="sm:hidden md:hidden">
              <BiSolidUser className="text-[24px] cursor-pointer" onClick={handleUserNav} />
            </div>
            <div>
              {isDark ? (
                <BsFillSunFill onClick={toggle} className=" cursor-pointer" />
              ) : (
                <BsFillMoonFill onClick={toggle} className=" cursor-pointer" />
              )}

              {/* <input type="checkbox" className="toggle" checked={isDark} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
