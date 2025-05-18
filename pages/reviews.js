import UserLayout from "@/components/userDashboardLayout/UserLayout";
import ReviewDetails from "@/components/userDashboardLayout/reviews/ReviewDetails";
import { setUser } from "@/redux/storeSlice";
import { getCurrentUser } from "@/services/request";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

function MetaDataC({ title }) {
  return (
    <Head>
      <title>Stewart Collection | {title}</title>
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

export default function Reviews() {
  const { user, toggleMode, orders, orderDetails } = useSelector(
    (state) => state.store
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function handleUser() {
      const response = await getCurrentUser(token);
      if (response.status === 200) {
        const user = await response.json();
        dispatch(setUser(user?.user));
      }
    }
  }, [user]);
  return (
    <>
      <MetaDataC title="Reviews" />
      <UserLayout>
        <div className="p-10  sm:px-4 max-h-[100vh]  overflow-y-scroll">
          <ReviewDetails />
        </div>
      </UserLayout>
    </>
  );
}
