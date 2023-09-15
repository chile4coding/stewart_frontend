import React, { useState } from "react";
import Link from "next/link";
import { BsFillCartFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import ActiveLink from "../ActiveLink";
import Modal from "../modal/Modal";

export default function Header() {
  const [dark, seDark] = useState(true);

  const handleShowModal = () => {
    window.my_modal_2.showModal();
  };
  return (
    <>
    <Modal/>
      <div
        className={`navbar     sticky top-0   opacity-95 w-full   py-4  `}
        style={{ zIndex: 500 }}>
        <div className="navbar-start sm:navbar-end">
          <label
            tabIndex={0}
            className="btn-circle drawer-button btn lg:hidden  xl:hidden"
            htmlFor="my-drawer-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>

          {/* <div className=" w-24 sm:hidden ">
            <img src="" />
          </div> */}

          <h2 className="text-[24px] font-semibold  w-full">Stewart Collections</h2>
        </div>

        <nav className="navbar-center sm:hidden md:hidden   gap-6">
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/shop">Shop</ActiveLink>
          <ActiveLink href="/checkout">Checkout</ActiveLink>
        </nav>
        <div className="navbar-end ">
          <div className=" w-24 lg:hidden md:hidden ">
            <img src="" />
          </div>
          <div className="flex gap-6 items-center">
            <div className=" ]  xl:w-[322px] ">
              <input
                type="text"
                placeholder="search "
                className={`input  input-bordered border-collapse bg-transparent w-full   sm:hidden ${dark? "border-white":""}`}
              />
            </div>
            <div className="indicator sm:hidden ">
              <span className="indicator-item badge  bg-[red]  text-[#fff]  ">
                2
              </span>

              <BsFillCartFill className=" text-[24px] " htmlFor="my_modal_6 btn  " style={{cursor:"pointer"}}  onClick={handleShowModal}/>
            </div>
            <div className="sm:hidden md:hidden">
              <BiSolidUser className="text-[24px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
