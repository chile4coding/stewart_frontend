import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Rating } from "@mui/material";
import { useSwiper } from "swiper/react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { ImageComponent } from "../image/Imagecomponent";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/storeSlice";
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
import { useRouter } from "next/router";
import toast from "react-hot-toast";

function Color({ id, color, active, handleColor }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

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
        onClick={handleColor.bind(this, id)}
      >
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
        className={` btn p-3 px-4   rounded-md border   font-semibold lowercase ${
          isDark
            ? " bg-black  hover:text-black  "
            : "border border-black hover:bg-black hover:text-white  "
        }  ${isDark && active && " text-black hover:text-black bg-white  "} ${
          !isDark && active && "bg-black"
        }`}
        onClick={handleSize.bind(this, id)}
      >
        {size}
      </button>
    </>
  );
}

function ClothDescription({ desc, size, singleProduct }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const [color, setColor] = useState([]);
  const [sizeName, setSizeName] = useState([]);
  useEffect(() => {
    const f = size.map((si) => ({
      name: si.name,
      waist: si.waist,
      legnth: si.length,
      sleave: si.sleaves,
    }));
    setColor(f);
    const s = f.map((si) => Object.keys(si)).flat();
    const uniq = new Set(s);
    const arr = Array.from(uniq).slice(1);
    setSizeName(arr);
  }, [size]);

  return (
    <>
      <p className=" py-3  leading-6 text-justify sm:text-xs  sm:leading-4 normal-case">
        {desc}
      </p>

      <h2
        className={`border-b  text-[24px] font-semibold pb-4 pt-8 mb-8 ${
          isDark ? "" : " border-b-black"
        }`}
      >
        Size & fit
      </h2>
      <div
        className={`overflow-x-auto ${
          isDark ? " bg-[#f0eded] text-black" : ""
        }`}
      >
        <table className="table">
          {/* head */}
          <thead>
            <tr
              className={`border-b-black font-bold  text-[18px] ${
                isDark ? " text-black" : " text-black"
              }`}
            >
              <th className=" lowercase">sizes</th>
              {sizeName?.map((s, i) => (
                <th key={i} className=" lowercase">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {color.map((s) => (
              <tr className={isDark ? " border-b-black" : " border-b-black"}>
                <th className=" lowercase">{s.name}</th>
                <td className=" lowercase">{s.waist}</td>
                <td className=" lowercase">{s.legnth}</td>
                <td className=" lowercase">{s.sleave}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function Clothes({ cloth, handleSlideImageDisplay }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  if (cloth) {
    return (
      <img
        src={cloth?.image}
        onClick={handleSlideImageDisplay?.bind(this, cloth.id)}
        alt="polo"
        className={`max-w-[85px] w-full rounded-lg cursor-pointer  ${
          isDark ? "bg-[#e4e1e1]" : "bg-[#e4e1e1]"
        }`}
      />
    );
  }
}
function SimilarClothes({
  swiperNavNexRef,
  swiperNavPrevRef,
  similar,
  singleCloth,
  image,
  handleSlideImageDisplay,
}) {
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
      className="mySwiper  mx-auto flex  items-center justify-between mr-6"
    >
      {similar.map((s) =>
        s.colors.map((col) => (
          <SwiperSlide className="" key={col.id}>
            <Clothes
              cloth={col}
              handleSlideImageDisplay={handleSlideImageDisplay}
            />
          </SwiperSlide>
        ))
      )}
      <SwiperSlide className="" key={singleCloth.id}>
        <Clothes
          cloth={{ id: singleCloth.id, image: image }}
          handleSlideImageDisplay={handleSlideImageDisplay}
        />
      </SwiperSlide>
    </Swiper>
  );
}

function ClethReviews({ review }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <>
      <div
        className={` grid grid-cols-3 py-10 sm:grid-cols-1  ${
          isDark ? "border-b border-b-white " : " border-b border-b-black "
        }`}
      >
        <Rating
          sx={{
            backgroundColor: "",

            fill: "green",
          }}
          className="my-4"
          defaultValue={Number(review?.rating)}
          precision={0.5}
          readOnly
        />
        <div className=" grid gap-3">
          <div className=" flex gap-4 items-center">
            <div className=" w-[50px] h-[50px] rounded-full ">
              <ImageComponent
                imageUrl={review?.avatar}
                rounded="rounded-full"
              />
            </div>
            <div>
              <h2 className=" text-[ 18px]  font-semibold">
                {review?.user?.name}
              </h2>
              <p className=" text-[14px] italic font-normal leading-6">
                Verified purchase
              </p>
            </div>
          </div>

          <p className="text-[ 18px] font-normal leading-6 normal-case">
            {review?.comment}
          </p>
        </div>
        <p className="justify-self-end">
          {new Date(review?.date).toLocaleDateString("en-UK")}
        </p>
      </div>
    </>
  );
}
export default function SingleItem({ singleItem, similarProduct }) {
  const { toggleMode, cart } = useSelector((state) => state.store);
  const [clotheSize, setClotheSize] = useState(
    singleItem?.size.map((s) => ({ ...s, active: false }))
  );
  const [clotheColor, setColor] = useState([
    {
      id: singleItem?.id,
      color: singleItem?.initial_color,
      active: true,
    },
  ]);
  const [singleProduct, setSingleProduct] = useState(singleItem);
  const [specialCoth, setSpecialCloth] = useState("");

  const [descAndReviewDisplay, setDescAndReviewDisplay] = useState(false);
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();

  const swiperNavPrevRef = useRef(null);
  const swiperNavNexRef = useRef(null);
  const router = useRouter();

  const { isDark } = toggleMode;

  useEffect(() => {
    setSpecialCloth(singleItem.image);

    setSingleProduct(singleItem);
  }, [router.asPath, specialCoth]);

  function handleSize(id) {
    const clothColors = singleProduct.size
      .map((s) => s.colors.filter((col) => col.size_id === id))
      .flat();
    if (clothColors.length < 1) {
      return;
    }

    setClotheSize((prev) => {
      return prev.map((s) => {
        if (s.id === id) {
          return { ...s, active: true };
        } else {
          return { ...s, active: false };
        }
        return s;
      });
    });

    setColor((prev) => clothColors);
  }

  function handleColor(id) {
    setColor((prev) => {
      return prev.map((color) => {
        if (color.id === id) {
          return { ...color, active: true };
        } else {
          return { ...color, active: false };
        }
        return color;
      });
    });

    const clothColors = singleProduct.size
      .map((s) => s.colors.filter((col) => col.id === id))
      .flat(1);
    if (clothColors.length > 0) {
      const [color] = clothColors;
      const clothSize = singleProduct.size.find((s) => s.id === color.size_id);

      setSingleProduct({
        ...singleProduct,
        price: color.price,
        image: color.image,
        initial_color: color.name,
        initial_size: clothSize?.name,
      });
    }
  }

  function handleSlideImageDisplay(id) {
    const singleCloth = singleItem.id === id;

    if (singleCloth) {
      setSingleProduct({
        ...singleProduct,
        price: singleItem.price,
        image: singleItem.image,
        initial_color: singleItem.initial_color,
        initial_size: singleItem.initial_size,
      });

      return;
    }

    const clothColors = singleProduct.size
      .map((s) => s.colors.filter((col) => col.id === id))
      .flat(1);
    if (clothColors.length > 0) {
      const [color] = clothColors;
      const clothSize = singleProduct.size.find((s) => s.id === color.size_id);

      setSingleProduct({
        ...singleProduct,
        price: color.price,
        image: color.image,
        initial_color: color.name,
        initial_size: clothSize?.name,
      });
    }
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

  function handleCart(checkouts) {
    const { name, id, category_id, price, initial_size, initial_color, image } =
      singleProduct;
    const cartqty = value;
    const activeCart = {
      name,
      id,
      category_id,
      price,
      initial_size,
      initial_color,
      image,
      qty: cartqty,
      subTotal: price * cartqty,
    };
    dispatch(addToCart(activeCart));

    toast.success(
      <h2 className=" normal-case">Your item has been added to cart</h2>
    );

    if (Boolean(checkouts)) {
      router.replace("/checkout");
    }
  }

  return (
    <main className=" mb-20">
      <div className="  grid grid-cols-2 sm:grid-cols-1 text-[18px] gap-6  md:grid-cols-1 sm:gap-16  md:gap-16 ">
        <div className=" sm:max-h-[300px] max-h-[410px]   sm:mb-20 md:mb-24">
          <img
            src={singleProduct?.image}
            alt="polo"
            className={`  object-cover h-full w-full rounded-lg image_ani ${
              isDark ? "bg-[#e4e1e1]" : "bg-[#9c9a9a]"
            }`}
          />
          <div className=" my-6 flex justify-center items-center">
            <div ref={swiperNavNexRef} className="">
              <MdNavigateBefore
                className={` text-2xl font-bold  cursor-pointer ${
                  isDark
                    ? "text-black  bg-white rounded-full"
                    : "text-white bg-black rounded-full"
                }`}
              />
            </div>
            <SimilarClothes
              handleSlideImageDisplay={handleSlideImageDisplay}
              similar={singleProduct.size}
              image={specialCoth}
              singleCloth={singleProduct}
              swiperNavPrevRef={swiperNavPrevRef}
              swiperNavNexRef={swiperNavNexRef}
            />
            <div ref={swiperNavPrevRef} className="">
              <MdNavigateNext
                className={` text-2xl font-bold cursor-pointer ${
                  isDark
                    ? "text-black  bg-white rounded-full"
                    : "text-white bg-black rounded-full"
                }`}
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="lg:text-[36px] xl:text-[36px] sm:text-[16px] font-semibold  leading-snug">
            Stewart Collection{" "}
            {`${singleProduct?.name} - ${singleProduct?.initial_color}`}
          </h2>
          <h4 className="text-[36px] font-semibold leading-snug sm:text-[12px]">
            ₦{singleProduct?.price.toFixed(2)}
          </h4>
          {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
          <Rating
            sx={{
              backgroundColor: "#F0EDED",
              fill: "green",
            }}
            readOnly
            className="my-4"
            defaultValue={3.5}
            precision={0.5}
          />
          <h2 className=" text-[18px]  font- leading-6 sm:text-xs normal-case">
            {singleProduct?.short_desc}
          </h2>
          <h2 className="  font-semibold my-4">Sizes</h2>
          <div className="flex gap-2 flex-wrap">
            {clotheSize.map((btn) => (
              <Sizes
                key={btn.id}
                size={btn.name}
                id={btn.id}
                active={btn?.active}
                handleSize={handleSize}
              />
            ))}
          </div>
          <h2 className="  font-semibold my-4 ">Colors</h2>
          <div className="flex gap-2 flex-wrap">
            {clotheColor?.length > 0 &&
              clotheColor.map((btn) => (
                <Sizes
                  key={btn.id}
                  size={btn.color || btn.name}
                  id={btn.id}
                  active={btn.active}
                  color={btn.name}
                  handleSize={handleColor}
                />
              ))}
          </div>

          <h2 className="  font-semibold my-4 ">Quantity</h2>
          <div
            className={`border flex gap-6 max-w-[98px] p-2  rounded-md items-center ${
              isDark ? "" : "  border-black text-black"
            }`}
          >
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
          <div className="  grid grid-cols-2 gap-5">
            <button
              className={`my-6 btn  btn-outline border normal-case    px-8 py-4 ${
                isDark
                  ? "border-white text-white  hover:bg-white hover:text-black "
                  : " hover:bg-black hover:text-white "
              }`}
              onClick={handleCart.bind(this, false)}
            >
              Add to cart
            </button>
            <button
              className={`my-6 btn  btn-outline border normal-case    px-8 py-4  ${
                isDark
                  ? "border-white text-white  hover:bg-white hover:text-black "
                  : " hover:bg-black hover:text-white "
              }`}
              onClick={handleCart.bind(this, true)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2
          className={`  border-b  text-[24px] font-semibold pb-4 pt-8 ${
            isDark ? "" : " border-b-black"
          }`}
        >
          <span>
            <div className=" flex gap-8 items-center ">
              <span
                className={` sm:text-sm hover:cursor-pointer hover:bg-[#212121] hover:text-white  p-2 rounded-md ${
                  !descAndReviewDisplay &&
                  "bg-[#212121] p-2 rounded-md text-white"
                }`}
                onClick={handeDescriptionDisplay}
              >
                Description
              </span>
              <span
                className={`sm:text-sm hover:cursor-pointer hover:bg-[#212121] hover:text-white  p-2 rounded-md  ${
                  descAndReviewDisplay &&
                  "bg-[#212121] p-2 rounded-md text-white"
                }`}
                onClick={handleReviewsDisplay}
              >
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
            {singleProduct.reviews.map((rev) => (
              <ClethReviews key={rev.id} review={rev} />
            ))}
          </div>
        ) : (
          <ClothDescription
            desc={singleProduct?.description}
            singleProduct={singleProduct}
            size={singleProduct?.size}
          />
        )}

        <h2 className="   text-[24px] font-semibold pb-4 pt-8 my-8 ">
          You May Also Like
        </h2>
        <div className=" grid grid-cols-4 my-8 gap-6 md:grid-cols-3 sm:grid-cols-2">
          {similarProduct &&
            similarProduct.length > 0 &&
            similarProduct.map((item) => <Items items={item} />)}
        </div>
      </div>
    </main>
  );
}
