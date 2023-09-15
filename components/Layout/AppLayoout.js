import React, {useState} from 'react'
import Header from '../header/Header';
import { BsFillCartFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import {GrClose } from "react-icons/gr"
import ActiveLink from '../ActiveLink';
import AppFooter from '../Footer/Footer';



export default function AppLayoout({children}) {
      const [dark, seDark] = useState(true);
  return (
    <>
      <div
        className={`  max-w-[1440px]  h-full  mx-auto  ${
          dark ? "turndark" : ""
        }`}>
        <div className="drawer lg:drawer-start">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col   overflow-x-hidden   ">
          <div className='px-20 sm:px-8 md:px-12'>
            <Header />

            {children}

          </div>
         <div className=''>
            <AppFooter/>

         </div>
        
          </div>
          <div className="drawer-side" style={{ zIndex: 999 }}>
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu   w-52 h-full bg-base-200 text-base-content sticky top-0  ">
              <div className="flex  justify-between items-center w-full pr-6">
                <label
                  tabIndex={0}
                  className="btn-circle drawer-button btn lg:hidden"
                  htmlFor="my-drawer-2">
                  <GrClose />
                </label>
                <div className="indicator ">
                  <span className="indicator-item badge   bg-[#2E4895] text-[#fff] ">
                    1
                  </span>
                  <button className="">
                    <BsFillCartFill className="  text-3xl" />
                  </button>
                </div>
              </div>
              <ActiveLink href="/">Home</ActiveLink>
              <ActiveLink href="/shop">Shop</ActiveLink>
              <ActiveLink href="/checkout">Checkout</ActiveLink>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
