import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getCookie, getCurrentUser } from "../../../services/request";
import toast from "react-hot-toast";
import Spinner from "@/components/spinner/Spinner";
import { setUser } from "@/redux/storeSlice";

 function AddReviewModal({item}){
 
    const { user, toggleMode, orders, orderDetails } = useSelector(
    (state) => state.store
  );
  const dispatch = useDispatch()
  const [review, setReview] = useState({
    rating:"",
    name:"",
    comment:"",
    productId:"",
    loading:false
  });
  const  {isDark} =  toggleMode
  useEffect(()=>{

  }, [item])

function handleInputChange(e){
  const {name, value} = e.target
  setReview({...review, [name]:value})
}
async function handleSubmit(e){
  e.preventDefault()
  const check = Boolean(review.comment.trim() && review.rating.trim() )
  const token = getCookie();
 if(!check){
  toast.error(<div className=" normal-case">Please fill the field correctly</div>)
  return;

 }
   setReview({
     ...review,
     loading: true,
   });

  
 const response = await addReview(
   {
     ...review,
     productId: item.id,
     name: `${item.name} ${item.initial_color}`,
   },
   token
 );
 const data = await response.json()

 if(response.status === 201){
  toast.success(<div className="  normal-case">{data.messsage}</div>);
 const response = await getCurrentUser(token);
 const user = await response.json();


        if (response.status === 200) {
          dispatch(setUser(user?.user));
        }
}
   setReview({
     rating: "",
     name: "",
     comment: "",
     productId: "",
     loading: false,
   });
}
 
  return (
    <>
      <dialog id="my_modal_3" className="modal ">
        <form
          method="dialog"
          className={` modal-box max-w-2xl    sm:text-xs ${
            isDark ? "bg-[#212121] text-[white] " : " text-black bg-[#eeecec]"
          }`}>
          <div className=" card-body">
            
              <button className=" flex justify-end  btn-sm btn normal-case  ml-auto">close</button>
              
         
            <div className=" grid grid-cols-3 gap-5 sm:grid-cols-1">
              <textarea
                className="textarea textarea-bordered w-full col-span-2 text-[black]"
                placeholder="Add a review"
                name="comment"
                onChange={handleInputChange}
                value={review.comment}
                rows="4"></textarea>
              <div>
                <div>
                  <Rating
                    name="rating"
                    onChange={handleInputChange}
                    value={review.rating}
                    sx={{
                      backgroundColor: "#F0EDED",
                      fill: "green",
                    }}
                    className="my-4"
                    precision={0.5}
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={`my-6 btn  btn-outline border normal-case    px-8 py-4 ${
                    isDark
                      ? "border-white text-white  hover:bg-white hover:text-black "
                      : " hover:bg-black hover:text-white "
                  }`}>
                  Submit {review.loading && <Spinner/>}
                </button>
              </div>
            </div>
          </div>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
  

  
  
}

function OrderIDCard() {
  const { user, toggleMode, orders, orderDetails } = useSelector(
    (state) => state.store
  );
  const  {isDark} =  toggleMode
  const [item, setItem] =  useState({})

  function handleModalShow(item){
    setItem(item)
        window.my_modal_3.showModal();

  }


  return (
    <>
    <AddReviewModal item={item}/>
    <div className={`my-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className="  card-body over">
        <h2 className="text-[18px]  font-semibold py-2">
          Order Id {orderDetails.id}{" "}
        </h2>
        <p className="text-[18px]   ">
          {orderDetails.orderitem.length - 1} items{" "}
        </p>
        <p className="text-[18px]   ">Placed On: {orderDetails.placedOn}</p>
        <p className="text-[18px]  ">
          Delivered on: {new Date(orderDetails.arrivalDate).toDateString()}
        </p>
        <p className="text-[18px]   pb-2">Total : ₦{orderDetails.total}</p>

        <div className="mt-4">
          <h2 className="text-[18px]  font-semibold">Items in your order</h2>
        </div>

        <div
          className={` overflow-x-auto mb-6  rounded-md ${
            isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
          }`}>
          <table className="table">
            <thead className="">
              <tr
                className={
                  isDark
                    ? " text-white border-b"
                    : " border-b  text-black border-b-black"
                }>
                <th>Product</th>
                <th>product ID Code</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderitem.map((item) => {
                if (item.id) {
                  return (
                    <tr
                      className={
                        isDark
                          ? " text-white border-b"
                          : "  text-black border-b border-b-black"
                      }>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle rounded-md w-12 h-12">
                              <img
                                src={item.image}
                                alt="Avatar Tailwind CSS Component"
                                className=" w-full h-full bg-white"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {item.name} {item.initial_color}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td> # {item?.id?.slice(-6)}</td>
                      <td>
                        <p>{item.qty}</p>
                      </td>
                      <th>
                        <span className=" normal-case hover:underline hover:cursor-pointer">
                          ₦{item.subTotal?.toFixed(2)}
                        </span>
                      </th>
                      <td>
                        <p className="hover:underline hover:cursor-pointer" onClick={handleModalShow.bind(this, item)}>add review</p>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>

            <tfoot>
              <tr
                className={
                  isDark ? " text-white border-0 " : "  text-black border-0 "
                }>
                <th className=" text-[18px] font-semibold">Total</th>
                <th></th>
                <th className=" text-[18px] font-semibold">
                  {orderDetails.orderitem.reduce((accumulator, currentItem) => {
                    if (currentItem.subTotal) {
                      return accumulator + currentItem.qty;
                    }
                    return accumulator;
                  }, 0)}{" "}
                  Items
                </th>
                <th className=" text-[18px] font-semibold">
                  ₦
                  {orderDetails.orderitem.reduce((accumulator, currentItem) => {
                    if (currentItem.subTotal) {
                      return accumulator + currentItem.subTotal;
                    }
                    return accumulator;
                  }, 0)}
                </th>
              </tr>
            </tfoot>

            {/* foot */}
          </table>
        </div>
      </div>
    </div>

    </>
  );
}

function PaymentInfo() {
  const { user, toggleMode, orders, orderDetails } = useSelector(
    (state) => state.store
  );
  const { isDark } = toggleMode;


  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2
          className={`mb-3 border-b pb-1 ${
            isDark ? " border-b-white" : " border-black"
          }`}>
          Payment Information
        </h2>

        <div className=" flex gap-5 sm:mb-3 lg:mb-3 xl:mb-3 flex-wrap">
          <h2>Payment type:</h2>
          <h2>
            {orderDetails.orderitem.map((item) => {
              if (item.hasOwnProperty("paymentMethod")) {
                return item.paymentMethod;
              }
            })}
          </h2>
        </div>
        <h2 className="text-18px] font-semibold mt-2">Payment details</h2>
        <div className=" flex gap-5 flex-wrap">
          <h2>
            Items total:{" "} ₦
            {orderDetails.orderitem.reduce((accumulator, currentItem) => {
              if (currentItem.subTotal) {
                return accumulator + currentItem.subTotal;
              }
              return accumulator;
            }, 0)}
          </h2>
        </div>
        <div className=" flex gap-5 flex-wrap">
          <h2> Shipping fee: ₦{orderDetails.shipping}</h2>
          <h2 className="   break-all   normal-case md:text-sm">
            ({orderDetails.shippingType} shipping)
          </h2>
        </div>
        <div className=" flex gap-5 flex-wrap">
          <h2>Total: ₦{orderDetails.total}</h2>
        </div>
      </div>
    </div>
  );
}

function ShippingDetails() {
  const { user, toggleMode, orders, orderDetails } = useSelector(
    (state) => state.store
  );
  const { isDark } = toggleMode;
  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2
          className={`mb-3 border-b pb-1 ${
            isDark ? " border-b-white" : " border-black"
          }`}>
          Shipping Details
        </h2>

        <div className=" flex gap-5 sm:mb-3 lg:mb-3 xl:mb-3 flex-wrap">
          <h2>Name</h2>
          <h2>{orderDetails.name}</h2>
        </div>
        <div className=" flex gap-5 ">
          <h2>Address</h2>
          <h2 className="   break-all   normal-case md:text-sm">
          {orderDetails.address}
          </h2>
        </div>
        <div className=" flex gap-10">
          <h2>Email</h2>
          <h2 className="   break-all   normal-case md:text-sm">
          {orderDetails.email}
          </h2>
        </div>
        <div className=" flex gap-5">
          <h2>Phone No.:</h2>
          <h2 className="   break-all   normal-case md:text-sm">{orderDetails.phone}</h2>
        </div>
      </div>
    </div>
  );
}

export default function OrdersDetails() {
  return (
    <div className=" card ">
      <OrderIDCard />
      <div className=" grid grid-cols-2 sm:grid-cols-1 gap-5 sm:gap-0 mb-5">
        <PaymentInfo />
        <ShippingDetails />
      </div>
    </div>
  );
}
