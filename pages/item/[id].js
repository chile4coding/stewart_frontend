import React from 'react'
import { useRouter } from 'next/router'
import AppLayoout from '@/components/Layout/AppLayoout'
import SingleItem from '@/components/singleItem/SingleItem'


export default function ItemDescription() {
    const router  = useRouter()

    const {id} = router.query
  return (
    <AppLayoout>
    <div className=' p-10 sm:px-4'>
    <SingleItem/>

    </div>

    </AppLayoout>
  )
}
