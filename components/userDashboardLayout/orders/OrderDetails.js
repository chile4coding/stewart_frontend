import React from "react";
import { useSelector } from "react-redux";

function OrderIDCard() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`my-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className="  card-body over">
        <h2 className="text-[18px]  font-semibold py-2">Order Id</h2>
        <p className="text-[18px]   ">3 items</p>
        <p className="text-[18px]   ">Placed on 10/09/2023</p>
        <p className="text-[18px]  ">Delivered on 25/09/2023</p>
        <p className="text-[18px]   pb-2">Total : N00.00</p>

        <div className="mt-4">
          <h2 className="text-[18px]  font-semibold">Items in your order</h2>
        </div>

        <div
          className={` overflow-x-auto mb-6  rounded-md ${
            isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
          }`}>
          <table className="table">
            <thead className="">
              <tr
                className={
                  isDark
                    ? " text-white border-b"
                    : " border-b  text-black border-b-black"
                }>
                <th>Product</th>
                <th>product ID Code</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={
                  isDark
                    ? " text-white border-b"
                    : "  text-black border-b border-b-black"
                }>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle rounded-md w-12 h-12">
                        <img
                          src="/tshirt.png"
                          alt="Avatar Tailwind CSS Component"
                          className=" w-full h-full bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        Stewart Collection Unisex Cotton
                      </div>
                      <div className="text-sm opacity-50">T-Shirt</div>
                    </div>
                  </div>
                </td>
                <td> #123455</td>
                <td>
                  <p>2</p>
                </td>
                <th>
                  <span className=" normal-case hover:underline hover:cursor-pointer">
                    N00.00
                  </span>
                </th>
              </tr>
              <tr
                className={
                  isDark
                    ? " text-white border-b"
                    : "  text-black border-b border-b-black"
                }>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle rounded-md w-12 h-12">
                        <img
                          src="/tshirt.png"
                          alt="Avatar Tailwind CSS Component"
                          className=" w-full h-full bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        Stewart Collection Unisex Cotton
                      </div>
                      <div className="text-sm opacity-50">T-Shirt</div>
                    </div>
                  </div>
                </td>
                <td> #123455</td>
                <td>
                  <p>2</p>
                </td>
                <th>
                  <span className=" normal-case hover:underline hover:cursor-pointer">
                    N00.00
                  </span>
                </th>
              </tr>
            </tbody>

            <tfoot>
              <tr
                className={
                  isDark ? " text-white border-0 " : "  text-black border-0 "
                }>
                <th className=" text-[18px] font-semibold">Total</th>
                <th></th>
                <th className=" text-[18px] font-semibold">4 Items</th>
                <th className=" text-[18px] font-semibold">₦0.00</th>
              </tr>
            </tfoot>

            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
}

function PaymentInfo() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2
          className={`mb-3 border-b pb-1 ${
            isDark ? " border-b-white" : " border-black"
          }`}>
          Payment Information
        </h2>

        <div className=" flex gap-5 sm:mb-3 lg:mb-3 xl:mb-3 flex-wrap">
          <h2>Payment type:</h2>
          <h2>Credit card</h2>
        </div>
        <h2 className="text-18px] font-semibold mt-2">Payment details</h2>
        <div className=" flex gap-5 flex-wrap">
          <h2>Items total:</h2>
          <h2 className="   break-all   normal-case md:text-sm">₦00.00</h2>
        </div>
        <div className=" flex gap-5 flex-wrap">
          <h2>Shipping fee:</h2>
          <h2 className="   break-all   normal-case md:text-sm">
            ₦00.00 (Standard shipping)
          </h2>
        </div>
        <div className=" flex gap-5 flex-wrap">
          <h2>Total:</h2>
          <h2 className="   break-all   normal-case md:text-sm">₦00.00</h2>
        </div>
      </div>
    </div>
  );
}

function ShippingDetails() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2
          className={`mb-3 border-b pb-1 ${
            isDark ? " border-b-white" : " border-black"
          }`}>
          Shipping Details
        </h2>

        <div className=" flex gap-5 sm:mb-3 lg:mb-3 xl:mb-3 flex-wrap">
          <h2>Name</h2>
          <h2>John Does</h2>
        </div>
        <div className=" flex gap-5 ">
          <h2>Address</h2>
          <h2 className="   break-all   normal-case md:text-sm">
            No. 12, Maryland street Rumuigbo, Port Harcourt, Rivers state
            Nigeria.
          </h2>
        </div>
        <div className=" flex gap-10">
          <h2>Email</h2>
          <h2 className="   break-all   normal-case md:text-sm">
            chileomereji@gmail.com
          </h2>
        </div>
        <div className=" flex gap-5">
          <h2>Phone No.:</h2>
          <h2 className="   break-all   normal-case md:text-sm">08026797031</h2>
        </div>
      </div>
    </div>
  );
}

export default function OrdersDetails() {
  return (
    <div className=" card ">
      <OrderIDCard />
      <div className=" grid grid-cols-2 sm:grid-cols-1 gap-5 sm:gap-0 mb-5">
        <PaymentInfo />
        <ShippingDetails />
      </div>
    </div>
  );
}
