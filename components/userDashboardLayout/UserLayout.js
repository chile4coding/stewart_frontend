import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppFooter from "../Footer/Footer";
import { GrClose } from "react-icons/gr";
import { UserActiveLink } from "../ActiveLink";
import { AiFillStar, AiOutlineMenu } from "react-icons/ai";
import { BsFillCartFill, BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import {
  BiMessageSquareDetail,
  BiShoppingBag,
  BiSolidUser,
} from "react-icons/bi";
import {
  handleGetMessages,
  handleGetNotification,
  initTggle,
  setOrderSearch,
  toggler,
  setUser,
} from "@/redux/storeSlice";
import { useRouter } from "next/router";
import { MdFavorite } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import LogoutModal from "./logout/LogoutModal";
import Modal from "../modal/Modal";
import Cookies from "js-cookie";
import {
  getCookie,
  getMessages,
  getNotification,
  socket,
} from "@/services/request";

function UserHeader() {
  const [title, setTitle] = useState("");
  const {
    shop,
    toggleMode,
    singleProduct,
    category,
    newArrival,
    bestSelling,
    cart,
    orders,
    user,
    products: product,
    notification,
  } = useSelector((state) => state.store);
  //  const { isDark } = toggleMode;
  const isDark = toggleMode?.isDark;

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const router = useRouter();
  useEffect(() => {
    const token = getCookie();
    if (isDark === undefined) {
      dispatch(initTggle());
    }
    if (router.pathname === "/my_account") {
      setTitle("Account Overview");
    } else if (router.pathname === "/orders") {
      setTitle("Orders");
    } else if (router.pathname === "/messages") {
      setTitle("Messages");
    } else if (router.pathname === "/saved_items") {
      setTitle("Saved Items");
    } else if (router.pathname === "/reviews") [setTitle("Reviews")];

    async function getMessage(token) {
      const res = await getMessages(token);

      const data = await res.json();

      const response = await getNotification(token);
      dispatch(handleGetMessages(data.inbox));

      const dataN = await response.json();
      dispatch(handleGetNotification(dataN.inbox));
    }
    socket.on(`new-message`, (message) => {
      getMessage(token);
      console.log("New notification");

      // dispatch(getNotification(message));
    });

    return () => {
      socket.off(`new-message`);
    };
  }, []);
  const toggle = () => {
    dispatch(toggler());
  };
  const handleShowModal = () => {
    window.my_modal_2.showModal();
  };

  function handleUserNav() {
    router.push("/my_account");
  }
  function handleInputChange(e) {
    const { name, value } = e.target;
    if (title === "Orders") {
      dispatch(setOrderSearch({ orders: user.orders, search: value }));
    }
    setSearch((prev) => value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (title === "Orders") {
      dispatch(setOrderSearch({ orders: user.orders, search }));
    }
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
            {title}
          </h2>
        </div>

        {title === "Orders" && (
          <form onSubmit={handleSearchSubmit} className="w-full ">
            <div className="    w-full  ">
              <input
                type="text"
                value={search}
                onChange={handleInputChange}
                placeholder="search "
                className={`input   input-bordered border-collapse  w-full  input-sm  ${
                  isDark ? "border-white bg-transparent" : " border-[black] "
                }`}
                style={{ color: !isDark && "black !important" }}
              />
            </div>
          </form>
        )}

        <div className="navbar-end ">
          <div className="flex gap-6 items-center  ">
            <div
              className="indicator  cursor-pointer"
              onClick={handleShowModal}>
              <span className="indicator-item badge  bg-[red]  text-[#fff]  ">
                {cart?.length}
              </span>

              <BsFillCartFill
                className=" text-[24px] "
                htmlFor="my_modal_6 btn  "
                style={{ cursor: "pointer" }}
              />
            </div>

            {user?.avatar?.trim().length > 1 ? (
              <div className="">
                <img
                  onClick={handleUserNav}
                  src={user.avatar}
                  className=" cursor-pointer bg-[white] object-cover rounded-full  h-[30px] w-[30px] "
                />
              </div>
            ) : (
              <div className="sm:hidden md:hidden">
                <BiSolidUser
                  className="text-[24px] cursor-pointer"
                  onClick={handleUserNav}
                />
              </div>
            )}
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

export default function UserLayout({ children }) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const isDark = useSelector((state) => state?.store?.toggleMode?.isDark);
  const dispatch = useDispatch();

  function signOut() {
    dispatch(setUser({}));
    Cookies.remove("_stewart_collection_token");
    window.location.href =
      "https://stewart-frontend-chile4coding.vercel.app/login";
  }

  return (
    <div className={isDark ? "bg-black" : "#FAFAFA"}>
      <div
        className={`    h-full  mx-auto  ${isDark ? "turndark" : "turnlight"}`}>
        <div className="drawer lg:drawer-start lg:drawer-open xl:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col     overflow-hidden  ">
            <div className={`sticky top-0 z-50 ${isDark ? " bg-[black]" : ""}`}>
              <UserHeader />
            </div>
            <div className=" overflow-hidden p-6">{children}</div>
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
              <div className="flex items-center ">
                <div className=" w-16 ">
                  <img src={isDark ? "/stewartw.png" : "/stewart.png"} />
                </div>
              </div>
              <UserActiveLink href="/my_account">
                {" "}
                <BiSolidUser />
                My Account
              </UserActiveLink>
              <UserActiveLink href="/shop">
                {" "}
                <BiShoppingBag />
                Shop
              </UserActiveLink>
              <UserActiveLink href="/orders">
                <BsFillCartFill />
                Orders
              </UserActiveLink>
              <UserActiveLink href="/reviews">
                <AiFillStar /> Reviews
              </UserActiveLink>
              <UserActiveLink href="/messages">
                {" "}
                <BiMessageSquareDetail /> Inbox
              </UserActiveLink>
              <UserActiveLink href="/saved_items">
                <MdFavorite /> Saved Items
              </UserActiveLink>
              <div
                onClick={signOut}
                className="activeuserhover cursor-pointer text-[18px] activeuserhover flex items-center gap-2">
                <span className=" flex items-center gap-2">
                  <TbLogout />
                  Logout
                </span>
              </div>{" "}
            </ul>
            {/* { <LogoutModal  handleOpen={handleShowModal}  open={show} />} */}
          </div>
        </div>
      </div>
    </div>
  );
}
