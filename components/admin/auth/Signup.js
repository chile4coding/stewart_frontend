import Spinner from "@/components/spinner/Spinner";
import { signupAdmin } from "@/services/request";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function AdminSignup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    loading: false,
  });
  const router = useRouter();

  function handleCreateAccountNav() {
    router.replace("/admin");
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
    const response = await signupAdmin(userDetail);

    if (response.status === 201) {
      toast.success("Account successfully registered");
      router.push("/admin");
    } else {
      toast.error("Account registration failed");
    }
    setUser({ ...user, loading: false });
  }
  return (
    <div className=" flex flex-col justify-center text-black">
      <h2 className="text-center text-[18px] font-semibold text-black">
        Welcome to admin signup
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="my-6">
          <input
            type="email"
            text-black
            onChange={handleInputChange}
            name="email"
            value={user.email}
            placeholder="Email"
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

        <button
          className={`my-6 btn  btn-outline border normal-case    px-8 py-4 w-full `}>
          {!user.loading && " Register"}
          {user.loading && " Registering"}
          {user.loading && <Spinner />}
        </button>
      </form>

      <div>
        <p className="text-center normal-case">
          Already have an account?{" "}
          <span
            className={` cursor-pointer hover:underlin normal-casee text-[blue]`}
            onClick={handleCreateAccountNav}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
