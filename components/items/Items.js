import React from "react";

export function ItemCategory() {
  return (
    <div className="card relative">
      <figure className="    ">
        <img
          src="/tshirt.png"
          alt="Shoes"
          className="rounded-xl w-full  lg:m-8 xl:m-8 md-m-8 item-category "
        />
      </figure>
      <h2 className=" text-white  font-semibold sm:text-sm sm:py-0 sm:my-0 absolute bottom-10 right-1/2 text-[28px]  sm:bottom-2">
        Hoodies
      </h2>
    </div>
  );
}

export default function Items() {
  return (
    <div className="card  shadow-xl bg-[#212121] ">
      <figure className="  ">
        <img
          src="/tshirt.png"
          alt="Shoes"
          className="rounded-xl bg-white w-full  lg:m-8 xl:m-8 md-m-8"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-[18px] sm:text-sm sm:py-0 sm:my-0">
          Stewart Collection’s Unisex Cotton T-shirt
        </h2>
        <p className="my-3 sm:text-sm sm:my-1">₦10000.00</p>
        <div className="card-actions">
          <button className="btn    capitalize sm:btn-sm">Add to cart</button>
        </div>
      </div>
    </div>
  );
}
