import React, { useRef, useState } from "react";
import Image from "next/image";
import { Rating } from "@mui/material";
import { useSwiper } from "swiper/react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { ImageComponent } from "../image/Imagecomponent";
import { useSelector, useDispatch } from "react-redux";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { FaMinus, FaPlus } from "react-icons/fa";

import { toggler } from "@/redux/storeSlice";
import { BiMinus } from "react-icons/bi";
import Items from "../items/Items";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const size = [
  { id: 1, s: "S", active: false },
  { id: 2, s: "M", active: false },
  { id: 3, s: "L", active: false },
  { id: 4, s: "XL", active: false },
  { id: 5, s: "2XL", active: false },
  { id: 6, s: "3XL", active: false },
];
const colors = [
  { id: 1, color: "White", active: false },
  { id: 2, color: "Blue", active: false },
  { id: 3, color: "Black", active: false },
  { id: 4, color: "Gray", active: false },
  { id: 5, color: "Navy", active: false },
  { id: 6, color: "Green", active: false },
  { id: 7, color: "Red", active: false },
];

function Color({ id, color, active, handleColor }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  c;
  return (
    <>
      <button
        className={` btn p-3 px-4  rounded-md border  normal-case  font-semibold ${
          isDark
            ? " bg-black  hover:text-black normal-case"
            : "border border-black hover:bg-black hover:text-white normal-case"
        }  ${isDark && active && " text-black hover:text-black bg-white "} ${
          !isDark && active && "bg-black"
        }`}
        onClick={handleColor.bind(this, id)}>
        {color}
      </button>
    </>
  );
}
function Sizes({ id, size, active, handleSize }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  return (
    <>
      <button
        className={` btn p-3 px-4   rounded-md border   font-semibold ${
          isDark
            ? " bg-black  hover:text-black  "
            : "border border-black hover:bg-black hover:text-white  "
        }  ${isDark && active && " text-black hover:text-black bg-white  "} ${
          !isDark && active && "bg-black"
        }`}
        onClick={handleSize.bind(this, id)}>
        {size}
      </button>
    </>
  );
}

function ClothDescription() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <>
      <p className="py-3  leading-6 text-justify sm:text-xs  sm:leading-4">
        ntroducing the Stewart Collection Unisex Heavy Blend™ Crewneck
        Sweatshirt: Stay Cozy in Style! Embrace the perfect combination of
        comfort and fashion with our Stewart Collection Unisex Heavy Blend™
        Crewneck Sweatshirt. Crafted with meticulous attention to detail, this
        premium sweatshirt is designed to keep you warm and stylish all year
        round
      </p>
      <p className="py-3  leading-6 text-justify sm:text-xs  sm:leading-4">
        ntroducing the Stewart Collection Unisex Heavy Blend™ Crewneck
        Sweatshirt: Stay Cozy in Style! Embrace the perfect combination of
        comfort and fashion with our Stewart Collection Unisex Heavy Blend™
        Crewneck Sweatshirt. Crafted with meticulous attention to detail, this
        premium sweatshirt is designed to keep you warm and stylish all year
        round
      </p>
      <p className="py-3  leading-6 text-justify sm:text-xs  sm:leading-4">
        ntroducing the Stewart Collection Unisex Heavy Blend™ Crewneck
        Sweatshirt: Stay Cozy in Style! Embrace the perfect combination of
        comfort and fashion with our Stewart Collection Unisex Heavy Blend™
        Crewneck Sweatshirt. Crafted with meticulous attention to detail, this
        premium sweatshirt is designed to keep you warm and stylish all year
        round
      </p>
      <p className="py-3  leading-6 text-justify sm:text-xs  sm:leading-4">
        ntroducing the Stewart Collection Unisex Heavy Blend™ Crewneck
        Sweatshirt: Stay Cozy in Style! Embrace the perfect combination of
        comfort and fashion with our Stewart Collection Unisex Heavy Blend™
        Crewneck Sweatshirt. Crafted with meticulous attention to detail, this
        premium sweatshirt is designed to keep you warm and stylish all year
        round
      </p>

      <h2
        className={`border-b  text-[24px] font-semibold pb-4 pt-8 mb-8 ${
          isDark ? "" : " border-b-black"
        }`}>
        Size & fit
      </h2>
      <div
        className={`overflow-x-auto ${
          isDark ? " bg-[#f0eded] text-black" : ""
        }`}>
        <table className="table">
          {/* head */}
          <thead>
            <tr
              className={`border-b-black font-bold  text-[18px] ${
                isDark ? " text-black" : " text-black"
              }`}>
              <th></th>
              <th>S</th>
              <th>M</th>
              <th>L</th>
              <th>XL</th>
              <th>2XL</th>
              <th>3Xl</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className={isDark ? " border-b-black" : " border-b-black"}>
              <th>Waist (cm)</th>

              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
            </tr>
            <tr className={isDark ? " border-b-black" : " border-b-black"}>
              <th>Waist (cm)</th>

              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
            </tr>
            <tr className={isDark ? " border-b-black" : " border-b-black"}>
              <th>Waist (cm)</th>

              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
