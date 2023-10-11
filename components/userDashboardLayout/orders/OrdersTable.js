import React from 'react'
import { useSelector } from 'react-redux'

export default function OrdersTable() {
          const isDark = useSelector((state) => state.store.toggleMode.isDark);


  return (
    <div
      className={`  pb-3 mb-6  rounded-md ${
        isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
      }`}>
      <div
        className={` card-body overflow-x-auto mb-6  rounded-md ${
          isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
        }`}>
        <table className="table">
          <thead className="">
            <tr
              className={
                isDark ? " text-white border-0" : " border-0  text-black"
              }>
              <th>Product</th>
              <th>Order ID</th>
              <th>Order status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
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
                <p className={isDark ? "text-[#FCBB16]" : "  "}>Pending</p>
                <p className={isDark ? "active_label" : ""}>Pending</p>
              </td>
              <th>
                <span className=" normal-case hover:underline hover:cursor-pointer">
                  View details
                </span>
              </th>
            </tr>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
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
                <p className={isDark ? "text-[#34C759]" : "  "}>Delivered</p>
                <p className={isDark ? "active_label" : ""}>2023/10/23</p>
              </td>
              <th>
                <span className=" normal-case hover:underline hover:cursor-pointer">
                  View details
                </span>
              </th>
            </tr>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
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
                <p className={isDark ? "text-[#FCBB16]" : "  "}>Pending</p>
                <p className={isDark ? "active_label" : ""}>Pending</p>
              </td>
              <th>
                <span className=" normal-case hover:underline hover:cursor-pointer">
                  View details
                </span>
              </th>
            </tr>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
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
                <p className={isDark ? "text-[#34C759]" : "  "}>Delivered</p>
                <p className={isDark ? "active_label" : ""}>2023/10/23</p>
              </td>
              <th>
                <span className=" normal-case hover:underline hover:cursor-pointer">
                  View details
                </span>
              </th>
            </tr>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
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
                <p className={isDark ? "text-[#FCBB16]" : "  "}>Pending</p>
                <p className={isDark ? "active_label" : ""}>Pending</p>
              </td>
              <th>
                <span className=" normal-case hover:underline hover:cursor-pointer">
                  View details
                </span>
              </th>
            </tr>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
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
                <p className={isDark ? "text-[#34C759]" : "  "}>Delivered</p>
                <p className={isDark ? "active_label" : ""}>2023/10/23</p>
              </td>
              <th>
                <span className=" normal-case hover:underline hover:cursor-pointer">
                  View details
                </span>
              </th>
            </tr>
            <tr
              className={
                isDark ? " text-white border-0" : "  text-black border-0"
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
                <p className={isDark ? "text-[#34C759]" : "  "}>Delivered</p>
                <p className={isDark ? "active_label" : ""}>2023/10/23</p>
              </td>
              <th>
                <span className=" normal-case hover:underline hover:cursor-pointer">
                  View details
                </span>
              </th>
            </tr>
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
}
