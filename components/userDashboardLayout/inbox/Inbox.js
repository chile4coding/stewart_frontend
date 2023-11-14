import React, { useState } from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useSelector } from 'react-redux'
import {MdKeyboardArrowDown, MdOutlineKeyboardArrowDown} from "react-icons/md"
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
        <div className="collapse   border-b rounded-none">
          <input type="checkbox" />
          <div className="collapse-title  font-normal  flex justify-between pr-2 items-center">
            <div> Read comment</div>
            <span className=" justify-self-end  self-center pr-0">
              <h2 className=" opacity-50">23/2/2023</h2>
              <MdKeyboardArrowDown />
            </span>
          </div>
          <div className="collapse-content">
            <p>
              Once I have a better understanding of you, I can start to create
              content that is tailored to your specific needs. For example, I
              could write a blog post about your interests, create a social
              media profile for you, or even write a resume or cover letter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}





