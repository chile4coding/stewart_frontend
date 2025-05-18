import React from "react";
import UserLayout from "@/components/userDashboardLayout/UserLayout";
import OrdersTable from "@/components/userDashboardLayout/orders/OrdersTable";
import { getuserOrders, setUser } from "@/redux/storeSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCookie, getCurrentUser } from "@/services/request";
import { useEffect } from "react";
import Head from "next/head";

export function MetaDataC({ title }) {
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
export default function Orders() {
  const { user, toggleMode } = useSelector((state) => state.store);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie();
    dispatch(getuserOrders(user.orders));
    async function fetchRequest() {
      if (Boolean(token)) {
        const response = await getCurrentUser(token);
        if (response.status === 200) {
          const user = await response.json();
          dispatch(setUser(user?.user));
        }
      }
    }

    fetchRequest();
  }, []);
  return (
    <>
      <MetaDataC title="Orders" />
      <UserLayout>
        <main className=" px-10  sm:px-0 max-h-[100vh]  overflow-y-scroll">
          <OrdersTable />
        </main>
      </UserLayout>
    </>
  );
}
