import Image from "next/image";
import { Inter } from "next/font/google";
import AppLayout from "@/components/Layout/AppLayout";
import Hero from "@/components/homepage/Hero";

import {
  getCookie,
  getCurrentUser,
  getProducts as getProductCategory,
  getShopProducts,
  visitor,
} from "@/services/request";

import Items, { ItemCategory } from "@/components/items/Items";
const inter = Inter({ subsets: ["latin"] });
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getBestSelling,
  getCategory,
  getNewArrival,
  getShop,
  setCartOnLoad,
  storeGetProducts as getStoreProducts,
  setGlobalLoading,
  setUser,
  toggler,
} from "@/redux/storeSlice";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useRouter } from "next/router";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Head from "next/head";
import AppFooter from "@/components/Footer/Footer";
import Link from "next/link";

export function MetaData() {
  return (
    <Head>
      <title>Stewart Collection</title>
      <meta
        name="description"
        content="   Explore the rise of joggers, the oversized garment defying gender norms. Break the mold! Show how polo infuse personality into formal suits
        Craft a narrative around a unique outfit. Let a skirt be the protagonist, complemented by a playful printed shirt and a tie that adds a touch of whimsy. 
        Move beyond restrictive label"
      />
      <meta
        name="keyword"
        content="Polo   Suit  Tie  Shirt, Skirt, Clothes, Male Wares & Female Wares
      "
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}

function ItemSwiper({ swiperNavNexRef, swiperNavPrevRef, items }) {
  const {
    shop,
    toggleMode,
    singleProduct,
    cart,
    category,
    newArrival,
    bestSelling,
  } = useSelector((state) => state.store);
  const isDark = toggleMode?.isDark;

  if (newArrival) {
    return (
      <div className="   w-full flex flex-wrap ">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: false,
          }}
          breakpoints={{
            // Define breakpoints for different screen sizes
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            760: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1100: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          rewind={true}
          navigation={{
            prevEl: swiperNavNexRef.current,
            nextEl: swiperNavPrevRef.current,
          }}
          Pagination={{
            clickable: true,
          }}
          loop
          modules={[Autoplay, Navigation]}
          // slidesPerView={2}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = swiperNavPrevRef.current;
            swiper.params.navigation.nextEl = swiperNavNexRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className={`mySwiper   mx-auto ${isDark ? "" : " "}`}>
          {items &&
            items.length > 0 &&
            items.map((newIn) => (
              <SwiperSlide className=" " key={newIn.id}>
                <Items items={newIn} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    );
  }
}

function BestSellingSwiper({ swiperNavNexRef, swiperNavPrevRef, items }) {
  const isDark = useSelector((state) => state.store?.toggleMode?.isDark);

  return (
    <div className="   w-full flex flex-wrap     ">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        breakpoints={{
          // Define breakpoints for different screen sizes
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          760: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1100: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
        rewind={true}
        navigation={{
          prevEl: swiperNavNexRef.current,
          nextEl: swiperNavPrevRef.current,
        }}
        modules={[Autoplay, Navigation]}
        loop
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = swiperNavPrevRef.current;
          swiper.params.navigation.nextEl = swiperNavNexRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        // slidesPerView={2}

        className={`mySwiper    mx-auto ${isDark ? "" : ""}`}>
        {items &&
          items?.length > 0 &&
          items.map((item) => (
            <SwiperSlide className=" ">
              <Items items={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const swiperNavPrevRef = useRef(null);
  const swiperNavNexRef = useRef(null);
  const swiperNavSecondPrevRef = useRef(null);
  const swiperNavSecondNexRef = useRef(null);

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
  const isDark = toggleMode?.isDark;

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");

    const token = getCookie();

    if (!cart) {
      dispatch(setCartOnLoad());
    }
    async function allProduct() {
      if (!visited) {
        await visitor();
        sessionStorage.setItem("visited", true);
      }
      if (Boolean(token)) {
        const response = await getCurrentUser(token);
        if (response.status === 200) {
          const user = await response.json();
          dispatch(setUser(user?.user));
        }
      }
      dispatch(setGlobalLoading(true));
      const { category } = await getProductCategory();

      const { products } = await getShopProducts({
        search: "",
        count: 100,
        filter: "",
      });

      if (products) {
        dispatch(getStoreProducts(products));
        dispatch(getNewArrival(products));
        dispatch(getBestSelling(products));
      }

      if (category) {
        dispatch(getCategory(category));
      }
    }
    dispatch(setGlobalLoading(false));

    allProduct();
  }, []);

  function handleSeeAllNewIn() {
    dispatch(getShop(newArrival));
    router.push("New Arrival", "/shop");
  }
  function handleSeeAllBestSelling() {
    dispatch(getShop(bestSelling));
    router.push("Best Selling", "/shop");
  }

  function handleCreateAccountNav() {
    router.replace("/signup");
  }

  return (
    <>
      <MetaData />
      <AppLayout>
        <main className="px-10 sm:px-4  max-h-[100vh]  overflow-y-scroll">
          <section className=" ">
            <Hero />
          </section>
          <section className="  sm:my-10 pt-14 sm:pt-0">
            <div className="flex  justify-center items-center  gap-8  sm:gap-5  sm:my-0  ">
              <p
                className={` flex-1  ${
                  isDark
                    ? " border-b border-b-white"
                    : " border-b border-b-black"
                }`}></p>
              <p className="text-[30px] font-semibold sm:text-sm  ">New in</p>
              <p
                className={` flex-1  ${
                  isDark
                    ? " border-b border-b-white"
                    : " border-b border-b-black"
                }`}></p>
            </div>
            <div className="  flex justify-end items-center   sm:pr-4  normal-case ">
              <button
                className={`  btn normal-case   font-normal my-6 sm:mt-0 px-6 sm:btn-sm sm:text-xs    ${
                  isDark
                    ? "hover:border-white hover:bg-black hover:text-white"
                    : " bg-black text-white hover:border-black"
                }  `}
                onClick={handleSeeAllNewIn}>
                See All
              </button>
            </div>

            <div className="  icon-nav-container ">
              <div>
                <ItemSwiper
                  items={newArrival}
                  swiperNavPrevRef={swiperNavPrevRef}
                  swiperNavNexRef={swiperNavNexRef}
                />
              </div>
              <div ref={swiperNavNexRef} className="swiperNavPrev">
                <MdNavigateBefore
                  className={` text-2xl font-bold ${
                    isDark
                      ? "text-black  bg-white rounded-full"
                      : "text-white bg-black rounded-full"
                  }`}
                />
              </div>
              <div ref={swiperNavPrevRef} className="swiperNavNext">
                <MdNavigateNext
                  className={` text-2xl font-bold ${
                    isDark
                      ? "text-black  bg-white rounded-full"
                      : "text-white bg-black rounded-full"
                  }`}
                />
              </div>
            </div>
          </section>
          <section className="   lg:my-16 xl:my-14">
            <div className="flex  justify-center items-center   gap-8  sm:gap-5  ">
              <p
                className={`  flex-1 ${
                  isDark
                    ? " border-b border-b-white"
                    : " border-b border-b-black"
                }`}></p>
              <p className="text-[30px] font-semibold sm:text-sm   sm:mb-0">
                Best Selling
              </p>
              <p
                className={` flex-1  ${
                  isDark
                    ? " border-b border-b-white"
                    : " border-b border-b-black"
                }`}></p>
            </div>

            <div className="   flex justify-end items-center  sm:pr-4  normal-case">
              <button
                className={`  btn normal-case   font-normal my-6 sm:mt-0 px-6 sm:btn-sm sm:text-xs    ${
                  isDark
                    ? "hover:border-white hover:bg-black hover:text-white"
                    : " bg-black text-white hover:border-black"
                }  `}
                onClick={handleSeeAllBestSelling}>
                See All
              </button>
            </div>
            <div className="icon-nav-container">
              {bestSelling && (
                <BestSellingSwiper
                  items={bestSelling}
                  swiperNavPrevRef={swiperNavSecondPrevRef}
                  swiperNavNexRef={swiperNavSecondNexRef}
                />
              )}

              <div ref={swiperNavSecondPrevRef} className="swiperNavPrev">
                <MdNavigateBefore
                  className={` text-2xl font-bold ${
                    isDark
                      ? "text-black  bg-white rounded-full"
                      : "text-white bg-black rounded-full"
                  }`}
                />
              </div>
              <div ref={swiperNavSecondNexRef} className="swiperNavNext">
                <MdNavigateNext
                  className={` text-2xl font-bold ${
                    isDark
                      ? "text-black  bg-white rounded-full"
                      : "text-white bg-black rounded-full"
                  }`}
                />
              </div>
            </div>
          </section>
          <section className=" mb-16 ">
            <div className="flex  justify-center items-center   gap-8  sm:gap-5  my-8  ">
              <p className="  flex-1"></p>
              <p className="text-[30px] font-semibold sm:text-sm  ">
                Shop by Categories
              </p>
              <p className="flex-1"></p>
            </div>
            <div className="  grid  lg:grid-cols-6  xl:grid-cols-6   md:grid-cols-4  sm:grid-cols-2 gap-5 sm:gap-3  ">
              {category &&
                category.length > 0 &&
                category.map((cat) => (
                  <ItemCategory key={cat.id} category={cat} />
                ))}
            </div>
          </section>

          <section
            className={`account-background   card border grid grid-cols-2 p-10 sm:grid-cols-1 sm:gap-4 mb-20 ${
              isDark ? "turn-dark" : "turn-light"
            }`}>
            <div className=" self-center sm:order-1">
              <h2 className="lg:text-[48px] xl:text-[48px]  sm:text-center font-semibold text-white   sm:text-[26px] sm:font-bold flex  max-w-md  md:text-lg">
                Become a premium user today!
              </h2>
              <p className=" sm:hidden text-white normal-case leading-6 lg:py-4 xl:py-4  xl:text-[18px] lg:text-[18px]">
                Enjoy a perpetual 10% discount on your entire Stewart Collection
                wardrobe, from the latest trends to timeless classics
              </p>

              <Link href={"/signup"}>
                <button className="btn sm:btn-sm sm:hidden  btn-outline  border  border-white normal-case font-semibold text-white">
                  Get started
                </button>
              </Link>
            </div>
            <div className=" sm:order-2">
              <Image
                src="/advert.png"
                height={286}
                width={571}
                alt="account registration"
              />
              <p className=" xl:hidden lg:hidden sm:mt-4  md:hidden text-white normal-case leading-6 lg:py-4 xl:py-4  xl:text-[18px] lg:text-[18px]">
                Enjoy a perpetual 10% discount on your entire Stewart Collection
                wardrobe, from the latest trends to timeless classics
              </p>
              <div className=" flex justify-center mt-6 md:hidden lg:hidden xl:hidden">
                <button
                  className="btn sm:btn-sm    btn-outline  border  border-white normal-case font-semibold text-white"
                  onClick={handleCreateAccountNav}>
                  Get started
                </button>
              </div>
            </div>
          </section>

          <AppFooter />
        </main>
      </AppLayout>
    </>
  );
}
