import Spinner from "@/components/spinner/Spinner";
import { loginAdmin } from "@/services/request";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export default function AdminLogin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    loading: false,
  });
  const router = useRouter();

  function handleCreateAccountNav() {
    router.replace("/admin/signup");
  }

  function handleForgottenPassword() {
    router.push("/forgotten-password");
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user.email.includes("@") || user.password.length < 1) {
      toast.error("please filll in all fieds");
      return;
    }

    const userDetail = JSON.stringify({
      email: user.email,
      password: user.password,
    });

    setUser({ ...user, loading: true });
    const response = await loginAdmin(userDetail);

    if (response.status === 200) {
      toast.success("Loggin successfully registered");
      const data = response.data;
      Cookies.set("_stewart_collection_token", data.token);
      router.push("/admin/home");
    } else {
      toast.error("Login failed");
    }
    setUser({ ...user, loading: false });
  }

  return (
    <div className=" flex flex-col justify-center text-black">
      <h2 className="text-center text-[18px] font-semibold text-black">
        Welcome to admin login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="my-6">
          <input
            type="email"
            text-black
            placeholder="Email"
            onChange={handleInputChange}
            name="email"
            value={user.email}
            className={`input input-bordered  w-full `}
          />
        </div>
        <div className="my-6">
          <input
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            name="password"
            value={user.password}
            className={`input input-bordered  w-full  text-black `}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <input type="checkbox" />{" "}
            <span className=" normal-case">Remember me</span>
          </div>

          <span className={` cursor-pointer hover:underline text-[blue] `}>
            Forgot password?
          </span>
        </div>
        <button
          className={`my-6 btn  btn-outline border normal-case    px-8 py-4 w-full `}>
          {!user.loading && " Login"}
          {user.loading && " Logging in"}
          {user.loading && <Spinner />}
        </button>
      </form>
      <div>
        <p className="text-center normal-case">
          Don’t have an account?{" "}
          <span
            className={` cursor-pointer hover:underlin normal-casee text-[blue]`}
            onClick={handleCreateAccountNav}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}
