import AdminLayout from "@/components/admin/AdminLayout";
import OrderDetails from "@/components/admin/orders/OrderDetails";
import { MetaDataC } from "@/pages/orders";
import React from "react";

export default function Orders() {
  return (
    <>
      <MetaDataC title="Admin Orders" />
      <AdminLayout>
        <div className=" px-10 sm:px-4  max-h-[100vh]  overflow-y-scroll">
          <OrderDetails />
        </div>
      </AdminLayout>
    </>
  );
}
