import AppLayoout from '@/components/Layout/AppLayoout'
import { Order } from '@/components/checkout/Checkout'
import PaymentDetails from '@/components/payment/Payment'
import React from 'react'


export default function Payment() {
  return (
    <div>
    <AppLayoout>
<div className=' grid grid-cols-2 p-10 gap-10  sm:grid-cols-1 sm:px-4  sm:gap-0'>
<div className=' sm:order-2'>
<PaymentDetails/>

</div>
<div>
    <Order/>

</div>
</div>
    </AppLayoout>

    </div>
  )
}
