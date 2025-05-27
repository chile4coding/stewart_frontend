import React, { useEffect } from "react";
import Items from "@/components/items/Items";
import AppLayout from "@/components/Layout/AppLayout";
import { AiOutlineDownCircle } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getCategory,
  getProductByCategory,
  searchStore,
  setGlobalLoading,
  storeGetProducts,
} from "@/redux/storeSlice";
import Head from "next/head";
import AppFooter from "@/components/Footer/Footer";
import useGetProducts from "@/components/hooks/useGetProducts";
import { useQuery } from "react-query";
import { getShopProducts } from "@/services/request";

export function MetaDat() {
  return (
    <Head>
      <title>Stewart Collection | Store</title>
      <meta
        name="description"
        content="   Explore the rise of joggers, the oversized garment defying gender norms. Break the mold! Show how polo infuse personality into formal suits
        Craft a narrative around a unique outfit. Let a skirt be the protagonist, complemented by a playful printed shirt and a tie that adds a touch of whimsy. 
        Move beyond restrictive label"
      />
      <meta
        name="keyword"
        content="Polo   Suit  Tie  Shirt, Skirt, Clothes, Male Wares & Female Wares
      "
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}

function SortComponent({ category, setFilter }) {
  const { toggleMode } = useSelector((state) => state.store);

  const { isDark } = toggleMode;

  return category?.length > 0 ? (
    <div className="dropdown z-50">
      <button
        tabIndex={0}
        role="button"
        className={` btn btn-outline flex normal-case  ${
          isDark ? " border-white text-white" : ""
        }`}>
        Sort <AiOutlineDownCircle />
      </button>
      <ul
        tabIndex={0}
        className={`dropdown-content menu  rounded-box z-1  p-2 shadow-sm ${
          isDark ? " bg-slate-100" : " bg-black"
        }`}>
        <li>
          <button
            onClick={() => setFilter("")}
            className={` lowercase btn  btn-sm btn-outline border-0  ${
              isDark ? " hover:bg-black  hover:text-white" : "text-white"
            }`}>
            All
          </button>
        </li>
        {category &&
          category.length > 0 &&
          category.map((item) => (
            <li key={item.id}>
              <button
                key={item.id}
                onClick={() => {
                  setFilter(item.name);
                  // handleCategory.bind(this, item.id);
                }}
                className={` lowercase btn  btn-sm btn-outline border-0  ${
                  isDark ? " hover:bg-black  hover:text-white" : "text-white"
                }`}>
                {item.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  ) : null;
}
export default function Shop() {
  const { toggleMode } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(10);
  const [filter, setFilter] = useState("");

  const isDark = toggleMode?.isDark;

  const { data, isLoading, error } = useQuery({
    queryKey: ["GET_PRODUCTS", search, count, filter],
    queryFn: async () => {
      const result = await getShopProducts({ search, count, filter });

      dispatch(storeGetProducts(result?.products));
      dispatch(setGlobalLoading(true));

      return result;
    },
    enabled: true,
    keepPreviousData: true,
  });

  function handleSearch(e) {
    setSearch((prev) => e.target.value);
  }

  function loadMore() {
    if (count <= Number(data?.pagination?.total)) {
      setCount((prev) => prev + 10);
    }
  }

  return (
    <>
      <MetaDat />
      <AppLayout>
        {isLoading && (
          <div className="flex justify-center items-center h-screen">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        )}

        {!isLoading && (
          <main className=" px-10 sm:px-4 max-h-[100vh]  overflow-y-scroll ">
            <div className="flex  justify-between  items-center mt-10 flex-wrap relative ">
              <h2>
                Showing {data?.products?.length}{" "}
                {data?.products?.length > 1 ? "products" : "product"}
              </h2>
              <div className=" ]  xl:w-[322px]  sm:hidden ">
                <input
                  type="text"
                  placeholder="search "
                  value={search}
                  onChange={handleSearch}
                  className={`input  md:hidden input-bordered border-collapse  w-full   sm:hidden ${
                    isDark ? "border-white bg-transparent" : " border-[black] "
                  }`}
                  style={{ color: !isDark && "black !important" }}
                />
              </div>

              {
                <SortComponent
                  category={data?.categories}
                  setFilter={setFilter}
                />
              }
            </div>

            {data?.products?.length > 0 ? (
              <div
                className={`grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 md:gap-4 sm:grid-cols-2  gap-5  sm:gap-3 my-8 `}>
                {data?.products &&
                  data?.products.length > 0 &&
                  data?.products.map((prod) => (
                    <Items items={prod} key={prod.id} />
                  ))}
              </div>
            ) : (
              <div className=" my-32">
                <h2 className=" text-center">Not item found</h2>
              </div>
            )}

            {Number(data?.pagination?.total) > 10 && (
              <div className=" flex justify-center ">
                {
                  <button
                    onClick={loadMore}
                    className={` my-4 btn btn-outline  mx-auto normal-case sm:btn-sm ${
                      isDark
                        ? "  border-white text-white hover:bg-white  hover:text-black"
                        : " bg-black text-white hover:border-black hover:bg-white hover:text-black"
                    } `}>
                    Load More
                  </button>
                }
              </div>
            )}
          </main>
        )}
      </AppLayout>
      <AppFooter />
    </>
  );
}
