import AppLayout from "@/components/Layout/AppLayout";
import LoginDetails from "@/components/login/Login";
import React from "react";
import { MetaDataC } from "./orders";

export default function Login() {
  return (
    <>
      <MetaDataC title="Login" />
      <AppLayout>
        <div className=" grid grid-cols-2 sm:grid-cols-1 px-10 gap-6 my-10   h-[79dvh]">
          <div
            className="login_bg   h-[509px] w-full sm:hidden  rounded-lg flex justify-center items-center  justify-self-center self-center  "
            style={{
              backgroundImage: ` url(/assets/loginbg.png)`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backdropFilter: "blur(50px)",
            }}>
            <p className=" text-white text-center normal-case text-[24px]  font-semibold leading-8">
              Elevate your style game <br /> with Stewart Collection where
              fashion <br />
              meets passion and individuality.
            </p>
          </div>
          <LoginDetails />
        </div>
      </AppLayout>
    </>
  );
}
