import Spinner from "@/components/spinner/Spinner";
import { setUser } from "@/redux/storeSlice";
import { getCookie, getCurrentUser, updateProfile } from "@/services/request";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const { useSelector, useDispatch } = require("react-redux");

export default function ProfileUpdate() {
  const { user, toggleMode } = useSelector((state) => state.store);
  const [profile, setProfile] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    state: "",
    country: "",
    city: "",
    address: "",
    loading:false
  });
  useEffect(() => {
    const { email, phone, country, state, city, address } = user;
    const firstname = user.name.split(" ")[0];
    const lastname = user.name.split(" ")[1];
    setProfile({
      ...profile,
      email,
      firstname,
      lastname,
      phone,
      country,
      state,
      city,
      address,
    });
  }, []);

  const { isDark } = toggleMode;
  const router = useRouter();
const dispatch  =  useDispatch()
  function handleChangePassword() {
    router.push("/forgotten-password");
  }
  function handleInputChange(e) {
    const { value, name } = e.target;
    setProfile({ ...profile, [name]: value });
  }

  async function handleUpdateProfile() {
    const name = `${profile.firstname} ${profile.lastname}`;

    const token = getCookie();
    setProfile({...profile, loading:true})
    const response = await updateProfile(
      {
        email: profile.email,
        name,
        phone: profile.phone,
        country: profile.country,
        state: profile.state,
        city: profile.city,
        address: profile.address,
      },
      token
    );
    const data = await response.json()
    if(response.status === 200){
       const response = await getCurrentUser(token);
       const user = await response.json();
       dispatch(setUser(user?.user));
      toast.success(<p className=" normal-case">Profile updated successfully</p>);
    }else{
      toast.error(<p className=" normal-case text-[red]">{data.message}</p>);
    }
    setProfile({ ...profile, loading: false });
   
  }
  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2 className={`mb-3  pb-1`}>Profile Details</h2>

        <div className="grid  grid-cols-2 gap-4 sm:grid-cols-1">
          <div className="">
            <label className={isDark ? "active_label" : ""}>First Name</label>
            <input
              type="text"
              name="firstname"
              onChange={handleInputChange}
              placeholder="First Name"
              value={profile.firstname}
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
              name="lastname"
              onChange={handleInputChange}
              value={profile.lastname}
              placeholder="Surname"
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
            name="email"
            onChange={handleInputChange}
            value={profile.email}
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
            name="phone"
            onChange={handleInputChange}
            value={profile.phone}
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>Country</label>
          <input
            type="text"
            name="country"
            onChange={handleInputChange}
            value={profile.country}
            placeholder=""
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>State</label>
          <input
            type="text"
            name="state"
            onChange={handleInputChange}
            value={profile.state}
            placeholder=""
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
            name="city"
            onChange={handleInputChange}
            value={profile.city}
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>Address</label>
          <input
            type="text"
            name="address"
            onChange={handleInputChange}
            placeholder=""
            value={profile.address}
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>

        <div className="flex justify-evenly  gap-8">
          <button
            className={`  btn  shadow-md   capitalize sm:my-4  flex-1   ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black "
            }`}
            onClick={handleChangePassword}>
            Change Password
          </button>
          <button
            onClick={handleUpdateProfile}
            className={`  btn  shadow-md   capitalize sm:my-4 flex-1   ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black "
            }`}>
            Update Profile {profile.loading && <Spinner/>}
          </button>
        </div>
      </div>
    </div>
  );
}
