import AdminLayout from '@/components/admin/AdminLayout'
import RevieswDetails from '@/components/admin/reviews/RevieswDetails'
import { MetaDataC } from '@/pages/orders';
import { setAdminReviews } from '@/redux/storeSlice';
import { adminGetreviews, getCookie } from '@/services/request';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Reviews() {
  const dispatch  =  useDispatch()
    const { user, toggleMode, adminReviews } = useSelector(
      (state) => state.store
    );

  useEffect(() => {

  }, [adminReviews]);
  return (

    <>

      <MetaDataC title="Admin Reviews"/>
    <AdminLayout>
      <main className=" px-10 sm:px-4 max-h-[100vh]  overflow-y-scroll">
        <RevieswDetails />
      </main>
    </AdminLayout>
    </>
  );
}
