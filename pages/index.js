import Image from "next/image";
import { Inter } from "next/font/google";
import AppLayoout from "@/components/Layout/AppLayoout";
import Hero from "@/components/homepage/Hero";

import Items, { ItemCategory } from "@/components/items/Items";
const inter = Inter({ subsets: ["latin"] });
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Home() {

  return (
    <AppLayoout>
      <main>
        <secition className=" ">
          <Hero />
        </secition>
        <section className=" my-20">
          <div className="flex  justify-center items-center mb-14  gap-8  sm:gap-5  sm:my-8 ">
            <p className=" border-b  flex-1"></p>
            <p className="text-[30px] font-semibold sm:text-sm  ">New in</p>
            <p className="border-b flex-1"></p>
          </div>
          <div className="  max-w-[1440px] w-full flex flex-wrap">
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
                  slidesPerView: 1,
                  spaceBetween: 30,
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
              navigation={true}
              modules={[Autoplay, Navigation]}
              // slidesPerView={2}

              className="mySwiper  mx-auto">
              <SwiperSlide className="">
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
        <section className="  lg:mb-20 xl:mb-20">
          <div className="flex  justify-center items-center mb-14  gap-8  sm:gap-5  sm:my-8 ">
            <p className="  flex-1"></p>
            <p className="text-[30px] font-semibold sm:text-sm  ">
              Best Selling
            </p>
            <p className="flex-1"></p>
          </div>
          <div className="   grid  grid-cols-1 lg:grid-cols-3 md:grid-cols-2  xl:grid-cols-3 gap-8">
            <Items />
            <Items />
            <Items />
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
          <div className="  ">
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
              navigation={true}
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

        <section className="accountbg card border grid grid-cols-2 p-10 sm:grid-cols-1 sm:gap-4 mb-20">
          <div className=" self-center sm:order-2">
            <h2 className="text-[48px] font-semibold sm:text-sm flex  max-w-md  md:text-lg">
              Sign up now to get 10% off your first order
            </h2>

            <button className="btn sm:btn-sm  btn-outline  border  border-white normal-case font-semibold text-white">
              Create Account
            </button>
          </div>
          <div>
            <Image
              src="/advert.png"
              height={286}
              width={571}
              alt="account registration"
            />
          </div>
        </section>
      </main>
    </AppLayoout>
  );
}
