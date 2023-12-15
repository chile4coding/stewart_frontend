import AppLayoout from "@/components/Layout/AppLayoout";
import { contactUs } from "@/services/request";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function ContactUs() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router = useRouter();
  const [contact, setContact] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    message: "",
    loading: false,
  });

  const handleContactInput = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setContact({ ...contact, loading: true });
    const response = await contactUs(contact);
    const data = await response.json();
    if (response.status === 200) {
      toast.success(<div className=" normal-case">{data?.message}</div>);
   router.back()
   
    } else {
      toast.error(<div className=" normal-case">{data?.message}</div>);
    }

    setContact({
      ...contact,
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      message: "",
      loading: false,
    });
  };
  return (
    <div className=" grid grid-cols-2   sm:grid-cols-1  md:grid-cols-1 gap-10">
      <div className="sm:hidden md:hidden">
        <img src="/contact.png" alt="contact-us" className=" " />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={contact.firstname}
            onChange={handleContactInput}
            required
            className={`input input-bordered  w-full  ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
        </div>
        <div className="my-6">
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={contact.lastname}
            onChange={handleContactInput}
            required
            className={`input input-bordered  w-full  ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
        </div>
        <div className="my-6">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={contact.email}
            onChange={handleContactInput}
            required
            className={`input input-bordered  w-full  ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
        </div>
        <div className="my-6">
          <input
            type="text"
            placeholder="Phone Number (optional)"
            name="phone"
            value={contact.phone}
            onChange={handleContactInput}
            className={`input input-bordered  w-full  ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" my-8   ">
          <textarea
            rows="9"
            name="message"
            required
            value={contact.message}
            onChange={handleContactInput}
            placeholder="Type your message..."
            className={` textarea  w-full ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}></textarea>
        </div>

        <div className=" w-full flex justify-center mb-6">
          <button
            className={`  btn  shadow-md  w-full  capitalize sm:my-4   mx-auto ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black "
            }`}>
            {contact.loading ? "Sending Message" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Contact() {
  return (
    <AppLayoout>
      <main className="px-10 sm:px-4 max-h-[100vh]  overflow-y-scroll  h-full mb-10">
        <ContactUs />
      </main>
    </AppLayoout>
  );
}
