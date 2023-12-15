import AdminLayout from "@/components/admin/AdminLayout";
import AdminProducts, { ProductTable } from "@/components/admin/products/AdminProducts";
import { MetaDataC } from "@/pages/orders";
import React from "react";

export default function Product() {
  return (
    <>

      <MetaDataC title="Products"/>
    <AdminLayout>
      <div className=" px-10  sm:px-4 max-h-[100vh]  overflow-y-scroll">
        <AdminProducts />
      </div>
    </AdminLayout>
    </>
  );
}
