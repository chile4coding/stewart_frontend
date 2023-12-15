import {
  adminGetreviews,
  getCookie,
  paginationReview,
  deleteReviews,
  getCustomers,
  getVisitors,
} from "@/services/request";
import {
  setAdminReviews,
  initVisitor,
  initUser,
  setReviewPercent,
} from "@/redux/storeSlice";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillCloseSquare, AiFillEye, AiFillStar } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function TotalReviews({
  title,
  total,
  percentage,
  value,
  newCustomers,
  returningCustomers,
}) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <div className=" flex   items-center  justify-between">
          <div className=" flex items-center gap-1">
            <p>{title}</p>
          </div>
          {/* <select
            className={`select  select-sm ${
              isDark ? " bg-[#646464]" : " bg-[#646464] border-black text-white"
            }`}>
            <option>All Time</option>
            <option>weekly</option>
            <option>monthly</option>
            <option>yearly</option>
          </select> */}
        </div>
        <h2 className="  my-2 lg:text-[30px]  xl:text-[30px] font-semibold">
          {total}
        </h2>

      
        <div className=" flex   items-center  justify-between">
          <h2 className=" ">Visitors</h2>
          <h2>{newCustomers}</h2>
        </div>
        <div className=" flex   items-center  justify-between">
          <h2 className=" ">Customers</h2>
          <h2>{returningCustomers}</h2>
        </div>
      </div>
    </div>
  );
}
function ReviewDetails({rate}) {


  
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <div className=" flex gap-2 justify-between ">
          <div className=" flex  gap-2">
            <h2>5</h2>

            <AiFillStar className=" text-[#FCBB16]" />
          </div>
          <div className="   flex flex-col gap-3">
            {" "}
            <progress
              className="progress w-40 lg:w-56 "
              value={100}
              max="100"></progress>
            <progress
              className="progress progress-warning w-40 lg:w-56 "
              value={rate[0]}
              max="100"></progress>
          </div>
          <h2>{rate[0]}%</h2>
        </div>
        <div className=" flex gap-2 justify-between ">
          <div className=" flex   gap-2">
            <h2>4</h2>

            <AiFillStar className=" text-[#FCBB16]" />
          </div>
          <div className="   flex flex-col gap-3">
            {" "}
            <progress
              className="progress w-40 lg:w-56 "
              value={100}
              max="100"></progress>
            <progress
              className="progress progress-warning w-40 lg:w-56 "
              value={rate[1]}
              max="100"></progress>
          </div>
          <h2>{rate[1]}%</h2>
        </div>
        <div className=" flex gap-2 justify-between ">
          <div className=" flex  gap-2 ">
            <h2>3</h2>

            <AiFillStar className=" text-[#FCBB16]" />
          </div>
          <div className="   flex flex-col gap-3">
            {" "}
            <progress
              className="progress w-40 lg:w-56 "
              value={100}
              max="100"></progress>
            <progress
              className="progress progress-warning w-40 lg:w-56 "
              value={rate[2]}
              max="100"></progress>
          </div>
          <h2>{rate[2]}%</h2>
        </div>
        <div className=" flex gap-2 justify-between ">
          <div className=" flex  gap-2">
            <h2>2</h2>

            <AiFillStar className=" text-[#FCBB16]" />
          </div>
          <div className="   flex flex-col gap-3">
            {" "}
            <progress
              className="progress w-40 lg:w-56 "
              value={100}
              max="100"></progress>
            <progress
              className="progress progress-warning w-40 lg:w-56 "
              value={rate[3]}
              max="100"></progress>
          </div>
          <h2>{rate[3]}%</h2>
        </div>
        <div className=" flex gap-2 justify-between ">
          <div className=" flex  gap-2">
            <h2>1</h2>

            <AiFillStar className=" text-[#FCBB16]" />
          </div>
          <div className="   flex flex-col gap-3">
            {" "}
            <progress
              className="progress w-40 lg:w-56 "
              value={100}
              max="100"></progress>
            <progress
              className="progress progress-warning w-40 lg:w-56 "
              value={rate[4]}
              max="100"></progress>
          </div>
          <h2>{rate[4]}%</h2>
        </div>
      </div>
    </div>
  );
}

