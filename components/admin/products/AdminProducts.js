import { useRouter } from "next/router";
import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";



function ProductList(){
      const isDark = useSelector((state) => state.store.toggleMode.isDark);
const router  = useRouter()


function handleNavigation(id){
  router.push(`/admin/products/${id}`)
}
 
    return (
      <div
        className={`  pb-3 mb-6  rounded-md ${
          isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
        }`}>
        <div
          className={` card-body overflow-x-auto mb-6  rounded-md ${
            isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
          }`}>
          <div className=" flex justify-between items-center">
            <h2 className=" lg:text-[18px] xl:text-[18px] font-semibold">
              Product List
            </h2>
            <button
              onClick={handleNavigation.bind(this, "add_new_product")}
              className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}>
              + New Product
            </button>
          </div>
          <div className=" overflow-x-auto ">
            <table className="table">
              <thead className="">
                <tr
                  className={
                    isDark
                      ? " text-white border-b"
                      : "   text-black border-b  border-b-black"
                  }>
                  <th>Product name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
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
                        <div className="mask  rounded-md w-12 h-12">
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
                  <td> Sweatshirts</td>
                  <td>N00.00</td>
                  <td>In Stock(500)</td>
                  <td>
                    <div className=" flex items-center gap-4 ">
                      <div
                        className=" flex items-center gap-1 hover:underline hover:cursor-pointer"
                        onClick={handleNavigation.bind(this, "update")}>
                        <MdModeEdit /> <span>Edit</span>
                      </div>
                      <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    </div>
                  </td>
                </tr>
                <tr
                  className={
                    isDark ? " text-white border-0" : "  text-black border-0"
                  }>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask  rounded-md w-12 h-12">
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
                  <td> Sweatshirts</td>
                  <td>N00.00</td>
                  <td>In Stock(500)</td>
                  <td>
                    <div className=" flex items-center gap-4 ">
                      <div className=" flex items-center gap-1 hover:underline hover:cursor-pointer">
                        <MdModeEdit /> <span>Edit</span>
                      </div>
                      <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    </div>
                  </td>
                </tr>
                <tr
                  className={
                    isDark ? " text-white border-0" : "  text-black border-0"
                  }>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask  rounded-md w-12 h-12">
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
                  <td> Sweatshirts</td>
                  <td>N00.00</td>
                  <td>In Stock(500)</td>
                  <td>
                    <div className=" flex items-center gap-4 ">
                      <div className=" flex items-center gap-1 hover:underline hover:cursor-pointer">
                        <MdModeEdit /> <span>Edit</span>
                      </div>
                      <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    </div>
                  </td>
                </tr>
                <tr
                  className={
                    isDark ? " text-white border-0" : "  text-black border-0"
                  }>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask  rounded-md w-12 h-12">
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
                  <td> Sweatshirts</td>
                  <td>N00.00</td>
                  <td>In Stock(500)</td>
                  <td>
                    <div className=" flex items-center gap-4 ">
                      <div className=" flex items-center gap-1 hover:underline hover:cursor-pointer">
                        <MdModeEdit /> <span>Edit</span>
                      </div>
                      <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    </div>
                  </td>
                </tr>
                <tr
                  className={
                    isDark ? " text-white border-0" : "  text-black border-0"
                  }>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask  rounded-md w-12 h-12">
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
                  <td> Sweatshirts</td>
                  <td>N00.00</td>
                  <td>In Stock(500)</td>
                  <td>
                    <div className=" flex items-center gap-4 ">
                      <div className=" flex items-center gap-1 hover:underline hover:cursor-pointer">
                        <MdModeEdit /> <span>Edit</span>
                      </div>
                      <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    </div>
                  </td>
                </tr>
                <tr
                  className={
                    isDark ? " text-white border-0" : "  text-black border-0"
                  }>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask  rounded-md w-12 h-12">
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
                  <td> Sweatshirts</td>
                  <td>N00.00</td>
                  <td>In Stock(500)</td>
                  <td>
                    <div className=" flex items-center gap-4 ">
                      <div className=" flex items-center gap-1 hover:underline hover:cursor-pointer">
                        <MdModeEdit /> <span>Edit</span>
                      </div>
                      <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    </div>
                  </td>
                </tr>
                <tr
                  className={
                    isDark ? " text-white border-0" : "  text-black border-0"
                  }>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask  rounded-md w-12 h-12">
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
                  <td> Sweatshirts</td>
                  <td>N00.00</td>
                  <td>In Stock(500)</td>
                  <td>
                    <div className=" flex items-center gap-4 ">
                      <div className=" flex items-center gap-1 hover:underline hover:cursor-pointer">
                        <MdModeEdit /> <span>Edit</span>
                      </div>
                      <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" flex items-center gap-3 mt-6">
            <button
              className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}>
              1
            </button>
            <button
              className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}>
              2
            </button>
            <button
              className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}>
              3
            </button>
            <button
              className={`btn  flex gap-0  capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}>
              <IoIosArrowForward />
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    );
}

export default function AdminProducts() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div>
      <div className=" my-6">
        <span>All Products: 7 | </span>
        <span> Published: 7 | Drafts: 0 </span>
        <span>| Published: 7 | Drafts: 0</span>
      </div>
      <p className="mb-6">Last updated 03/09/2023</p>
      <ProductList />
 
    </div>
  );
}
