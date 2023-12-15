import AdminLayout from '@/components/admin/AdminLayout'
import AddProducts from '@/components/admin/products/AddProduct'
import { MetaDataC } from '@/pages/orders';
import React from 'react'


export default function AddProduct(){
  return (

    <>

      <MetaDataC title="Product Details"/>
    <AdminLayout>
      <div className=" px-10 sm:px-4 max-h-[100vh]  overflow-y-scroll">
        <AddProducts />
      </div>
    </AdminLayout>
    </>
  );
}

