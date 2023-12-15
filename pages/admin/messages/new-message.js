import AdminLayout from '@/components/admin/AdminLayout'
import NewMessage from '@/components/admin/message/NewMessage'
import { MetaDataC } from '@/pages/orders';
import React from 'react'

export default function New() {
  return (

    <>


      <MetaDataC title="Admin Add New Message"/>
    <AdminLayout>
      <div className="px-10 sm:px-4  max-h-[100vh]  overflow-y-scroll mb-16">
        <NewMessage />
      </div>
    </AdminLayout>
    </>
  );
}
