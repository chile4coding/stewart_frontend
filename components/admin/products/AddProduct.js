import { ImageComponent } from "@/components/image/Imagecomponent";
import React, { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { MdModeEdit, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import namer from "color-namer";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { createProduct, getCookie } from "@/services/request";
import Spinner from "@/components/spinner/Spinner";

export default function AddProducts() {
  const [upadetPage, setUpdate] = useState(false);
  const [image, setImage] = useState({
    imageInput: "",
    name: "",
    description: "",
    productImage: "",
    price: "",
    discount: "",
    initialSize: "",
    initialColor: "",
    productId: "a",
    salesPrice: "",
    categoryId: "",
    loading: false,
  });

  const router = useRouter();
  const { shop, toggleMode, singleProduct } = useSelector(
    (state) => state.store
  );

  useEffect(() => {
     
    const isAdd = router.asPath.includes("update");

    if (isAdd) {
      setUpdate(true);
      const {
        discount,
        initial_color,
        initial_size,
        name,
        category_id,
        description,
        sales_price,
        price,
        id,
      } = singleProduct;

      setImage({
        ...image,
        price: price,
        name: name,
        description: description,
        discount: discount,
        initialColor: initial_color,
        initialSize: initial_size,
        salesPrice: sales_price,
        productId: id,
        categoryId:category_id
      });
     
    }
  }, []);

  const { isDark } = toggleMode;
  function handleImageInput(e) {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);
      setImage({ ...image, imageInput: imageURL, productImage: selectedImage });
    }
  }

  function handleProductInput(e) {
    const { name, value } = e.target;
    setImage({ ...image, [name]: value });
  }

  function isObjectNotEmpty(obj) {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined) {
        if (typeof obj[key] === "string" && obj[key].trim() === "") {
          return false; // Empty string
        } else if (Array.isArray(obj[key]) && obj[key].length === 0) {
          return false; // Empty array
        }
      } else {
        return false; // Undefined or null value
      }
    }
    return true; // Object is not empty
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const cookie = getCookie();
    if (isObjectNotEmpty(image)) {
      setImage({ ...image, loading: true });
      const response = await createProduct(image, cookie);
      if (response.status === 201) {
        toast.success("Product added successfully");

        if (upadetPage) {
          router.push("/admin/products");
        }
      } else {
        toast.error("Error server error, try again");
      }
    } else {
      toast.error("fill all the field correctly");
    }

    setImage({
      ...image,
      loading: false,
      name: "",
      description: "",
      price: "",
      discount: "",
      initialColor: "",
      initialSize: "",
      productId: "a",
      categoryId: "",
      productImage: "",
      imageInput: "",
      loading: false,
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className=" grid  grid-cols-2 sm:grid-cols-1 gap-10">
        <div>
          <div className=" my-8   ">
            <input
              type="text"
              name="name"
              value={image.name}
              onChange={handleProductInput}
              placeholder="Product Name"
              className={`input input-bordered  w-full ${
                isDark ? " bg-black border-white " : " text-black  border-black"
              }`}
            />
          </div>
          <div className=" my-8   ">
            <textarea
              rows="9"
              name="description"
              value={image.description}
              onChange={handleProductInput}
              placeholder="Product  description"
              className={` textarea  w-full ${
                isDark ? " bg-black border-white " : " text-black  border-black"
              }`}></textarea>
          </div>
        </div>

        <div
          className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
          <div className=" card-body">
            <h2
              className={
                isDark
                  ? " text-white border-b  pb-2"
                  : " border-b  text-black border-b-black pb-2"
              }>
              Product image
            </h2>
            <div className=" max-h-[250px] max-w-[250px] mx-auto my-auto">
              <img
                src={image.imageInput ? image.imageInput : "/triangledark.png"}
                className="w-full h-full bg-[#d1d1d1] rounded-lg p-3"
              />
            </div>
            <div className=" flex items-center gap-4  justify-between">
              <div className=" flex items-center gap-1 hover:underline hover:cursor-pointer relative ">
                <input
                  id="imageupload"
                  onChange={handleImageInput}
                  type="file"
                  accept="image/*"
                  className=" absolute left-[-999px] "
                />

                <label
                  htmlFor="imageupload"
                  className="flex items-center gap-2">
                  {" "}
                  <MdModeEdit />
                  Add image
                </label>
              </div>
              <div className="flex items-center gap-1  hover:cursor-pointer  hover:text-[#d73300]">
                <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                <span className=" text-[#D73300] hover:underline">
                  Remove image
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" grid  grid-cols-1 sm:grid-cols-1 gap-10">
        <div
          className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
          <div className=" card-body">
            <h2
              className={
                isDark
                  ? " text-white border-b  pb-2"
                  : " border-b  text-black border-b-black pb-2"
              }>
              {" "}
              Product Data
            </h2>
            <Accordion
              sx={{
                backgroundColor: isDark ? "#212121" : "#d1d1d1]",
                color: isDark ? "#d1d1d1" : "black",
              }}>
              <AccordionSummary
                expandIcon={
                  <MdOutlineKeyboardArrowDown
                    className={`${
                      isDark ? " text-[#d1d1d1]" : " text-[black]"
                    }`}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className=" flex justify-between items-center w-full">
                  <Typography className="text-[18px] ">Price</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className=" grid   grid-cols-3 gap-6  sm:grid-cols-1">
                  <div className=" mb-4   ">
                    <input
                      type="number"
                      placeholder="Regular price"
                      name="price"
                      value={image.price}
                      onChange={handleProductInput}
                      min={1}
                      className={`input input-bordered  w-full ${
                        isDark
                          ? " bg-black border-white "
                          : " text-black  border-black"
                      }`}
                    />
                  </div>
                  <div className=" mb-4   ">
                    <input
                      type="number"
                      name="salesPrice"
                      value={image.salesPrice}
                      onChange={handleProductInput}
                      placeholder="Sales price (optional)"
                      className={`input input-bordered  w-full ${
                        isDark
                          ? " bg-black border-white "
                          : " text-black  border-black"
                      }`}
                    />
                  </div>
                  <div className=" mb-4   ">
                    <input
                      type="number"
                      name="discount"
                      value={image.discount}
                      onChange={handleProductInput}
                      placeholder="discount"
                      className={`input input-bordered  w-full ${
                        isDark
                          ? " bg-black border-white "
                          : " text-black  border-black"
                      }`}
                    />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: isDark ? "#212121" : "#d1d1d1]",
                color: isDark ? "#d1d1d1" : "black",
              }}>
              <AccordionSummary
                expandIcon={
                  <MdOutlineKeyboardArrowDown
                    className={`${
                      isDark ? " text-[#d1d1d1]" : " text-[black]"
                    }`}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className=" flex justify-between items-center w-full">
                  <Typography className="text-[18px] ">Category</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {shop?.length > 0 &&
                  shop.map((cat) => (
                    <div
                      className=" mb-4   flex  items-center gap-2 "
                      key={cat.id}>
                      <input
                        type="radio"
                        name="categoryId"
                        onChange={handleProductInput}
                        value={cat.id}
                        id={cat.id}
                        checked={cat.id === image.categoryId && true}
                        className="radio text-white bg-white"
                      />

                      <label
                        htmlFor={cat.id}
                        className=" w-full  cursor-pointer">
                        {cat.name}
                      </label>
                    </div>
                  ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: isDark ? "#212121" : "#d1d1d1]",
                color: isDark ? "#d1d1d1" : "black",
              }}>
              <AccordionSummary
                expandIcon={
                  <MdOutlineKeyboardArrowDown
                    className={`${
                      isDark ? " text-[#d1d1d1]" : " text-[black]"
                    }`}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className=" flex justify-between items-center w-full">
                  <Typography className="text-[18px] ">Size</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className=" mb-4   ">
                  <input
                    type="text"
                    name="initialSize"
                    value={image.initialSize}
                    onChange={handleProductInput}
                    placeholder="e.g sm, m, lg, xl, 2xl"
                    min={1}
                    className={`input input-bordered  w-full ${
                      isDark
                        ? " bg-black border-white "
                        : " text-black  border-black"
                    }`}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: isDark ? "#212121" : "#d1d1d1]",
                color: isDark ? "#d1d1d1" : "black",
              }}>
              <AccordionSummary
                expandIcon={
                  <MdOutlineKeyboardArrowDown
                    className={`${
                      isDark ? " text-[#d1d1d1]" : " text-[black]"
                    }`}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className=" flex justify-between items-center w-full">
                  <Typography className="text-[18px] ">Color</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className=" grid grid-cols-3 sm:grid-cols-1 gap-8">
                  <div className=" mb-4   ">
                    <input
                      type="text"
                      name="initialColor"
                      value={image.initialColor}
                      onChange={handleProductInput}
                      placeholder="enter cloth color"
                      className={`input input-bordered  w-full ${
                        isDark
                          ? " bg-black border-white "
                          : " text-black  border-black"
                      }`}
                    />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-center mb-6">
        <button
          className={`  btn  shadow-md   capitalize sm:my-4   mx-auto ${
            isDark
              ? "hover:border-white hover:bg-black hover:text-white"
              : " bg-black text-white hover:border-black "
          }`}>
          {image.loading && upadetPage && "Updating Product"}
          {image.loading && !upadetPage && "Adding Product"}
          {image.loading && !upadetPage && <Spinner />}
          {image.loading && upadetPage && <Spinner />}
          {!image.loading && upadetPage && "Update Product"}
          {!image.loading && !upadetPage && "Add Product"}
        </button>
      </div>
    </form>
  );
}
