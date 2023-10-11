import React from "react";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { useSelector } from "react-redux";

function NoReviews() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className="w-full  flex flex-col justify-center items-center h-[88vh] ">
      <div className="comment p-1">
        <BsFillChatSquareQuoteFill className=" text-2xl text-[#0d58af]" />
      </div>

      <h2 className=" lg:text-[24px] xl:text-[24px] font-semibold mt-6 mb-2">You haven’t reviewed any product yet</h2>
      <p className=" mb-6 text-center">Your feedback on purchased products will appear here.</p>

      <button
        className={`btn  shadow-md   normal-case sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
          isDark
            ? "hover:border-white hover:bg-black hover:text-white"
            : " bg-black text-white hover:border-black"
        }`}>
        Continue Shopping
      </button>
    </div>
  );
}

export default function ReviewDetails() {
  return (
    <div>
      <NoReviews />
    </div>
  );
}
