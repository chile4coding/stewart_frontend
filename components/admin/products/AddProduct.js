import { ImageComponent } from "@/components/image/Imagecomponent";
import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { MdModeEdit, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

export default function AddProducts() {
        const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <form>
      <div className=" grid  grid-cols-2 sm:grid-cols-1 gap-10">
        <div>
          <div className=" my-8   ">
            <input
              type="text"
              placeholder="Country/Region"
              className={`input input-bordered  w-full ${
                isDark ? " bg-black border-white " : " text-black  border-black"
              }`}
            />
          </div>
          <div className=" my-8   ">
            <textarea
              rows="4"
              placeholder="Product short description"
              className={` textarea  w-full ${
                isDark ? " bg-black border-white " : " text-black  border-black"
              }`}></textarea>
          </div>
          <div className=" my-8   ">
            <textarea
              rows="5"
              color="5"
              placeholder="Product long description"
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
                src="/triangledark.png"
                className="w-full h-full bg-[#d1d1d1] rounded-lg p-3"
              />
            </div>
            <div className=" flex items-center gap-4  justify-between">
              <div className=" flex items-center gap-1 hover:underline hover:cursor-pointer">
                <MdModeEdit /> <span>Edit</span>
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

      <div className=" grid  grid-cols-2 sm:grid-cols-1 gap-10">
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
                <div className=" mb-4   ">
                  <input
                    type="text"
                    placeholder="Regular price"
                    className={`input input-bordered  w-full ${
                      isDark
                        ? " bg-black border-white "
                        : " text-black  border-black"
                    }`}
                  />
                </div>
                <div className=" mb-4   ">
                  <input
                    type="text"
                    placeholder="Sales price (optional)"
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
                  <Typography className="text-[18px] ">
                    Schedule sales price dates
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className=" ">
                  <div className=" mb-4   ">
                    <label className=" w-full">From</label>
                    <input
                      type="date"
                      placeholder="Surname"
                      className={`input input-bordered  w-full  ${
                        isDark
                          ? " bg-black border-white nput  "
                          : " text-black  border-black"
                      }`}
                    />
                  </div>
                  <div className=" mb-4   ">
                    <label>To</label>
                    <input
                      type="date"
                      placeholder="Surname"
                      className={`input input-bordered  w-full ${
                        isDark
                          ? " bg-black border-white nput  "
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
                  <Typography className="text-[18px] ">Inventory</Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className=" mb-4   ">
                  <input
                    type="number"
                    placeholder="Stock qantity"
                    className={`input input-bordered  w-full ${
                      isDark
                        ? " bg-black border-white "
                        : " text-black  border-black"
                    }`}
                  />
                </div>
                <div className=" mb-4   ">
                  <input
                    type="text"
                    placeholder="Sales price (optional)"
                    className={`input input-bordered  w-full ${
                      isDark
                        ? " bg-black border-white "
                        : " text-black  border-black"
                    }`}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </form>
  );
}
