import AdminLayout from "@/components/admin/AdminLayout";
import SingleOrder from "@/components/admin/orders/SingleOrder";
import React from "react";

export default function OrderDetail() {
  return (
    <AdminLayout>
      <main className=" px-10 sm:px-4">
        <SingleOrder />
      </main>
    </AdminLayout>
  );
}
