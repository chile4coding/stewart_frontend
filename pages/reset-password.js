import AppLayoout from '@/components/Layout/AppLayoout';
import { useRouter } from 'next/router';
import React from 'react'
import { useSelector } from 'react-redux';
function ResetPasswordform() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router = useRouter();

  function handleCreateAccountNav() {
    router.replace("/signup");
  }

  function handleSuccessfulReset() {
    router.push("/reset-successful");
  }

  return (
    <div className=" max-w-[588px] mx-auto my-auto">
      <h2 className=" text-center  xl:text-[36px] lg:text-[36px]  font-semibold normal-case opacity-50">
        Reset password{" "}
      </h2>

      <div className="my-6  w-full  ">
        <input
          type="password"
          placeholder="New password"
          className={`input input-bordered w-full   ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>
      <div className="my-6  w-full  ">
        <input
          type="password"
          placeholder="Confirm password"
          className={`input input-bordered w-full   ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>

      <button
        className={`my-6  btn  btn-outline border normal-case  w-full   px-8 py-4  ${
          isDark
            ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
            : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
        }`}
        onClick={handleSuccessfulReset}>
        Submit
      </button>
    </div>
  );
}

export default function ResetPassowrd() {

        const isDark = useSelector((state) => state.store.toggleMode.isDark);
  return (
    <AppLayoout>
      <main className={`px-4 py-12 ${isDark ? "" : "bg-[#D1D1D1] "}   `}>
        <div className="   px-10 gap-6 py-10">
          <ResetPasswordform />
        </div>
      </main>
    </AppLayoout>
  );
}
