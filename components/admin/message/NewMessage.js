import Spinner from "@/components/spinner/Spinner";
import {  handleGetMessages } from "@/redux/storeSlice";
import { adminMessages, getCookie, sendMessage } from "@/services/request";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function NewMessage() {
  const { shop, toggleMode, singleProduct } = useSelector(
    (state) => state.store
  );
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [details, setDetails] = useState({
    title: "",
    message: "",
    loading: false,
  });
  const dispatch  = useDispatch()
  const { isDark } = toggleMode;
  useEffect(() => {
    const token = getCookie();
    setToken(token);
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!Boolean(details.message) && !Boolean(details.name)) {
      toast.error(<div className=" normal-case">Please fill all fields</div>);
      return;
    }

    setDetails({ ...details, loading: true });
    const response = await sendMessage(details, token);
    const data = await response.json();
    if (response.status === 200) {
       const res = await adminMessages(token);
       const dataA = await res.json();

       dispatch(handleGetMessages(dataA.messages));
      toast.success(<div className=" normal-case">{data.message}</div>);
      router.push("/admin/messages")
    } else {

      console.log(data)
      toast.error(<div className=" normal-case">{data.message}</div>);
    }

    setDetails({
      ...details,
      title: "",
      message: "",
      loading: false,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className=" my-8   ">
        <input
          type="text"
          onChange={handleInputChange}
          name="title"
          value={details.title}
          placeholder="Title"
          className={`input input-bordered  w-full ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}
        />
      </div>
      <div className=" my-8   ">
        <textarea
          rows="12"
          onChange={handleInputChange}
          name="message"
          value={details.message}
          placeholder="New message....."
          className={` textarea  w-full ${
            isDark ? " bg-black border-white " : " text-black  border-black"
          }`}></textarea>
      </div>

      <button
        className={`  btn  shadow-md   capitalize sm:my-4   w-full ${
          isDark
            ? "hover:border-white hover:bg-black hover:text-white"
            : " bg-black text-white hover:border-black "
        }`}>
        Send customers {details.loading && <Spinner />}
      </button>
    </form>
  );
}
