import AdminLayout from '@/components/admin/AdminLayout'
import CustomersDetails from '@/components/admin/customers/CustomersDetails'
import React from 'react'

export default function Customers() {
  return (
    <AdminLayout>
      <main className="  px-10 sm:px-4 max-h-[100vh]  overflow-y-scroll">
        <CustomersDetails />
      </main>
    </AdminLayout>
  );
}