function Clothes() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <Image
      src="/polo.png"
      height={85}
      width={85}
      alt="polo"
      className={`rounded-lg cursor-pointer  ${
        isDark ? "bg-[#e4e1e1]" : "bg-[#e4e1e1]"
      }`}
    />
  );
}
function SimilarClothes({ swiperNavNexRef, swiperNavPrevRef }) {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={6}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={{
        prevEl: swiperNavNexRef.current,
        nextEl: swiperNavPrevRef.current,
      }}
      pagination={{
        clickable: true,
      }}
      rewind={true}
      loop
      modules={[Autoplay, Navigation]}
      // slidesPerView={2}
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = swiperNavPrevRef.current;
        swiper.params.navigation.nextEl = swiperNavNexRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
      className="mySwiper  mx-auto flex  items-center justify-between mr-6">
      <SwiperSlide className="">
        <Clothes />
      </SwiperSlide>
      <SwiperSlide className="">
        <Clothes />
      </SwiperSlide>
      <SwiperSlide className="">
        <Clothes />
      </SwiperSlide>
      <SwiperSlide className="">
        <Clothes />
      </SwiperSlide>
      <SwiperSlide className="">
        <Clothes />
      </SwiperSlide>
      <SwiperSlide className="">
        <Clothes />
      </SwiperSlide>
      <SwiperSlide className="">
        <Image
          src="/polo.png"
          height={85}
          width={85}
          alt="polo"
          className="bg-white rounded-lg"
        />
      </SwiperSlide>
      <SwiperSlide className="">
        <Image
          src="/polo.png"
          height={85}
          width={85}
          alt="polo"
          className="bg-white rounded-lg"
        />
      </SwiperSlide>
    </Swiper>
  );
}

