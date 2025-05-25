import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import SizeModal from "./SizeModal";
import {
  getColors,
  getSingleProduct,
  getSingleProductColor,
  getSizes,
  storeGetProducts,
} from "@/redux/storeSlice";
import {
  deleteColor,
  getCookie,
  getProductColors,
  getShopProducts,
} from "@/services/request";
import toast from "react-hot-toast";

const { useRouter } = require("next/router");
const { useSelector, useDispatch } = require("react-redux");

function SingleProductList() {
  const [showcategoryModal, setCategoryModal] = useState(false);
  const [productColortable, setProductColorTable] = useState(null);

  const { shop, toggleMode, singleProduct } = useSelector(
    (state) => state.store
  );

  const dispatch = useDispatch();
  const { isDark } = toggleMode;
  const router = useRouter();
  useEffect(() => {
    if (singleProduct) {
      dispatch(getSizes(singleProduct?.size));
    }
    const cookie = getCookie();
    async function update() {
      const products = await getShopProducts({
        search: "",
        count: 200,
        page: 1,
        filter: "",
      });

      dispatch(storeGetProducts(products?.products));
      const product = await getProductColors();
      dispatch(getSingleProduct(singleProduct?.id));
      if (product) {
        dispatch(getColors(product?.colors));
      }
    }

    update();

    async function getColor() {
      const data = await getProductColors();
      if (data) {
        setProductColorTable((prev) => data?.colors);

        dispatch(getColors(data?.colors));
      }
    }

    getColor();
  }, []);

  async function handleNavigation(id, productId) {
    const product = await getProductColors();

    dispatch(getColors(product.colors));

    if (productId) {
      dispatch(getSingleProductColor(productId));
    }
    router.push(`/admin/products/colors/${id}`);
  }
  async function handleNavigationProduct(id, productId) {
    const product = await getProductColors();

    dispatch(getColors(product.colors));
    dispatch(getSingleProduct(productId));
    router.push(`/admin/products/${id}`);
  }

  function handleShowCategoryModal() {
    setCategoryModal(true);
  }
  function handleCloseCategoryModal() {
    setCategoryModal(false);
  }

  async function handleDeleteProduct(id) {
    const cookie = getCookie();

    const response = await deleteColor(id, cookie);

    if (response.status === 200) {
      const products = await getShopProducts({
        search: "",
        count: 200,
        page: 1,
        filter: "",
      });

      dispatch(storeGetProducts(products.products));
      const product = await getProductColors();
      dispatch(getSingleProduct(singleProduct.id));
      if (product) {
        dispatch(getColors(product.colors));
      }
      toast.success("product deleted successfully");
    }
  }

  return (
    <div
      className={` h-[100vh]  pb-3 mb-6  rounded-md ${
        isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
      }`}>
      {showcategoryModal && (
        <SizeModal
          productId={singleProduct?.id}
          handleCloseCategoryModal={handleCloseCategoryModal}
        />
      )}

      <div
        className={` card-body overflow-x-auto mb-6  rounded-md ${
          isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
        }`}>
        <div className=" flex justify-between items-center">
          <h2 className=" lg:text-[18px] xl:text-[18px] font-semibold">
            {singleProduct?.name} List
          </h2>
          <div className=" flex  gap-4">
            <button
              className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}
              onClick={handleShowCategoryModal}>
              + New Size
            </button>
            <button
              onClick={handleNavigation.bind(this, "add", singleProduct?.id)}
              className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}>
              + New Color
            </button>
          </div>
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
                <th>Size</th>
                <th>Color</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                <tr
                  className={
                    isDark ? " text-white border-0" : "  text-black border-0"
                  }>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask  rounded-md w-12 h-12">
                          <img
                            src={singleProduct?.image}
                            alt="Avatar Tailwind CSS Component"
                            className=" w-full h-full bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold normal-case">
                          {singleProduct?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td> {singleProduct?.categoryName}</td>
                  <td>₦{singleProduct?.price}</td>
                  <td className="  lowercase">{singleProduct?.initial_size}</td>
                  <td className="  lowercase">
                    {singleProduct?.initial_color}
                  </td>

                  <td>
                    <div className=" flex items-center gap-4 ">
                      <div
                        className=" flex items-center gap-1 hover:underline hover:cursor-pointer"
                        onClick={handleNavigationProduct.bind(
                          this,
                          "update",
                          singleProduct?.id
                        )}>
                        <MdModeEdit /> <span>Edit</span>
                      </div>
                      <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    </div>
                  </td>
                </tr>
              }

              {singleProduct?.size?.length > 0 &&
                singleProduct?.size.map((size) =>
                  size?.colors.map((color) => (
                    <tr
                      className={
                        isDark
                          ? " text-white border-0"
                          : "  text-black border-0"
                      }>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask  rounded-md w-12 h-12">
                              <img
                                src={color?.image}
                                alt="Avatar Tailwind CSS Component"
                                className=" w-full h-full bg-white"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold normal-case">
                              {color?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className=" normal-case">
                        {" "}
                        {singleProduct?.categoryName}
                      </td>
                      <td className=" normal-case">₦{color?.price}</td>
                      <td className=" normal-case">{size?.name}</td>
                      <td className=" normal-case">{color?.name}</td>
                      <td>
                        <div className=" flex items-center gap-4 ">
                          <div
                            className=" flex items-center gap-1 hover:underline hover:cursor-pointer"
                            onClick={handleNavigation.bind(
                              this,
                              "update_color",
                              color.id
                            )}>
                            <MdModeEdit /> <span>Edit</span>
                          </div>
                          <AiFillCloseSquare
                            onClick={handleDeleteProduct.bind(this, color?.id)}
                            className=" text-xl hover:cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
        {/* <div className=" flex items-center gap-3 mt-6">
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
        </div> */}
      </div>
    </div>
  );
}

export default function ProductColor() {
  return (
    <div>
      <SingleProductList />
    </div>
  );
}
