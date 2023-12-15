import AdminLayout from '@/components/admin/AdminLayout'
import ProductColor from '@/components/admin/products/ProductColor'
import { MetaDataC } from '@/pages/orders';
import React from 'react'

export default function Details() {
  return (

    <>
      <MetaDataC title="Product Details"/>

    <AdminLayout>
      <main className=" px-10 sm:px-4 max-h-[100vh]  overflow-y-scroll">
        <ProductColor />
      </main>
    </AdminLayout>

    </>
  );
}