function ClethReviews() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <>
      <div
        className={` grid grid-cols-3 py-10 sm:grid-cols-1  ${
          isDark ? "border-b border-b-white " : " border-b border-b-black "
        }`}>
        <Rating
          sx={{
            backgroundColor: "",

            fill: "green",
          }}
          className="my-4"
          defaultValue={5}
          precision={0.5}
          readOnly
        />
        <div className=" grid gap-3">
          <div className=" flex gap-4 items-center">
            <div className=" w-[50px] h-[50px] rounded-full ">
              <ImageComponent
                imageUrl="https://imgv3.fotor.com/images/slider-image/Female-portrait-photo-enhanced-with-clarity-and-higher-quality-using-Fotors-free-online-AI-photo-enhancer.jpg"
                rounded="rounded-full"
              />
            </div>
            <div>
              <h2 className=" text-[ 18px]  font-semibold">Chile Omereji</h2>
              <p className=" text-[14px] italic font-normal leading-6">
                Verified purchase
              </p>
            </div>
          </div>

          <p className="text-[ 18px] font-normal leading-6">
            I love the sweatshirt, it’s very comfy and the material is of good
            quality. I will definitely recommend this brand to anyone.
          </p>
        </div>
        <p className="justify-self-end">2023-10-56</p>
      </div>
    </>
  );
}
export default function () {
  const [clotheSize, setClotheSize] = useState(size);
  const [clotheColor, setColor] = useState(colors);
  const [descAndReviewDisplay, setDescAndReviewDisplay] = useState(false);
  const [value, setValue] = useState(1);
  const swiperNavPrevRef = useRef(null);
  const swiperNavNexRef = useRef(null);
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  function handleSize(id) {
    setClotheSize((prev) => {
      return prev.map((s) => {
        if (s.id === id) {
          s.active = true;
        } else {
          s.active = false;
        }
        return s;
      });
    });
  }

  function handleColor(id) {
    setColor((prev) => {
      return prev.map((color) => {
        if (color.id === id) {
          color.active = true;
        } else {
          color.active = false;
        }
        return color;
      });
    });
  }

  function handleIncreaseValue() {
    if (value > 0) {
      setValue((prev) => prev + 1);
    }
  }

  function handleDecreaseValue() {
    if (value > 1) {
      setValue((prev) => prev - 1);
    }
  }

  function handeDescriptionDisplay() {
    setDescAndReviewDisplay(false);
  }

  function handleReviewsDisplay() {
    setDescAndReviewDisplay(true);
  }
  return (
    <main className=" mb-20">
      <div className="  grid grid-cols-2 sm:grid-cols-1 text-[18px] gap-6  md:grid-cols-1">
        <div className="">
          <Image
            src="/polo.png"
            height={588}
            width={588}
            alt="polo"
            className={`rounded-lg ${isDark ? "bg-[#e4e1e1]" : "bg-[#e4e1e1]"}`}
          />
          <div className=" my-6 flex justify-center items-center">
            <div ref={swiperNavNexRef} className="swiperNavPrev">
              <MdNavigateBefore
                className={` text-2xl font-bold ${
                  isDark
                    ? "text-black  bg-white rounded-full"
                    : "text-white bg-black rounded-full"
                }`}
              />
            </div>
            <SimilarClothes
              swiperNavPrevRef={swiperNavPrevRef}
              swiperNavNexRef={swiperNavNexRef}
            />
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
        </div>
        <div>
          <h2 className="text-[36px] sm:text-[20px] font-semibold  leading-snug">
            Stewart Collection Unisex <br /> Heavy Blend™ Crewneck Sweatshirt{" "}
          </h2>
          <h4 className="text-[36px] font-semibold leading-snug sm:text-[20px]">
            ₦0.00
          </h4>
          {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
          <Rating
            sx={{
              backgroundColor: "#F0EDED",
              fill: "green",
            }}
            className="my-4"
            defaultValue={2.5}
            precision={0.5}
          />
          <h2 className=" text-[18px]  font- leading-6 sm:text-xs">
            Embrace the perfect combination of comfort and fashion with our
            Unisex Heavy Blend™ Crewneck Sweatshirt. Crafted with meticulo us
            attention to detail, this premium sweatshirt is designed to keep you
            warm and stylish all year round.
          </h2>
          <h2 className="  font-semibold my-4">Sizes</h2>
          <div className="flex gap-2 flex-wrap">
            {clotheSize.map((btn) => (
              <Sizes
                key={btn.id}
                size={btn.s}
                id={btn.id}
                active={btn.active}
                handleSize={handleSize}
              />
            ))}
          </div>
          <h2 className="  font-semibold my-4 ">Colors</h2>
          <div className="flex gap-2 flex-wrap">
            {clotheColor.map((btn) => (
              <Sizes
                key={btn.id}
                size={btn.color}
                id={btn.id}
                active={btn.active}
                color={btn.color}
                handleSize={handleColor}
              />
            ))}
          </div>

          <h2 className="  font-semibold my-4 ">Quantity</h2>
          <div
            className={`border flex gap-6 max-w-[98px] p-2  rounded-md items-center ${
              isDark ? "" : "  border-black text-black"
            }`}>
            <FaMinus
              className=" font-bold  text-[30px] cursor-pointer"
              onClick={handleDecreaseValue}
            />{" "}
            <span>{value}</span>{" "}
            <FaPlus
              className="font-bold  text-[30px] cursor-pointer"
              onClick={handleIncreaseValue}
            />
          </div>
          <button
            className={`my-6 btn  btn-outline border normal-case    px-8 py-4 w-full ${
              isDark
                ? "border-white text-white  hover:bg-white hover:text-black "
                : " hover:bg-black hover:text-white "
            }`}>
            Add to cart
          </button>
        </div>
      </div>
      <div>
        <h2
          className={` border-b  text-[24px] font-semibold pb-4 pt-8 ${
            isDark ? "" : " border-b-black"
          }`}>
          <span>
            <div className=" flex gap-8 items-center">
              <span
                className={` sm:text-sm hover:cursor-pointer hover:bg-[#212121] hover:text-white  p-2 rounded-md ${
                  !descAndReviewDisplay &&
                  "bg-[#212121] p-2 rounded-md text-white"
                }`}
                onClick={handeDescriptionDisplay}>
                Description
              </span>
              <span
                className={`sm:text-sm hover:cursor-pointer hover:bg-[#212121] hover:text-white  p-2 rounded-md  ${
                  descAndReviewDisplay &&
                  "bg-[#212121] p-2 rounded-md text-white"
                }`}
                onClick={handleReviewsDisplay}>
                Reviews
              </span>
            </div>
          </span>
        </h2>
        {descAndReviewDisplay ? (
          <div>
            <div className=" grid  grid-cols-3 px-10  my-6">
              <h2>Rating </h2>
              <h2 className="  justify-self-center">Reveiws</h2>
              <h2 className=" justify-self-end">Date </h2>
            </div>
            <ClethReviews /> <ClethReviews /> <ClethReviews /> <ClethReviews />{" "}
            <ClethReviews />{" "}
          </div>
        ) : (
          <ClothDescription />
        )}

        <h2 className="   text-[24px] font-semibold pb-4 pt-8 my-8 ">
          You May Also Like
        </h2>
        <div className=" grid grid-cols-4 my-8 gap-6 md:grid-cols-3 sm:grid-cols-2">
          <Items />
          <Items />
          <Items />
          <Items />
        </div>
      </div>
    </main>
  );
}
