import AppLayoout from "@/components/Layout/AppLayoout";
import { ImageComponent } from "@/components/image/Imagecomponent";
import LoginDetails from "@/components/login/Login";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { MetaDataC } from "./orders";

export default function Login() {

  return (
    <>

<MetaDataC title="Login"/>
    <AppLayoout>
      <div className=" grid grid-cols-2 sm:grid-cols-1 px-10 gap-6 my-10">
        <div
          className="login_bg  max-w-[588px] h-[509px] w-full sm:hidden  rounded-lg flex justify-center items-center   "
          style={{
            backgroundImage: ` url(/assets/loginbg.png)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backdropFilter: "blur(50px)",
          }}>
          <p className=" text-white text-center normal-case text-[24px]  font-semibold leading-8">
            Elevate your style game <br /> with Stewart Collection where fashion{" "}
            <br />
            meets passion and individuality.
          </p>
        </div>
        <LoginDetails />
      </div>
    </AppLayoout>
    </>
  );
}
