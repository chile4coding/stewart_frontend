import { ImageComponent } from "@/components/image/Imagecomponent";
import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { MdModeEdit, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  createProductColor,
  createProductSize,
  getCookie,
  uploadToCloudinary,
} from "@/services/request";
import Spinner from "@/components/spinner/Spinner";

export default function AddProductColor() {
  const [image, setImage] = useState({
    imageInput: "",
    productImage: "",
    name: "",
    price: "",
    salesPrice: "",
    discount: "",
    sizeId: "",
    colorId: "a",
    loading: false,
  });
  const [update, setUpdate] = useState(false);

  const {
    shop,
    toggleMode,
    sizes,
    singleProduct,
    singleProductColor,
    productColors,
  } = useSelector((state) => state.store);

  const router = useRouter();

  const { isDark } = toggleMode;

  useEffect(() => {
    const isAdd = router.asPath.includes("update_color");

    if (isAdd) {
      setUpdate(true);
      const { discount, id, name, price, sales_price, size_id } =
        singleProductColor;
      setImage({
        ...image,
        discount,
        price,
        salesPrice: sales_price,
        sizeId: size_id,
        colorId: id,
        name,
      });
    }
  }, []);

  function handleImageInput(e) {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);

      setImage({ ...image, imageInput: imageURL, productImage: selectedImage });
    }
  }

  function handleInputChange(e) {
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
      const formData = new FormData();
      formData.append("upload_preset", "stewart");
      formData.append("file", image.productImage);

      const uploadImage = await uploadToCloudinary(formData);

      if (uploadImage?.url) {
        const response = await createProductColor(
          { ...image, productImage: uploadImage.url },
          cookie
        );

        if (response.ok) {
          toast.success("Product added successfully");
          setImage({
            ...image,
            imageInput: "",
            productImage: "",
            name: "",
            price: "",
            salesPrice: "",
            discount: "",
            sizeId: "",
            colorId: "a",
            loading: false,
          });
          if (update) {
            router.push("/admin/products/details");
          }
        } else {
          toast.error("Error server error, try again");
          setImage({ ...image, lading: false });
        }
      }
    } else {
      toast.error("fill all the field correctly");
    }
  }

  function removeImage() {
    setImage({
      ...image,
      imageInput: "",
      productImage: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className=" grid  grid-cols-2 sm:grid-cols-1 gap-10">
        <div
          className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}
        >
          <div className=" card-body">
            <h2
              className={
                isDark
                  ? " text-white border-b  pb-2"
                  : " border-b  text-black border-b-black pb-2"
              }
            >
              {" "}
              Product Data
            </h2>
            <Accordion
              sx={{
                backgroundColor: isDark ? "#212121" : "#d1d1d1]",
                color: isDark ? "#d1d1d1" : "black",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <MdOutlineKeyboardArrowDown
                    className={`${
                      isDark ? " text-[#d1d1d1]" : " text-[black]"
                    }`}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className=" flex justify-between items-center w-full">
                  <Typography className="text-[18px] ">Price</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className=" grid   grid-cols-1 gap-0  sm:grid-cols-1">
                  <div className=" mb-4   ">
                    <input
                      type="number"
                      placeholder="Regular price"
                      step="0.01"
                      onChange={handleInputChange}
                      name="price"
                      value={image.price}
                      min={0}
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
                      onChange={handleInputChange}
                      name="salesPrice"
                      value={image.salesPrice}
                      step="0.01"
                      min={0}
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
                      onChange={handleInputChange}
                      name="discount"
                      value={image.discount}
                      step="0.01"
                      min={0}
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
              }}
            >
              <AccordionSummary
                expandIcon={
                  <MdOutlineKeyboardArrowDown
                    className={`${
                      isDark ? " text-[#d1d1d1]" : " text-[black]"
                    }`}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className=" flex justify-between items-center w-full">
                  <Typography className="text-[18px] ">Size</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {(sizes.length > 0 &&
                  sizes?.map((size) => (
                    <div className=" mb-4   flex  items-center gap-2 ">
                      <input
                        type="radio"
                        name="sizeId"
                        onChange={handleInputChange}
                        className="radio text-white bg-white"
                        checked={size.id === image.sizeId ? true : false}
                        value={size.id}
                      />
                      <label className=" w-full">{size.name}</label>
                    </div>
                  ))) || (
                  <h2 className=" normal-case">Add sizes to this product</h2>
                )}
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                backgroundColor: isDark ? "#212121" : "#d1d1d1]",
                color: isDark ? "#d1d1d1" : "black",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <MdOutlineKeyboardArrowDown
                    className={`${
                      isDark ? " text-[#d1d1d1]" : " text-[black]"
                    }`}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className=" flex justify-between items-center w-full">
                  <Typography className="text-[18px] ">Color</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className=" grid grid-cols-1 sm:grid-cols-1 gap-8">
                  <div className=" mb-4   ">
                    <input
                      type="text"
                      onChange={handleInputChange}
                      name="name"
                      value={image.name}
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

        <div
          className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}
        >
          <div className=" card-body">
            <h2
              className={
                isDark
                  ? " text-white border-b  pb-2"
                  : " border-b  text-black border-b-black pb-2"
              }
            >
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
                  className="flex items-center gap-2 hover:cursor-pointer "
                >
                  {" "}
                  <MdModeEdit />
                  Add image
                </label>
              </div>
              <div
                onClick={removeImage}
                className="flex items-center gap-1  hover:cursor-pointer  hover:text-[#d73300]"
              >
                <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                <span className=" text-[#D73300] hover:underline">
                  Remove image
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full flex justify-center mb-6">
        <button
          className={`  btn  shadow-md   capitalize sm:my-4   mx-auto ${
            isDark
              ? "hover:border-white hover:bg-black hover:text-white"
              : " bg-black text-white hover:border-black "
          }`}
        >
          {image.loading && update && "Updating Product"}
          {image.loading && !update && "Adding Product"}
          {image.loading && !update && <Spinner />}
          {image.loading && update && <Spinner />}
          {!image.loading && update && "Update Product"}
          {!image.loading && !update && "Add Product"}
        </button>
      </div>
    </form>
  );
}
