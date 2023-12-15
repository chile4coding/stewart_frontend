import AdminLayout from '@/components/admin/AdminLayout'
import AdminSettings from '@/components/admin/settings/AdminSettings'
import { MetaDataC } from '@/pages/orders';
import React from 'react'

export default function Settings() {
  return (
    <>

      <MetaDataC title="Admin Settings"/>
    <AdminLayout>
      <main className="px-10 sm:px-4 max-h-[100vh]  overflow-y-scroll">
        <AdminSettings />
      </main>
    </AdminLayout>
    </>
  );
}
