import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getBestSelling,
  getFavourite,
  getNewArrival,
  getProductByCategory,
  getShopProducts as getStoreProducts,
  setUser,
} from "@/redux/storeSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "@/redux/storeSlice";
import Spinner from "../spinner/Spinner";
import { MdOutlineFavorite } from "react-icons/md";
import { getCookie, getCurrentUser, saveItem } from "@/services/request";
export function ItemCategory({ category }) {
  const {
    shop,
    toggleMode,
    singleProduct,
    newArrival,
    bestSelling,
    globalLoading,

    products: product,
  } = useSelector((state) => state.store);
  const { isDark } = toggleMode;
  const router = useRouter();
  const dispatch = useDispatch();
  function handleCategory(cat) {
    dispatch(getProductByCategory(cat.id));
    if (shop.length > 0) {
      router.push(`/shop/category-${cat.cat}`, "/shop");
    } else {
      return;
    }
  }

  return (
    <div
      className={`card relative rounded-md   hover:opacity-90 cursor-pointer    ${
        isDark ? "item-category" : "bg-[#D9D9D9]"
      }
          `}
      onClick={handleCategory.bind(this, {
        cat: category.name,
        id: category.id,
      })}>
      {globalLoading ? (
        <div className=" p-4 sm:p-2  ">
          <figure className="  sm:max-h-[100px]  xl:max-h-[200px]  lg:max-h-[200px]  md:max-h-[150px] ">
            <img
              src={category?.image}
              alt={category?.name}
              className={`rounded-md   object-contain  sm:h-full w-full   h-full  ${
                isDark ? "item-category" : "bg-[#D9D9D9]"
              }`}
            />
          </figure>
          <div
            className={` mt-2 break-before-all  sm:text-[8px] text-center   text-[13px]  font font-semibold ${
              isDark ? "text-white" : "text-black"
            }`}>
            {category?.name}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default function Items({ items }) {
  const {
    shop,
    toggleMode,
    singleProduct,
    globalLoading,
    newArrival,
    bestSelling,

    products,
  } = useSelector((state) => state.store);
  const [rout, setRoute] = useState(false);
  const [token, setToken] = useState(null);
  const { isDark } = toggleMode;
  const route = useRouter();
  useEffect(() => {
    if (route.asPath === "/shop") {
      setRoute(true);
    } else {
      setRoute(false);
    }

    if (!Boolean(token)) {
      const tokenN = getCookie();

      setToken(tokenN);
    }
  }, [products]);

  const router = useRouter();
  const dispatch = useDispatch();
  function handleSingleItemDetailNav(item) {
    dispatch(getSingleProduct(item.id));

    if (singleProduct) {
      router.push(`/item/${item?.title}`);
    }
  }

  async function handleSaveItem(it, token) {
    const { name, favorite: status, id, price: amount, image } = it;
    const details = {
      name,
      id: id + "",
      image,
      amount: amount + "",
      status: status + "" || false + "",
    };
    console.log(details);
    const response = await saveItem(details, token);
    const data = await response.json();

    if (token) {
      const resp = await getCurrentUser(token);
      const user = await resp.json();

      dispatch(setUser(user?.user));
    }
  }

  function handleFavourite(item) {
    const { items, id } = item;

    dispatch(getFavourite(id));

    dispatch(getNewArrival(products));
    dispatch(getBestSelling(products));
    const i = products.find((item) => item.id === id);
    if (token) {
      handleSaveItem(i, token);
    }
  }

  function addClass(favoriteId) {
    for (const item of products) {
      if (
        item.hasOwnProperty("favorite") &&
        item.favorite &&
        item.id === favoriteId
      ) {
        return "text-[red]";
      }
    }
  }

  return (
    <div
      className={`  h-full card   rounded-md   hover:opacity-90 cursor-pointer ${
        isDark ? " bg-[#212121]" : "bg-[#D9D9D9]"
      }`}>
      {globalLoading ? (
        <div
          className={` w-full h-full sm:p-2 lg:p-4 md:p-3 xl:p-4   
          `}>
          <figure
            onClick={handleSingleItemDetailNav.bind(this, {
              title: `${items?.name}`,
              id: items?.id,
            })}
            className=" relative  sm:max-h-[100px]  h-full   w-full lg:max-h-[200px]  xl:max-h-[200px]  md:max-h-[150px] ">
            <img
              src={items?.image}
              alt={items?.name}
              className={`  w-full   object-contain   h-[200px] ${
                isDark
                  ? "bg-[white]  rounded-md"
                  : "bg-[#e4e1e1] border-0 rounded-none"
              }`}
            />
          </figure>
          <div className="  mx-auto text-center">
            <div className=" flex justify-center gap-6 items-center">
              <h2 className=" font-normal  text-center text-[14px] sm:text-sm py-2 sm:my-0 sm:text-[7px]  lowercase sm:font-normal">
                {items?.name}
              </h2>

              {rout && (
                <MdOutlineFavorite
                  title="Save item"
                  onClick={handleFavourite.bind(this, {
                    items,
                    id: items?.id,
                  })}
                  className={` hover:text-[red]  text-2xl  ${addClass(
                    items.id
                  )} `}
                  style={{ zIndex: 999 }}
                />
              )}
            </div>
            <p className="my-3 sm:text-[10px] sm:my-0 ">
              ₦{items?.price?.toFixed(2)}
            </p>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
