import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import  { useRouter,  } from "next/router";
import { useSelector } from "react-redux";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  minWidth: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius:"10px",
  color:"black",
  alignText:"center",
  p: 4,
};

export default function LogoutModal({handleOpen, open}) {
         const isDark = useSelector((state) => state.store.toggleMode.isDark);


  return (
    <div className=" card">
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h2 className=" text-center font-bold lg:text-[24px] xl:text-[24px]"> Logout? </h2>

          <p className="  text-center normal-case my-2 lg:text-[18px] xl:text-[18px] leading-6">
            Are you sure you want to log out? You won’t be able to access your
            dashboard
          </p>

          <div className=" flex justify-center items-center gap-4 mt-6">
            <button onClick={handleOpen}
              className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px] bg-black text-white hover:border-black `}>
             Cancel
            </button>
            <button
              className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  bg-black text-white hover:border-black`}>
              Log out 
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
