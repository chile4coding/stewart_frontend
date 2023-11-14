import Spinner from "@/components/spinner/Spinner";
import { fundWallet, getCookie } from "@/services/request";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Wallet() {
  const { user, toggleMode } = useSelector((state) => state.store);

  const [payment, setPayment] = useState({
    amount: "",
    loading: "",
    tokenN: "",
  });
  const [paybtn, setPayBtn] = useState(false);
  useEffect(() => {
    const token = getCookie();

    setPayment({ ...payment, tokenN: token });
  }, []);

  const { isDark } = toggleMode;

  function handlePayBtn() {
    setPayBtn((prev) => true);
  }
  function handlePay() {}

  function handleInput(e) {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  }

  async function handlepayment() {
    const { email, name } = user;

    if (!Boolean(payment.amount.trim())) {
      toast.error("Fill in amount");
      return;
    }
    if (payment?.tokenN) {
      setPayment({ ...payment, loading: true });
      const response = await fundWallet(
        { email: email, name: name, amount: Number(payment.amount) },
        payment.tokenN
      );
      const data =await  response.json();
      if (response.status === 200) {
        window.location.href = data?.data
      }
    }
    setPayment({ ...payment, loading: false, amount:"" });
    setPayBtn((prev) => false);
  }

  function handleCancelPayment(){
    setPayBtn((prev) => false);
  }

  return (
    <>
      <div
        className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
        <div className=" card-body">
          <h2 className="mb-3">Wallet Balance</h2>

          <div className="flex  justify-between items-center flex-wrap">
            <h2 className="lg:text-[30px] xl:text-[30px] lg:font-semibold xl:font-semibold">
              ₦{user?.wallet?.amount.toFixed(2)}
            </h2>
            {!paybtn && (
              <button
                onClick={handlePayBtn}
                className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                  isDark
                    ? "hover:border-white hover:bg-black hover:text-white"
                    : " bg-black text-white hover:border-black"
                }`}>
                Fund Account
              </button>
            )}
          </div>

          {paybtn && (
            <div className="my-6">
              <input
                value={payment.amount}
                type="number"
                placeholder="Amount"
                required
                name="amount"
                onChange={handleInput}
                className={`input input-bordered  w-full  ${
                  isDark
                    ? " bg-black border-white "
                    : " text-black  border-black"
                }`}
              />
              <button
                onClick={handleCancelPayment}
                className={`btn  shadow-md  mt-3   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                  isDark
                    ? "hover:border-white hover:bg-black hover:text-white"
                    : " bg-black text-white hover:border-black"
                }`}>
                {" "}
                cancel
              </button>

              {paybtn && (
                <button
                  onClick={handlepayment}
                  className={`btn  shadow-md  ml-4  capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                    isDark
                      ? "hover:border-white hover:bg-black hover:text-white"
                      : " bg-black text-white hover:border-black"
                  }`}>
                  {payment.loading ? <Spinner /> : "Fund"}{" "}
                 
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
function AccountInfo() {
  const { user, toggleMode } = useSelector((state) => state.store);

  const { isDark } = toggleMode;
  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2
          className={`mb-3 border-b pb-1 ${
            isDark ? " border-b-white" : " border-black"
          }`}>
          Account Information
        </h2>

        <div className=" flex gap-5 sm:mb-3 lg:mb-3 xl:mb-3 flex-wrap">
          <h2>Name</h2>
          <h2>{user?.name}</h2>
        </div>
        <div className=" flex gap-5 flex-wrap">
          <h2>Email</h2>
          <h2 className="   break-all   normal-case md:text-sm">
            {user?.email}
          </h2>
        </div>
      </div>
    </div>
  );
}
function ShippingInfo() {
  const { user, toggleMode } = useSelector((state) => state.store);

  const { isDark } = toggleMode;
  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2
          className={`mb-3 border-b pb-1 ${
            isDark ? " border-b-white" : " border-black"
          }`}>
          Shipping Information
        </h2>

        <div className=" flex gap-5 sm:mb-3 lg:mb-3 xl:mb-3 flex-wrap">
          <h2>Phone:</h2>
          <h2 className=" lowercase">
            {user?.phone ? user?.phone : "Add phone number"}
          </h2>
        </div>
        <div className=" flex gap-5 ">
          <h2>Address</h2>
          <h2 className="    normal-case md:text-sm">
            {user?.address ? user?.address : "Add address"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default function Accountupdate() {
  return (
    <div className="  ">
      <Wallet />
      <AccountInfo />
      <ShippingInfo />
    </div>
  );
}
