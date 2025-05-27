import React, { useEffect } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import Checkout from "@/components/checkout/Checkout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Head from "next/head";
import toast from "react-hot-toast";
import { isEmpty } from "lodash";
import AppFooter from "@/components/Footer/Footer";
function MetaDataN() {
  return (
    <Head>
      <title>Stewart Collection | Checkout</title>
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

export default function Check() {
  const { cart } = useSelector((state) => state.store);

  const router = useRouter();

  if (!Boolean(cart) || isEmpty(cart) || cart?.length < 1) {
    router.push("/shop");
    toast.error(<div className=" normal-case  text-[red]">Cart is empty</div>);

    return;
  }

  return (
    <>
      <MetaDataN />
      <AppLayout>
        <main className=" max-h-[100vh]  overflow-y-scroll">
          <Checkout />
        </main>
      </AppLayout>
      <AppFooter />
    </>
  );
}
