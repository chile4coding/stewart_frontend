import AdminLayout from "@/components/admin/AdminLayout";
import AdminProducts, { ProductTable } from "@/components/admin/products/AdminProducts";
import React from "react";

export default function Product() {
  return (
    <AdminLayout>
    <div className=" px-10  sm:px-4">
      <AdminProducts />

    </div>

      
    </AdminLayout>
  );
}
