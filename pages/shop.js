import React, { useEffect } from "react";
import Items from "@/components/items/Items";
import AppLayoout from "@/components/Layout/AppLayoout";
import { AiOutlineDownCircle } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getProductByCategory, searchStore } from "@/redux/storeSlice";
import Head from "next/head";

export function MetaDat() {
  return (
    <Head>
      <title>Stewart Collection | Store</title>
      <meta
        name="description"
        content="   Explore the rise of juggers, the oversized garment defying gender norms. Break the mold! Show how polos infuse personality into formal suits
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

function SortComponent({ products }) {
  const {
    shop,
    toggleMode,
    singleProduct,
    category,
    newArrival,
    bestSelling,

    cart,

    products: product,
  } = useSelector((state) => state.store);

  const dispatch = useDispatch();
  const { isDark } = toggleMode;

  function handleCategory(id) {
    dispatch(getProductByCategory(id));
  }

  return (
    <div
      className={`card normal-case p-4 absolute  top-14 border right-10  z-50 ${
        isDark ? " bg-white border-black" : " bg-black text-white"
      }`}>
      <button
        onClick={() => dispatch(searchStore({ products, search: "" }))}
        className={` lowercase btn  btn-sm btn-outline border-0  ${
          isDark ? " hover:bg-black  hover:text-white" : "text-white"
        }`}>
        All
      </button>
      {category &&
        category.length > 0 &&
        category.map((item) => (
          <button
            key={item.id}
            onClick={handleCategory.bind(this, item.id)}
            className={` lowercase btn  btn-sm btn-outline border-0  ${
              isDark ? " hover:bg-black  hover:text-white" : "text-white"
            }`}>
            {item.name}
          </button>
        ))}
    </div>
  );
}
export default function Shop() {
  const [show, setShow] = useState(false);
  const { shop, toggleMode, products } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(2);

  const [more, setMore] = useState([]);
  const [less, showLess] = useState(false);
  const isDark = toggleMode?.isDark;
  const router = useRouter();

  useEffect(() => {
    if (shop.length > 0) {
      const itemDisplay = shop.slice(0, 10);

      setMore(itemDisplay);
    }
  }, [shop]);

  function handleSearch(e) {
    dispatch(searchStore({ products, search: e.target.value }));
    setSearch((prev) => e.target.value);
  }

  function loadMore() {
    const items = 10;
    const itemDisplay = shop.slice(0, items * count);
    if (itemDisplay?.length < 10) {
      return;
    }
    setMore((prev) => itemDisplay);
    setCount((prev) => prev + 1);

    if (itemDisplay.length === shop.length) {
      showLess(true);
    }
  }

  function loadLess() {
    const itemDisplay = shop.slice(0, 10);
    setMore((prev) => itemDisplay);
    showLess(false);
    setCount((prev) => 2);
  }

  const handleShowState = () => setShow((prev) => !prev);
  return (
    <>
      <MetaDat />
      <AppLayoout>
        <main className=" px-10 sm:px-4 ">
          <div className="flex  justify-between  items-center mt-10 flex-wrap relative ">
            <h2>Showing {more.length} products</h2>
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
            <button
              onClick={handleShowState}
              className={` btn btn-outline flex normal-case  ${
                isDark ? " border-white text-white" : ""
              }`}>
              Sort <AiOutlineDownCircle />
            </button>

            {show && <SortComponent products={products} />}
          </div>
          <div
            className={`grid lg:grid-cols-5 xl:grid-cols-5 md:grid-cols-4 md:gap-4 sm:grid-cols-3  gap-5  sm:gap-3 my-8 `}>
            {more &&
              more.length > 0 &&
              more.map((prod) => <Items items={prod} key={prod.id} />)}
          </div>
          <div className=" flex justify-center ">
            {!less && (
              <button
                onClick={loadMore}
                className={` my-4 btn btn-outline  mx-auto normal-case sm:btn-sm ${
                  isDark
                    ? "  border-white text-white hover:bg-white  hover:text-black"
                    : " bg-black text-white hover:border-black hover:bg-white hover:text-black"
                } `}>
                Load More
              </button>
            )}
            {less && (
              <button
                onClick={loadLess}
                className={` my-4 btn btn-outline  mx-auto normal-case sm:btn-sm ${
                  isDark
                    ? "  border-white text-white hover:bg-white  hover:text-black"
                    : " bg-black text-white hover:border-black hover:bg-white hover:text-black"
                } `}>
                Show less
              </button>
            )}
          </div>
        </main>
      </AppLayoout>
    </>
  );
}
