import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppFooter from "../Footer/Footer";
import { GrClose } from "react-icons/gr";
import { UserActiveLink } from "../ActiveLink";
import { AiFillStar, AiOutlineMenu } from "react-icons/ai";
import {
  BsFillCartFill,
  BsFillCreditCard2FrontFill,
  BsFillMoonFill,
  BsFillSunFill,
} from "react-icons/bs";
import { HiShoppingBag, HiUserGroup } from "react-icons/hi2";
import {
  BiMessageSquareDetail,
  BiSolidDashboard,
  BiSolidUser,
} from "react-icons/bi";
import {
  getShop,
  toggler,
  storeGetProducts,
  getSizes,
  initTggle,
} from "@/redux/storeSlice";
import { useRouter } from "next/router";
import { MdFavorite } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { FaCog } from "react-icons/fa";
import {
  getCookie,
  getProductSizes,
  getProducts,
  getShopProducts,
} from "@/services/request";
import { FaMessage } from "react-icons/fa6";
import Link from "next/link";

function AdminHeader() {
  const [title, setTitle] = useState("");
  const { shop, toggleMode } = useSelector((state) => state.store);

  // const  {isDark} = toggleMode
  const isDark = toggleMode?.isDark;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isDark === undefined) {
      dispatch(initTggle());
    }
    const cookie = getCookie();

    if (cookie) {
      async function getCategory(cookie) {
        const data = await getProducts(cookie);

        const products = await getShopProducts(cookie);

        if (data) {
          dispatch(getShop(data?.category));
        }
        if (products) {
          dispatch(storeGetProducts(products.products));
        }
      }
      getCategory();
    }

    if (router.pathname === "/admin") {
      setTitle("Dashboard Overview");
    } else if (router.pathname.includes("/admin/products")) {
      setTitle("Products");
    } else if (router.pathname === "/admin/orders") {
      setTitle("Orders");
    } else if (router.pathname === "/admin/orders/[id]") {
      setTitle("Order Details");
    } else if (router.pathname === "/admin/customers/details") {
      setTitle("Customers");
    } else if (router.pathname === "/saved_items") {
      setTitle("Saved Items");
    } else if (router.pathname === "/admin/reviews") {
      setTitle("Reviews");
    } else if (router.pathname === "/admin/customers") {
      setTitle("Customers");
    } else if (router.pathname === "/admin/transactions") {
      setTitle("Transactions");
    } else if (router.pathname === "/admin/settings") {
      setTitle("Settings");
    }
  }, []);
  const toggle = () => {
    dispatch(toggler());
  };
  const handleShowModal = () => {
    window.my_modal_2.showModal();
  };
  return (
    <>
      <div
        className={`navbar  lg:px-10 xl:px-10  md:px-5 sm:px-4  sticky top-0   opacity-95 w-full   py-4 ${
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
            {title}
          </h2>
        </div>

        {/* {title === "Orders" ||
          ("admin/customers/details" && (
            <div className="w-full ">
              <div className="    w-full  ">
                <input
                  type="text"
                  placeholder="search "
                  className={`input   input-bordered border-collapse  w-full  input-sm  ${
                    isDark ? "border-white bg-transparent" : " border-[black] "
                  }`}
                  style={{ color: !isDark && "black !important" }}
                />
              </div>
            </div>
          ))} */}

        <div className="navbar-end ">
          <div className="flex gap-6 items-center  ">
            {/* <div className="indicator ">
              <span className="indicator-item badge  bg-[red]  text-[#fff]  ">
                2
              </span>

              <IoIosNotifications
                className=" text-[30px] "
                htmlFor="my_modal_6 btn  "
                style={{ cursor: "pointer" }}
              />
            </div> */}
            <div className="sm:hidden md:hidden">
              <BiSolidUser className="text-[24px]" />
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

export default function AdminLayout({ children }) {
  //   const [show, setShow] = useState(false);
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  //   function handleShowModal() {
  //     window.my_modal_2?.showModal();
  //     setShow((prevShow) => !prevShow);
  //   }

  return (
    <div className={isDark ? "bg-black" : "#FAFAFA"}>
      <div
        className={`  h-full  mx-auto  ${isDark ? "turndark" : "turnlight"}`}>
        <div className="drawer lg:drawer-start lg:drawer-open xl:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col     overflow-hidden  ">
            <div className={`sticky top-0 z-50 ${isDark ? " bg-[black]" : ""}`}>
              <AdminHeader />
            </div>
            <div className=" overflow-hidden pt-6">{children}</div>
            <div className="">
              <AppFooter />
            </div>
          </div>
          <div className="drawer-side  " style={{ zIndex: 999 }}>
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul
              className={`menu px-6 flex flex-col gap-6  sm:w-52 h-full text-base-content sticky top-0  ${
                isDark ? " bg-[#212121] text-white" : "bg-[#d1d1d1] text-black "
              }`}>
              <div className="flex  justify-end items-center w-full ">
                <label
                  tabIndex={0}
                  className="btn-circle drawer-button btn lg:hidden xl:hidden"
                  htmlFor="my-drawer-2">
                  <GrClose />
                </label>
              </div>
              <Link
                href={"/"}
                className="text-[24px] font-semibold  w-full sm:text-[15px] sm:font-normal ">
                Stewart Collections
              </Link>
              <UserActiveLink href="/admin/home">
                {" "}
                <BiSolidDashboard />
                Overview
              </UserActiveLink>
              <UserActiveLink href="/admin/products">
                {" "}
                <HiShoppingBag />
                Products
              </UserActiveLink>
              <UserActiveLink href="/admin/orders">
                <BsFillCartFill />
                Orders
              </UserActiveLink>
              <UserActiveLink href="/admin/messages">
                <FaMessage />
                Messages
              </UserActiveLink>
              <UserActiveLink href="/admin/reviews">
                <AiFillStar /> Reviews
              </UserActiveLink>
              {/* <UserActiveLink href="/admin/customers">
                <HiUserGroup /> Customers
              </UserActiveLink>
              <UserActiveLink href="/admin/transactions">
                <BsFillCreditCard2FrontFill className=" rotate-180" />
                Transactions
              </UserActiveLink> */}
              <UserActiveLink href="/admin/settings">
                <span className=" flex items-center gap-2">
                  <FaCog />
                  Settings
                </span>
              </UserActiveLink>
            </ul>
            {/* {<LogoutModal handleOpen={handleShowModal} open={show} />} */}
          </div>
        </div>
      </div>
    </div>
  );
}
