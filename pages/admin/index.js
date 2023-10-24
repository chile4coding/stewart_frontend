import AdminLogin from '@/components/admin/auth/Login';
import AdminSignup from '@/components/admin/auth/Signup'
import React from 'react'

export default function Login() {
  return (
    <div className=" grid grid-cols-2 sm:grid-cols-1 px-10 gap-6  h-[100vh] bg-[#dbd9d9]">
      <div
        className="login_bg  self-center max-w-[588px] h-[509px] w-full sm:hidden  rounded-lg flex justify-center items-center   "
        style={{
          backgroundImage: ` url(/assets/loginbg.png)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backdropFilter: "blur(90px)",
        }}>
        <p className=" text-white text-center normal-case text-[24px]  font-semibold leading-8">
          Elevate your style game <br /> with Stewart Collection where fashion{" "}
          <br />
          meets passion and individuality.
        </p>
      </div>
      
      <AdminLogin/>
    </div>
  );
}
