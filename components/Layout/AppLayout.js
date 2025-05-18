import React, { useState } from "react";
import Header from "../header/Header";
import { BsFillCartFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import ActiveLink from "../ActiveLink";
import AppFooter from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";

import {
  getBestSelling,
  getCategory,
  getNewArrival,
  getShop,
  toggler,
  storeGetProducts as getStoreProducts,
  initTggle,
} from "@/redux/storeSlice";
import { useEffect } from "react";
import { socket } from "@/services/request";

export default function AppLayout({ children }) {
  const [dark, seDark] = useState(true);
  const {
    shop,
    toggleMode,
    singleProduct,
    category,
    newArrival,
    bestSelling,
    products: product,
  } = useSelector((state) => state.store);

  //  const { isDark } = toggleMode;
  const isDark = toggleMode?.isDark;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDark === undefined) {
      dispatch(initTggle());
    }
    socket.on(`new-message`, async (message) => {
      // dispatch(getNotification(message));
    });
  }, []);
  const toggle = () => {
    dispatch(toggle());
  };

  function handleShop() {
    dispatch(getShop(product));
  }

  return (
    <>
      <div className={isDark ? "bg-black" : "#FAFAFA"}>
        <div
          className={`   h-full  mx-auto  ${
            isDark ? "turn-dark" : "turn-light"
          }`}>
          <div className="drawer lg:drawer-start">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col   overflow-x-hidden   ">
              <div>
                <Header />
              </div>
              <div className="">{children}</div>
              <div className=""></div>
            </div>
            <div className="drawer-side  " style={{ zIndex: 999 }}>
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <ul
                className={`menu px-6 flex flex-col gap-6  w-52 h-full text-base-content sticky top-0  ${
                  isDark
                    ? " bg-[#6b6b6b] text-white"
                    : "bg-[#e4e3e3] text-black "
                }`}>
                <div className="flex  justify-end items-center w-full ">
                  <label
                    tabIndex={0}
                    className="btn-circle drawer-button btn lg:hidden"
                    htmlFor="my-drawer-2">
                    <GrClose />
                  </label>
                </div>

                <ActiveLink href="/">Home</ActiveLink>
                <ActiveLink href="/shop">
                  <span onClick={handleShop}>Shop</span>
                </ActiveLink>
                <ActiveLink href="/checkout">Checkout</ActiveLink>
                <ActiveLink href="/login">My Account</ActiveLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
