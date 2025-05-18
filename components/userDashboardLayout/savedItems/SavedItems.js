import { getSingleProduct, setUser } from "@/redux/storeSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillCloseSquare, AiOutlineCloseSquare } from "react-icons/ai";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import {
  getCookie,
  deleteSavedItem,
  getCurrentUser,
  pagination,
} from "@/services/request";

import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

export function NoSavedItems({
  title = "No saved items yet",
  message = "Your saved products will appear here.",
}) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className="w-full  flex flex-col justify-center items-center h-[88vh] ">
      <div className="comment p-1">
        <BsFillChatSquareQuoteFill className=" text-2xl text-[#0d58af]" />
      </div>

      <h2 className=" lg:text-[24px] xl:text-[24px] font-semibold mt-6 mb-2">
        {title}
      </h2>
      <p className=" mb-6 text-center">{message}</p>

      <Link href={"/shop"}>
        <button
          className={`btn  shadow-md   normal-case sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
            isDark
              ? "hover:border-white hover:bg-black hover:text-white"
              : " bg-black text-white hover:border-black"
          }`}>
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}

export default function SavedItemsDetails() {
  const { user, toggleMode, singleProduct } = useSelector(
    (state) => state.store
  );
  const [table, setTable] = useState([]);
  const [page, setPage] = useState(0);
  const [token, setToken] = useState(null);

  const router = useRouter();
  const { isDark } = toggleMode;
  const dispatch = useDispatch();
  useEffect(() => {
    const page = pagination(user.save_items);
    setTable(page);
    setPage((prev) => 0);
    if (!Boolean(token)) {
      const tokenN = getCookie();
      setToken(tokenN);
    }
  }, []);

  async function handleDelete(id) {
    const response = await deleteSavedItem(id, token);
    const data = await response.json();

    if (response.ok) {
      toast.success(<div className=" normal-case">product deleted</div>);
      const response = await getCurrentUser(token);
      if (response.status === 200) {
        const user = await response.json();

        dispatch(setUser(user?.user));
      }
    }
  }

  async function handeBuyItem(item) {
    dispatch(getSingleProduct(item.id));

    if (singleProduct) {
      router.push(`/item/${item?.title}`);
    }
  }

  function handlePageination(pageId) {
    setPage((prev) => pageId);
  }

  return (
    <div
      className={` h-[88vh]  pb-3 mb-6  rounded-md ${
        isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
      }`}>
      <div
        className={` card-body overflow-x-auto mb-6  rounded-md ${
          isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"
        }`}>
        <table className="table">
          <tbody>
            {table.length > 0 ? (
              table[page].map((item) => (
                <tr
                  key={item.id}
                  className={
                    isDark ? " text-white border-0" : "  text-black border-0"
                  }>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask  rounded-md w-12 h-12">
                          <img
                            src={item.image}
                            alt={item.name}
                            className=" w-full h-full bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td> ₦ {item.amount}</td>
                  <td>
                    <button
                      onClick={handeBuyItem.bind(this, {
                        id: item.item_id,
                        title: item.name,
                      })}
                      className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px] mx-auto ${
                        isDark
                          ? "hover:border-white hover:bg-black hover:text-white"
                          : " bg-black text-white hover:border-black"
                      }`}>
                      Buy now
                    </button>
                  </td>
                  <th>
                    <div className="  flex items-center gap-2 ">
                      <span
                        onClick={handleDelete.bind(this, item.id)}
                        className={
                          isDark
                            ? "   text-white bg-black cursor-pointer"
                            : " bg-white text-black  cursor-pointer"
                        }>
                        <AiFillCloseSquare className=" text-xl" />
                      </span>
                      <span
                        onClick={handleDelete.bind(this, item.id)}
                        className=" normal-case hover:underline hover:cursor-pointer">
                        Remove
                      </span>
                    </div>
                  </th>
                </tr>
              ))
            ) : (
              <div className=" text-center">No Saved Item</div>
            )}
          </tbody>
          {/* foot */}
        </table>
        <div className=" flex items-center gap-3 mt-6">
          {table.length > 0 &&
            table.map((item, i) => (
              <button
                onClick={handlePageination.bind(this, i)}
                className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                  isDark
                    ? "hover:border-white hover:bg-black hover:text-white"
                    : " bg-black text-white hover:border-black  "
                }  ${page === i ? " bg-[#302999] text-white" : ""}`}>
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
