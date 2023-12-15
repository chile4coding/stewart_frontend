import AdminLayout from '@/components/admin/AdminLayout'
import AddProductColor from '@/components/admin/products/AddProductColor'
import { MetaDataC } from '@/pages/orders';
import React from 'react'

export default function Colors() {
  return (

    <>
      <MetaDataC  title="Product Color"/>
    <AdminLayout>
      <main className=" px-10 sm:px-4 max-h-[100vh]  overflow-y-scroll">
        <AddProductColor />
      </main>
    </AdminLayout>
    </>
  );
}
