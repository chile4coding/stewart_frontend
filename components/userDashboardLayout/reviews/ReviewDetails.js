import { ImageComponent } from "@/components/image/Imagecomponent";
import Spinner from "@/components/spinner/Spinner";
import { setUser } from "@/redux/storeSlice";
import {
  deleteReviews,
  getCookie,
  getCurrentUser,
  updateReview,
} from "@/services/request";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillCloseSquare } from "react-icons/ai";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
export function AddReviewModal({ item }) {
  const { user, toggleMode, orders, orderDetails } = useSelector(
    (state) => state.store
  );
  const dispatch = useDispatch();
  const [review, setReview] = useState({
    rating: "",
    name: "",
    comment: "",
    productId: "",
    loading: false,
    id: "",
  });
  const { isDark } = toggleMode;
  useEffect(() => {
    setReview({
      ...review,
      rating: item.rating,
      comment: item.comment,
      productId: item.product_id,
      id: item.id,
      name: item.name,
    });
  }, [item]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const check = Boolean(review.comment.trim() && review.rating.trim());
    const token = getCookie();
    if (!check) {
      toast.error(
        <div className=" normal-case">Please fill the field correctly</div>
      );
      return;
    }
    setReview({
      ...review,
      loading: true,
    });
    const response = await updateReview(review, token);
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      toast.success(<div className="  normal-case">{data.message}</div>);
      const response = await getCurrentUser(token);
      if (response.status === 200) {
        const user = await response.json();
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
            <button className=" flex justify-end  btn-sm btn normal-case  ml-auto">
              close
            </button>

            <div className=" grid grid-cols-3 gap-5 sm:grid-cols-1">
              <textarea
                className={`textarea text-[black] textarea-bordered w-full col-span-2`}
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
                  Submit {review.loading && <Spinner />}
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
function NoReviews() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router = useRouter();

  return (
    <div className="w-full  flex flex-col justify-center items-center h-[88vh] ">
      <div className="comment p-1">
        <BsFillChatSquareQuoteFill className=" text-2xl text-[#0d58af]" />
      </div>

      <h2 className=" lg:text-[24px] xl:text-[24px] font-semibold mt-6 mb-2">
        You haven’t reviewed any product yet
      </h2>
      <p className=" mb-6 text-center">
        Your feedback on purchased products will appear here.
      </p>

      <button
        className={`btn  shadow-md   normal-case sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
          isDark
            ? "hover:border-white hover:bg-black hover:text-white"
            : " bg-black text-white hover:border-black"
        }`}
        onClick={() => router.push("/shop")}>
        Continue Shopping
      </button>
    </div>
  );
}

function Reviews() {
  const { orders, orderDetails, user, toggleMode } = useSelector(
    (state) => state.store
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isDark } = toggleMode;
  const [item, setItem] = useState({});
  function handleModalShow(item) {
    setItem(item);
    window.my_modal_3.showModal();
  }

  async function handleDeleteReview(id) {
    const token = getCookie();
    setLoading((prev) => true);
    const response = await deleteReviews(id, token);
    const data = await response.json();

    if (response.status === 200) {
      toast.success(<div className="  normal-case">{data.message}</div>);
      const response = await getCurrentUser(token);
      if (response.status === 200) {
        const user = await response.json();
        dispatch(setUser(user?.user));
      }
    }

    setLoading((prev) => false);
  }
  return (
    <div>
      <>
        <AddReviewModal item={item} />
        {user.review.map((rev) => (
          <div
            className={` grid grid-cols-4 py-10 sm:grid-cols-1  ${
              isDark ? "border-b border-b-white  " : " border-b border-b-black "
            }`}>
            <Rating
              sx={{
                backgroundColor: "",

                fill: "green",
              }}
              className=" order-2"
              defaultValue={Number(rev.rating)}
              precision={0.5}
              readOnly
            />
            <div className=" order-1">{rev.name}</div>
            <div className=" grid gap-3 order-3">
              <p className="  lowercase text-[ 18px] font-normal leading-6  normal-case">
                {rev.comment}
              </p>
            </div>
            <div className="order-4  justify-self-center ">
              <div className=" flex items-center gap-4">
                <button
                  onClick={handleModalShow.bind(this, rev)}
                  className={`  btn  btn-outline border normal-case    px-8 py-4 ${
                    isDark
                      ? "border-white text-white  hover:bg-white hover:text-black "
                      : " hover:bg-black hover:text-white "
                  }`}>
                  edit
                </button>
                <AiFillCloseSquare
                  onClick={handleDeleteReview.bind(this, rev.id)}
                  className=" text-xl hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
}

export default function ReviewDetails() {
  const { orders, orderDetails, user } = useSelector((state) => state.store);
  return (
    <div className=" h-[100vh]">
      {user?.review?.length > 0 ? <Reviews /> : <NoReviews />}
    </div>
  );
}
