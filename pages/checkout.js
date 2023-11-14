import React, { useEffect } from 'react'
import AppLayoout from '@/components/Layout/AppLayoout'
import Checkout from '@/components/checkout/Checkout'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';

export default function Check() {
   const { cart } =
     useSelector((state) => state.store);

  const router = useRouter()
  useEffect(()=>{

        if (cart.length < 1) {
           router.push("/shop");
           return;
        }
  },[])
  return (
    <AppLayoout>
        <Checkout/>
    </AppLayoout>
  )
}
