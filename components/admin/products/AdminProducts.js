import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CategoryModal from "./CategoryModal";
import { getSingleProduct, storeGetProducts } from "@/redux/storeSlice";
import { deleteProduct, getCookie, getShopProducts } from "@/services/request";
import Cookies from "js-cookie";
import toast from "react-hot-toast";


function ProductList({ products }) {
  const [showcategoryModal, setCategoryModal] = useState(false);

  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  const dispatch =  useDispatch()
  const router = useRouter();

  function handleNavigation(id, productId) {
   dispatch(getSingleProduct(productId))
    router.push(`/admin/products/${id}`);
  }
  function handleProductDetailsNavigation(id, productId) {
   dispatch(getSingleProduct(productId))
    router.push(`/admin/products/${id}`);
  }

  function handleShowCategoryModal() {
    setCategoryModal(true);
  }
  function handleCloseCategoryModal() {
    setCategoryModal(false);
  }
async function handleDeleteProduct(id){
const cookie = getCookie()

const response= await deleteProduct( id, cookie)

if(response.status===200){
const products = await getShopProducts()
  if (products) {
    dispatch(storeGetProducts(products.products));
  }
  toast.success("product deleted successfully")

}



}
  return (
    <div
      className={`  pb-3 mb-6  rounded-md ${
        isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
      }`}>
      {showcategoryModal && (
        <CategoryModal handleCloseCategoryModal={handleCloseCategoryModal} />
      )}

      <div
        className={` card-body overflow-x-auto mb-6  rounded-md ${
          isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
        }`}>
        <div className=" flex justify-between items-center">
          <h2 className=" lg:text-[18px] xl:text-[18px] font-semibold">
            Product List
          </h2>
          <div className=" flex  gap-4">
            <button
              className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}
              onClick={handleShowCategoryModal}>
              + New Category
            </button>
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
        </div>

        {products.length > 0 ? (
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
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={
                      isDark ? " text-white border-0" : "  text-black border-0"
                    }>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask  rounded-md w-12 h-12">
                            <img
                              src={product.image}
                              alt="Avatar Tailwind CSS Component"
                              className=" w-full h-full bg-white"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td> {product?.categoryName}</td>
                    <td>{product?.price}</td>
                    <td>In Stock {product?.size?.color?.length || 1}</td>
                    <td>
                      <div className=" flex items-center gap-4 ">
                        <div
                          className=" flex items-center gap-1 hover:underline hover:cursor-pointer"
                          onClick={handleNavigation.bind(
                            this,
                            "update",
                            product.id
                          )}>
                          <MdModeEdit /> <span>Edit</span>
                        </div>
                        <AiFillCloseSquare
                          className=" text-xl hover:cursor-pointer"
                          onClick={handleDeleteProduct.bind(this, product.id)}
                        />
                        <h2
                          className="hover:underline hover:cursor-pointer"
                          onClick={handleProductDetailsNavigation.bind(
                            this,
                            "details",
                            product.id
                          )}>
                          Details
                        </h2>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className=" h-[50vh] flex justify-center  items-center">
            <h2>No product added </h2>
          </div>
        )}

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
  const { shop, toggleMode, products } = useSelector((state) => state.store);
  const { isDark } = toggleMode;

  return (
    <div>
      <div className=" my-6">
        <span>All Products: 7 | </span>
        <span> Published: 7 | Drafts: 0 </span>
        <span>| Published: 7 | Drafts: 0</span>
      </div>
      <p className="mb-6">Last updated 03/09/2023</p>

      {<ProductList products={products} />}
    </div>
  );
}