function CustomersList({ reviews }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const router = useRouter();
  const [table, setTable] = useState([]);
  const [page, setPage] = useState(0);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie();
    setToken(token);
    const page = paginationReview(reviews);

    setTable(page);
    setPage((prev) => 0);
  }, []);

  function handleNavigation(id) {
    router.push(`/admin/orders/${id}`);
  }

  function handlePageination(pageId) {
    setPage((prev) => pageId);
  }

  async function deleteReview(id) {
    const response = await deleteReviews(id, token);
    const data = await response.json();
    if (response.status == 200) {
      const res = await adminGetreviews(token);
      const dataR = await res.json();

      if (res.status === 200) {
        dispatch(setAdminReviews(dataR.reviews));
        toast.success(<div className="  normal-case">{dataR.message}</div>);
      } else {
        toast.error(<div className=" normal-case">{dataR.message}</div>);
      }
    }
  }
  return (
    <div
      className={`  pb-3 mb-6  rounded-md ${
        isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
      }`}>
      <div
        className={` card-body overflow-x-auto mb-6  rounded-md ${
          isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
        }`}>
        <div className=" overflow-x-auto ">
          <table className="table">
            <thead className="">
              <tr
                className={` ${
                  isDark
                    ? " border-b border-b-white text-white"
                    : " border-b border-b-black text-black"
                }`}>
                <th>Customer</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Action</th>
                <th>
                  {" "}
                  {/* <select
                    className={`select  select-sm ${
                      isDark
                        ? " bg-[#646464]"
                        : " bg-[#646464] border-black text-white"
                    }`}>
                    <option>All Time</option>
                    <option>weekly</option>
                    <option>monthly</option>
                    <option>yearly</option>
                  </select> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews &&
                table?.length > 0 &&
                table[page]?.map((review) => {
                  const dateTime = review?.date?.split(",");

                  const [date, time] = dateTime;

                  return (
                    <tr
                      key={review?.id}
                      className={
                        isDark
                          ? " text-white border-0"
                          : "  text-black border-0"
                      }>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask  rounded-full w-12 h-12">
                              <img
                                src={review?.avatar}
                                alt="Avatar Tailwind CSS Component"
                                className=" w-full h-full bg-white rounded"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {review?.user?.name}
                            </div>
                            <div className=" text-sm opacity-40 normal-case break-all">
                              {review?.user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <div className=" flex  gap-2 items-center">
                          <h2>{review?.rating}</h2>

                          <AiFillStar className=" text-[#FCBB16]" />
                        </div>
                      </td>
                      <td>
                        <div className="collapse  max-w-[200px] border">
                          <input type="checkbox" />
                          <div className="collapse-title  font-normal  flex justify-between pr-2">
                            <div className="  normal-case"> Read review</div>
                            <span className=" justify-self-end  self-center pr-0">
                              <MdKeyboardArrowDown />
                            </span>
                          </div>
                          <div className="collapse-content">
                            <p className=" normal-case">{review?.comment}</p>
                          </div>
                        </div>
                      </td>
                      <td className=" ">
                        <div>
                          <h2>{date}</h2>
                          <h2 className=" opacity-50 normal-case"> {time}</h2>
                        </div>
                      </td>
                      <td>
                        <div
                          className=" flex items-center  gap-3 hover:underline hover:cursor-pointer  "
                          onClick={deleteReview.bind(this, review?.id)}>
                          <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                          <h2>Remove</h2>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className=" flex items-center gap-3 mt-6">
          {table?.length > 0 &&
            table.map((item, i) => (
              <button
                onClick={handlePageination.bind(this, i)}
                className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                  isDark
                    ? "hover:border-white hover:bg-black hover:text-white"
                    : " bg-black text-white hover:border-black  "
                }  ${page === i ? " bg-[#302999] text-[white]" : ""}`}>
                {i + 1}
              </button>
            ))}

          {
            <button
              onClick={handlePageination.bind(this, table.length - 1)}
              className={`btn  flex gap-0  capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}>
              <IoIosArrowForward />
              <IoIosArrowForward />
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default function RevieswDetails() {
  const dispatch = useDispatch();
  const {
    user,
    toggleMode,
    adminReviews,
    userCount,
    visiorCount,
    reviewsPaercent,
  } = useSelector((state) => state.store);

  useEffect(() => {
    const token = getCookie();
    if (token) {
      async function getReviews() {
        const response = await adminGetreviews(token);
        const dataC = await getCustomers(token);
        const dataV = await getVisitors(token);

        dispatch(initUser(dataC?.users?.length));
        dispatch(initVisitor(dataV?.visitors[0]?.count - 1));

        if (response.status === 200) {
          const data = await response.json();

          dispatch(setAdminReviews(data.reviews));
          dispatch(setReviewPercent(data.reviews));
        }
      }
      getReviews();
    }
  }, []);



  return (
    <div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-1 md:grid-cols-1">
        {reviewsPaercent && reviewsPaercent.length > 0 && (
          <ReviewDetails rate={reviewsPaercent} />
        )}

        {userCount && visiorCount && (
          <TotalReviews
            title="Total Reviews"
            total={adminReviews?.length}
            percentage="+31%"
            value="Last 7 days"
            returningCustomers={userCount}
            newCustomers={visiorCount}
          />
        )}
      </div>

      {adminReviews && adminReviews.length > 0 && (
        <CustomersList reviews={adminReviews} />
      )}
    </div>
  );
}
