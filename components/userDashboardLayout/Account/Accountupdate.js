import Spinner from "@/components/spinner/Spinner";
import {
  fundWallet,
  getCookie,
  uploadToCloudinary,
  userImageUpload,
  getCurrentUser,
} from "@/services/request";
import { setUser } from "@/redux/storeSlice";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

function ProfileCard() {
  const { user, toggleMode } = useSelector((state) => state.store);

  const isDark = toggleMode?.isDark;
  const [image, setImage] = useState({
    img: "",
    avatar: null,
    loading: false,
  });
  const [token, setToken] = useState(null);
  const dispatch  = useDispatch()

  useEffect(() => {
    const token = getCookie();
    setToken(token);
    if (user) {
      setImage({
        ...image,
        img: user?.avatar,
      });
    }
  }, []);
  function handleImageInput(e) {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);
      setImage({
        ...image,
        img: imageURL,
        avatar: selectedImage,
      });
    }
  }

  async function handleImageUpload() {
    const formData = new FormData();
    formData.append("upload_preset", "stewart");
    formData.append("file", image.avatar);

    setImage({ ...image, loading: true });
    const uploadImage = await uploadToCloudinary(formData);
    if (uploadImage?.url) {
      const response = await userImageUpload(uploadImage.url, token);
    
    const data = response.json();
    if (response.status === 200) {
        const response = await getCurrentUser(token);
        const user = await response.json();
        dispatch(setUser(user?.user));
      toast.success(<div className=" normal-case">profile picture updated successfully</div>);
    } else {
      toast.error(
        <div className=" normal-case">An error occurred</div>
      );
    }
  }
    
    setImage({ ...image, loading: false, avatar: null });
  }

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body flex flex-col  items-center">
        <label htmlFor="user" className=" cursor-pointer  h-[100px] ">
          <img
            src={
              image.img
                ? image.img
                : image.avatar
                ? image.avatar
                : "/unisex.jpg"
            }
            className=" bg-[white]  rounded-full  object-cover h-[100px] w-[100px]"
          />
        </label>

        <input
          onChange={handleImageInput}
          id="user"
          type="file"
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={handleImageUpload}
          disabled={!image.avatar}
          className=" cursor-pointer btn font-thin border-none  my-4 mb-2  btn-sm normal-case bg-[#1e9c3d] text-[white]">
          update {image.loading && <Spinner/>}
        </button>
      </div>
    </div>
  );
}

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

  // const { isDark } = toggleMode;

  const isDark = toggleMode?.isDark;

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
      const data = await response.json();
      if (response.status === 200) {
        window.location.href = data?.data;
      }
    }
    setPayment({ ...payment, loading: false, amount: "" });
    setPayBtn((prev) => false);
  }

  function handleCancelPayment() {
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
              ₦{user?.wallet?.amount?.toFixed(2)}
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

  const isDark = toggleMode?.isDark;

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

  // const { isDark } = toggleMode;

  const isDark = toggleMode?.isDark;

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
      <ProfileCard />
      <Wallet />
      <AccountInfo />
      <ShippingInfo />
    </div>
  );
}
