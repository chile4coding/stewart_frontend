import AdminLayout from "@/components/admin/AdminLayout";
import SingleOrder from "@/components/admin/orders/SingleOrder";
import { MetaDataC } from "@/pages/orders";
import React from "react";

export default function OrderDetail() {
  return (

    <>


      <MetaDataC title="Order Details"/>
    <AdminLayout>
      <main className=" px-10 sm:px-4 max-h-[100vh]  overflow-y-scroll">
        <SingleOrder />
      </main>
    </AdminLayout>
    </>
  );
}
