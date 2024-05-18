import React, { useEffect, useState } from "react";
import { BiMessage } from "react-icons/bi";
import { GrLocationPin } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import {
  getAdmin,
  getCookie,
  updateAdmin,
  updateAdminPics,
  uploadToCloudinary,
} from "@/services/request";
import { setAdmin } from "@/redux/storeSlice";
import Spinner from "@/components/spinner/Spinner";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

function ProfileCard() {
  const { shop, toggleMode, products, admin } = useSelector(
    (state) => state.store
  );
  const isDark = toggleMode?.isDark;
  const [image, setImage] = useState({
    img: "",
    avatar: null,
    loading: false,
    upload: false,
  });
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie();
    setToken(token);
    if (admin) {
      setImage({
        ...image,
        img: admin?.avatar_url,
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
        upload: true,
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
      const response = await updateAdminPics(uploadImage.url, token);

      const data = response.json();

      if (response.status === 200) {
        const resA = await getAdmin(token);
        const dataA = await resA.json();

        dispatch(setAdmin(dataA?.admin));
        toast.success(
          <div className=" normal-case">
            profile picture updated successfully
          </div>
        );
      } else {
        toast.error(<div className=" normal-case">An error occurred</div>);
      }
    }

    setImage({ ...image, loading: false, avatar: null, upload: false });
  }

  function signOut() {
    Cookies.remove("_stewart_collection_token");
    window.location.href = "/admin";
  }
  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body flex flex-col  items-center">
        <div className=" max-h-[100px] max-w-[100px] ">
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
          />{" "}
        </div>
        {image.upload ? (
          <button
            onClick={handleImageUpload}
            className=" cursor-pointer  btn font-thin border-none  my-4 mb-2  btn-sm normal-case bg-[#1e9c3d] text-[white]">
            upload {image.loading && <Spinner />}
          </button>
        ) : (
          <button className=" pointer-events-none btn font-thin border-none  my-4 mb-2  btn-sm normal-case bg-[#1e9c3d] text-[white]">
            {" "}
            Admin
          </button>
        )}

        <p className=" font-thin opacity-40  text-[12px] italic">
          Last visit {admin?.last_login}
        </p>

        <button
          onClick={signOut}
          className={` cursor-pointer  btn  btn-outline border normal-case   btn-sm   ${
            isDark
              ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
              : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
          }`}>
          Log out
        </button>
      </div>
    </div>
  );
}
function ProfileInfoCard() {
  const { shop, toggleMode, products, admin } = useSelector(
    (state) => state.store
  );
  const isDark = toggleMode?.isDark;

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body ">
        <h2>Profile Information</h2>
        <div className=" flex gap-3 items-center my-2">
          <MdEmail />
          <span className=" normal-case break-all flex flex-wrap">
            {admin?.email}
          </span>
        </div>
        <div className=" flex gap-3 items-center">
          <IoLocationSharp />
          <span className=" normal-case break-all flex flex-wrap">
            {admin?.name} {admin?.state}, {admin?.country}
          </span>
        </div>
        <div className=" flex gap-3 items-center my-2">
          <BsFillTelephoneFill />
          <span className=" normal-case break-all flex flex-wrap">
            {admin?.phone_number}
          </span>
        </div>
      </div>
    </div>
  );
}
function ProfileInfoForm() {
  const { shop, toggleMode, products, admin } = useSelector(
    (state) => state.store
  );
  const isDark = toggleMode?.isDark;
  const [token, setToken] = useState(null);

  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    state: "",
    city: "",
    phone: "",
    country: "",
    email: "",
    loading: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie();
    setToken(token);

    setDetails({
      ...details,
      firstName: admin?.first_name,
      lastName: admin?.last_name,
      state: admin?.state,
      city: admin?.name,
      country: admin?.country,
      email: admin?.email,
      phone: admin?.phone_number,
    });
  }, []);

  function handleInputChange(e) {
    const { value, name } = e.target;
    setDetails({ ...details, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setDetails({ ...details, loading: true });

    const response = await updateAdmin(details, token);
    const data = await response.json();
    if (response.status === 200) {
      const resA = await getAdmin(token);
      const dataA = await resA.json();
      dispatch(setAdmin(dataA?.admin));
      toast.success(
        <div className=" normal-case">Profile update successfully</div>
      );
    } else {
      toast.error(<div className=" normal-case">{data.message}</div>);
    }

    setDetails({ ...details, loading: false });
  }

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <form onSubmit={handleSubmit} className=" card-body ">
        <h2 className=" lg:text-[24px] font-semibold xl:text-[24px]">
          My profile details
        </h2>

        <div className="grid  grid-cols-2 gap-4 sm:grid-cols-1">
          <div className="">
            <label className={isDark ? "active_label" : ""}>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              onChange={handleInputChange}
              value={details.firstName}
              required
              name="firstName"
              className={`input input-bordered w-full max-w-xs sm:max-w-full ${
                isDark
                  ? " bg-black border-white  "
                  : " text-black  border-black"
              }`}
            />
          </div>
          <div>
            <label className={isDark ? "active_label" : ""}>Last Name</label>
            <input
              type="text"
              placeholder="Surname"
              onChange={handleInputChange}
              value={details.lastName}
              required
              name="lastName"
              className={`input input-bordered  w-full max-w-xs sm:max-w-full ${
                isDark ? " bg-black border-white " : " text-black  border-black"
              }`}
            />
          </div>
        </div>
        <div className=" my-3">
          <label className={isDark ? "active_label" : ""}>Email</label>
          <input
            type="email"
            onChange={handleInputChange}
            value={details.email}
            required
            name="email"
            placeholder="example@example.com"
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" my-3">
          <label className={isDark ? "active_label" : ""}>Phone</label>
          <input
            type="text"
            placeholder=""
            onChange={handleInputChange}
            value={details.phone}
            required
            name="phone"
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>

        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>Country</label>
          <input
            type="text"
            placeholder=""
            onChange={handleInputChange}
            value={details.country}
            required
            name="country"
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>State</label>
          <input
            type="text"
            placeholder=""
            onChange={handleInputChange}
            value={details.state}
            required
            name="state"
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>City</label>
          <input
            type="text"
            placeholder=""
            onChange={handleInputChange}
            value={details.city}
            required
            name="city"
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>

        <div className=" flex justify-center">
          <button
            className={`  btn  shadow-md   capitalize sm:my-4 mx-auto ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black "
            }`}>
            Update Profile {details.loading && <Spinner />}
          </button>
        </div>
      </form>
    </div>
  );
}
export default function AdminSettings() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getCookie();
    async function getAdminUser() {
      const response = await getAdmin(token);
      const data = await response.json();
      if (response.status === 200) {
        dispatch(setAdmin(data?.admin));
      }
    }

    getAdminUser();
  }, []);
  return (
    <>
      <div className=" grid grid-cols-3 sm:grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <ProfileCard />
          <ProfileInfoCard />
        </div>
        <div className=" lg:col-span-2 xl:col-span-2">
          <ProfileInfoForm />
        </div>
      </div>
    </>
  );
}
