import React from "react";
import { useSelector } from "react-redux";

export default function PaymentDetails() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className="my-14">
      <h2 className=" text-[18px] font-semibold leading-6 mb-5">
        Payment methods
      </h2>

      <div className="leading-6 mb-5 ">
        <input type="radio" name="radio-7" />
        <span className="mx-4">Credit Card</span>
      </div>
      <div className="leading-6 mb-5">
        <input type="radio" name="radio-7" />
        <span className="mx-4">Paystack</span>
      </div>

      <h2 className=" leading-6 mb-5">Credit card details</h2>
      <p className=" mb-3 ">Amount</p>
      <h2 className=" mb-5">₦0.00</h2>
      <div>
        <h2 className=" pb-2 ">Name on Card</h2>
        <input
          type="text"
          className={`input input-bordered  w-full  ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>
      <div className=" py-6">
        <h2 className=" pb-2 ">card number</h2>
        <input
          type="number"
          className={`input input-bordered  w-full  ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>
      <div className=" grid grid-cols-2 gap-6 py-6">
        <div>
          <h2 className=" pb-2 ">Expiry date</h2>
          <input
            type="date"
            className={`input input-bordered  w-full nput ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
        </div>
        <div>
          <h2 className=" pb-2 ">Security code</h2>
          <input
            type="number"
            className={`input input-bordered  w-full  ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
        </div>
      </div>
      <button
        className={`btn  shadow-md   capitalize sm:my-4 w-full   mx-auto ${
          isDark
            ? "hover:border-white hover:bg-black hover:text-white"
            : " bg-black text-white hover:border-black"
        }`}>
        Pay Now
      </button>
    </div>
  );
}
