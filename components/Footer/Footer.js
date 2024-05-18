import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  getBestSelling,
  getFavourite,
  getNewArrival,
  getProductByCategory,
  getShopProducts as getStoreProducts,
} from "@/redux/storeSlice";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function AppFooter() {
  const {
    shop,
    toggleMode,
    singleProduct,
    category,
    newArrival,
    bestSelling,
    products: product,
  } = useSelector((state) => state.store);
  // const { isDark } = toggleMode;
  const isDark = toggleMode?.isDark;

  const router = useRouter();
  const dispatch = useDispatch();

  function handlecategories(cat) {
    dispatch(getProductByCategory(cat.id));
    if (shop.length > 0) {
      router.push(`/shop/category-${cat.cat}`, "/shop");
    } else {
      return;
    }
  }

  return (
    <>
      <section
        className={` sm:hidden md:hidden ${
          isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
        }`}>
        <footer
          className={`footer px-20 p-20  text-base-content   mb-0  ${
            isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
          }`}>
          <div
            className={
              isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
            }>
            <div className=" flex  gap-4 items-center pt-0">
              <img
                src={isDark ? "/stewart.png" : "/stewartw.png"}
                className=" w-[40px] h-[40px] "
                alt="logo"
              />
              <h2 className=" text-[18px] font-semibold">STEWART COLLECTION</h2>
            </div>
            <p className=" normal-case">
              Where fashion meets passion
              <br />
              and individuality!
              <br />
              Follow us on socials
            </p>
            <div className=" flex  justify-around w-full mt-4">
              <a href="">
                {" "}
                <FaTwitter size={24} />
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61554460659523"
                target="_blank">
                {" "}
                <FaFacebook size={24} />
              </a>
              <a href="">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
          <nav
            className={
              isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
            }>
            <header
              className={` font-semibold   uppercase text-[18px] ${
                isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
              }`}>
              Categories
            </header>
            {category &&
              category.length > 0 &&
              category.map((item) => {
                return (
                  <a
                    className="link link-hover"
                    onClick={handlecategories.bind(this, {
                      cat: item.name,
                      id: item.id,
                    })}
                    Key={item.id}>
                    {item?.name}
                  </a>
                );
              })}
          </nav>
          <nav
            className={`font-semibold  capitalize  ${
              isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
            }`}>
            <header
              className={`    uppercase text-[18px] ${
                isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
              }`}>
              Informations
            </header>
            <a className="link link-hover">About us</a>
            <Link href={"/contact"} className="link link-hover">
              Contact
            </Link>
          </nav>
          <nav
            className={` font-semibold capitalize  ${
              isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
            }`}>
            <header className="text-[18px] uppercase">Site Links</header>
            <Link className="link link-hover" href="/">
              Home
            </Link>
            <Link className="link link-hover" href="/shop">
              Shop
            </Link>
            <Link className="link link-hover" href="/checkout">
              Checkout
            </Link>
            <Link className="link link-hover" href="/my_account">
              My Account
            </Link>
          </nav>
        </footer>

        <div
          className={`border-t w-full  text-center  p-5  ${
            isDark
              ? "bg-[#D9D9D9] text-black border-t border-t-black border-t-1"
              : " bg-[black] text-[white]  border-t border-t-white border-t-1      "
          }`}>
          Copyright {new Date().getFullYear().toString()} | All Rights Reserved
        </div>
      </section>
      <section
        className={` lg:hidden xl:hidden pt-6 ${
          isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
        }`}>
        <div className=" flex  flex-col  items-center">
          {" "}
          <div
            className={
              isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
            }>
            <div className=" flex  gap-4  justify-center items-center pt-0">
              <img
                src={isDark ? "/stewart.png" : "/stewartw.png"}
                className=" w-[30px] h-[30px] "
                alt="logo"
              />
              <h2 className=" text-[18px] font-semibold">STEWART COLLECTION</h2>
            </div>
            <p className=" text-center normal-case">
              Where fashion meets passion and individuality!
              <br />
              Follow us on socials
            </p>
            <div className=" flex   justify-around w-full mt-4">
              <a href="">
                {" "}
                <FaTwitter size={24} />
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61554460659523"
                target="_blank">
                {" "}
                <FaFacebook size={24} />
              </a>
              <a href="">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div
          className={`collapse   rounded-none   ${
            isDark
              ? "border-b border-b-black border-b-1"
              : "border-b border-b-white border-b-1"
          }    `}>
          <input type="checkbox" />
          <div className="collapse-title  font-normal  flex justify-between pr-2 items-center">
            <header
              className={`font-semibold   uppercase text-[18px] ${
                isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
              }`}>
              Categories
            </header>
            <span className=" justify-self-end  self-center pr-0">
              <MdKeyboardArrowDown />
            </span>
          </div>
          <div className="collapse-content ">
            <div className="flex  flex-col  ">
              <nav
                className={
                  isDark
                    ? "bg-[#D9D9D9] text-black"
                    : " bg-[black] text-[white]"
                }>
                {category &&
                  category.length > 0 &&
                  category.map((item) => {
                    return (
                      <a
                        className="link link-hover"
                        onClick={handlecategories.bind(this, {
                          cat: item.name,
                          id: item.id,
                        })}
                        Key={item.id}>
                        {item?.name}
                      </a>
                    );
                  })}
              </nav>
            </div>
          </div>
        </div>
        <div
          className={`collapse   rounded-none   ${
            isDark
              ? "border-b border-b-black border-b-1"
              : "border-b border-b-white border-b-1"
          }    `}>
          <input type="checkbox" />
          <div className="collapse-title  font-normal  flex justify-between pr-2 items-center">
            <header
              className={`    uppercase text-[18px] font-semibold ${
                isDark ? "bg-[#D9D9D9] text-black" : " bg-[black] text-[white]"
              }`}>
              Informations
            </header>
            <span className=" justify-self-end  self-center pr-0">
              <MdKeyboardArrowDown />
            </span>
          </div>
          <div className="collapse-content ">
            <div className="flex  flex-col  ">
              <nav
                className={`  capitalize  ${
                  isDark
                    ? "bg-[#D9D9D9] text-black"
                    : " bg-[black] text-[white]"
                }`}>
                <a className="link link-hover block">About us</a>
                <a className="link link-hover block mt-4">Contact</a>
              </nav>
            </div>
          </div>
        </div>
        <div
          className={`collapse   rounded-none   ${
            isDark
              ? "border-b border-b-black border-b-1"
              : "border-b border-b-white border-b-1"
          }    `}>
          <input type="checkbox" />
          <div className="collapse-title  font-normal  flex justify-between pr-2 items-center">
            <header className="text-[18px] uppercase font-semibold">
              Site Links
            </header>

            <span className=" justify-self-end  self-center pr-0">
              <MdKeyboardArrowDown />
            </span>
          </div>
          <div className="collapse-content ">
            <div className="flex  flex-col  ">
              <nav
                className={`  capitalize  ${
                  isDark
                    ? "bg-[#D9D9D9] text-black"
                    : " bg-[black] text-[white]"
                }`}>
                <div>
                  <Link className="link link-hover" href="/">
                    Home
                  </Link>
                </div>
                <div className=" my-3">
                  <Link className="link link-hover" href="/shop">
                    Shop
                  </Link>
                </div>
                <div>
                  <Link className="link link-hover" href="/checkout">
                    Checkout
                  </Link>
                </div>
                <div className=" my-3">
                  <Link className="link link-hover" href="/my_account">
                    My Account
                  </Link>
                </div>
                <div></div>
              </nav>
            </div>
          </div>
        </div>
        <div
          className={`border-t w-full  text-center  p-5  ${
            isDark
              ? "bg-[#D9D9D9] text-black "
              : " bg-[black] text-[white]      "
          }`}>
          Copyright {new Date().getFullYear().toString()} | All Rights Reserved
        </div>
      </section>
    </>
  );
}
