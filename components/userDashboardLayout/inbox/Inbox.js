import React, { useState } from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useSelector } from 'react-redux'
import {MdOutlineKeyboardArrowDown} from "react-icons/md"
import { BsFillChatSquareQuoteFill } from 'react-icons/bs';


export function NoInbox(){
    const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className="w-full  flex flex-col justify-center items-center h-[88vh] ">
      <div className="comment p-1">
        <BsFillChatSquareQuoteFill className=" text-2xl text-[#0d58af]" />
      </div>

      <h2 className=" lg:text-[24px] xl:text-[24px] font-semibold mt-6 mb-2">
       No messages
      </h2>
      <p className=" mb-6 text-center">Your messages will appear here.</p>

   
    </div>
  );
}

export default function Inbox() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div
      className={` p-4 h-[88dvh] overflow-y-scroll mb-6 card ${
        isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
      }`}>
      <div className=" card-body">
        <Accordion
          sx={{
            backgroundColor: isDark ? "#212121" : "#d1d1d1]",
            color: isDark ? "#d1d1d1" : "black",
          }}>
          <AccordionSummary
            expandIcon={
              <MdOutlineKeyboardArrowDown
                className={`${isDark ? " text-[#d1d1d1]" : " text-[black]"}`}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header">
            <div className=" flex justify-between items-center w-full">
              <Typography className="text-[18px] font-semibold">
                Your order
              </Typography>
              <h2 className="mr-4">23/10/2023</h2>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <h2 className=" text-[16px] leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </h2>
            <h2 className=" text-[16px] leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </h2>
            <h2 className=" text-[16px] leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </h2>
            <h2 className=" text-[16px] leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </h2>
          </AccordionDetails>
        </Accordion>
    
      </div>
    </div>
  );
}





