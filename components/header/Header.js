import React, { useState } from "react";
import Link from "next/link";
import { BsFillCartFill, BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import ActiveLink from "../ActiveLink";
import Modal from "../modal/Modal";
import { AiOutlineMenu } from "react-icons/ai";

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
import { isEmpty } from "lodash";

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
    user,
  } = useSelector((state) => state.store);
  // const { isDark } = toggleMode;
  const isDark = toggleMode?.isDark;
  const dispatch = useDispatch();
  const router = useRouter();
  const toggle = () => {
    dispatch(toggler());
  };
  const handleShowModal = () => {
    window.my_modal_2.showModal();
  };

  function handleShop() {
    dispatch(getShop(product));
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

          <div className=" w-24 cursor-pointer  ">
            <Link href={"/"}>
              <img src={isDark ? "/stewartw.png" : "/stewart.png"} />
            </Link>
          </div>
          <Link href={"/"}>
            <h2 className=" cursor-pointer text-[24px] font-semibold  w-full sm:text-[15px] sm:font-normal ">
              Stewart Collections
            </h2>
          </Link>
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
            <div className="sm:hidden md:hidden">
              {!isEmpty(user) && user.avatar?.trim().length > 1 && (
                <div className="">
                  <img
                    onClick={handleUserNav}
                    src={user.avatar}
                    className=" cursor-pointer bg-[white] object-cover rounded-full  h-[30px] w-[30px] "
                  />
                </div>
              )}

              {!isEmpty(user) && !Boolean(user?.avatar) && (
                <div className="sm:hidden md:hidden">
                  <Link href={"/my_account"}>
                    <BiSolidUser className="text-[24px] cursor-pointer" />
                  </Link>
                </div>
              )}
              {isEmpty(user) && (
                <Link href={"/login"}>
                  <span className="cursor-pointer">Login</span>
                </Link>
              )}
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
