import Image from "next/image";
import { Inter } from "next/font/google";
import AppLayoout from "@/components/Layout/AppLayoout";
import Hero from "@/components/homepage/Hero";

import Items, { ItemCategory } from "@/components/items/Items";
const inter = Inter({ subsets: ["latin"] });
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useRouter } from "next/router";
function ItemSwiper({ swiperNavNexRef, swiperNavPrevRef }) {
    const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className="   w-full flex flex-wrap  px-10 sm:px-4">
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
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 40,
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
        // slidesPerView={2}

        className={`mySwiper   mx-auto ${isDark ? "" : " bg-[white]"}`}>
        <SwiperSlide className=" ">
          <Items />
        </SwiperSlide>
        <SwiperSlide>
          <Items />
        </SwiperSlide>
        <SwiperSlide>
          <Items />
        </SwiperSlide>
        <SwiperSlide>
          <Items />
        </SwiperSlide>
        <SwiperSlide>
          <Items />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default function Home() {
  const router  = useRouter()
    const swiperNavPrevRef = useRef(null);
    const swiperNavNexRef = useRef(null);
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <AppLayoout>
      <main>
        <secition className=" ">
          <Hero />
        </secition>
        <section className="  sm:my-10">
          <div className="flex  justify-center items-center  gap-8  sm:gap-5  sm:my-8  my-14 ">
            <p className=" border-b  flex-1"></p>
            <p className="text-[30px] font-semibold sm:text-sm  ">New in</p>
            <p className="border-b flex-1"></p>
          </div>

          <ItemSwiper
            swiperNavPrevRef={swiperNavPrevRef}
            swiperNavNexRef={swiperNavNexRef}
          />
        
        </section>
        <section className="  lg:mb-20 xl:mb-20  lg:mt-14  xl:mt-14">
          <div className="flex  justify-center items-center mb-14  gap-8  sm:gap-5  sm:my-4 ">
            <p className="  flex-1"></p>
            <p className="text-[30px] font-semibold sm:text-sm   sm:mb-6">
              Best Selling
            </p>
            <p className="flex-1"></p>
          </div>
          <div className="   w-full flex flex-wrap px-10 sm:px-4 ">
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
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1100: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
              rewind={true}
              navigation={false}
              modules={[Autoplay, Navigation]}
              // slidesPerView={2}

              className={`mySwiper    mx-auto ${isDark ? "" : " bg-[white]"}`}>
              <SwiperSlide className=" ">
                <Items />
              </SwiperSlide>
              <SwiperSlide>
                <Items />
              </SwiperSlide>
              <SwiperSlide>
                <Items />
              </SwiperSlide>
              <SwiperSlide>
                <Items />
              </SwiperSlide>
              <SwiperSlide>
                <Items />
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        <section className=" mb-10">
          <div className="flex  justify-center items-center mb-14  gap-8  sm:gap-5  sm:my-8 ">
            <p className="  flex-1"></p>
            <p className="text-[30px] font-semibold sm:text-sm  ">
              Shop by Categories
            </p>
            <p className="flex-1"></p>
          </div>
          <div className="  px-10 sm:px-4">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                // Define breakpoints for different screen sizes
                320: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                760: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1100: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
              rewind={true}
              navigation={false}
              modules={[Autoplay, Navigation]}
              // slidesPerView={2}
              className="mySwiper  mx-auto">
              <SwiperSlide className="">
                <ItemCategory />
              </SwiperSlide>
              <SwiperSlide className="">
                <ItemCategory />
              </SwiperSlide>
              <SwiperSlide className="">
                <ItemCategory />
              </SwiperSlide>
              <SwiperSlide className="">
                <ItemCategory />
              </SwiperSlide>
              <SwiperSlide className="">
                <ItemCategory />
              </SwiperSlide>
              <SwiperSlide className="">
                <ItemCategory />
              </SwiperSlide>
              <SwiperSlide className="">
                <ItemCategory />
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        <section
          className={`accountbg card border grid grid-cols-2 p-10 sm:grid-cols-1 sm:gap-4 mb-20 ${
            isDark ? "turndark" : "turnlight"
          }`}>
          <div className=" self-center sm:order-1">
            <h2 className="text-[48px]  sm:text-center font-semibold   sm:text-[36px] sm:font-normal flex  max-w-md  md:text-lg">
              Sign up now to get 10% off your first order
            </h2>

            <button className="btn sm:btn-sm sm:hidden  btn-outline  border  border-white normal-case font-semibold text-white">
              Create Account
            </button>
          </div>
          <div className=" sm:order-2">
            <Image
              src="/advert.png"
              height={286}
              width={571}
              alt="account registration"
            />
            <div className=" flex justify-center mt-6 md:hidden lg:hidden xl:hidden">
              <button className="btn sm:btn-sm    btn-outline  border  border-white normal-case font-semibold text-white">
                Create Account
              </button>
            </div>
          </div>
        </section>
      </main>
    </AppLayoout>
  );
}
