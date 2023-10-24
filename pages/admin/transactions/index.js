import AdminLayout from '@/components/admin/AdminLayout'
import TransactionsDetails from '@/components/admin/transactions/TransactionsDetails'
import React from 'react'

export default function Transactions() {
  return (
   <AdminLayout>
    <main className=' px-10 sm:px-4'>
        <TransactionsDetails/>
    </main>
   </AdminLayout>
  )
}
