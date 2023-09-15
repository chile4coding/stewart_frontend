import React from 'react'
import Items from '@/components/items/Items'
import AppLayoout from '@/components/Layout/AppLayoout'
import {AiOutlineDownCircle} from "react-icons/ai"
import { useState } from 'react'


function SortComponent(){


    return(<div className='card normal-case p-8 absolute  top-14 border right-0 bg-[white] text-black z-50'>
    <button className='btn btn-outline border-0 normal-case'>hoodies </button>
    <button className='btn btn-outline border-0 normal-case'>Joggers </button>
    <button className='btn btn-outline border-0 normal-case'>Polo </button>

  

    </div>)
}
export default function Shop() {
    const [show, setShow ] = useState(false)

    const handleShowState  = ()=>setShow(prev=>!prev)
  return (
    <AppLayoout>
      <div className="flex  justify-between  items-center mt-10 flex-wrap relative">
        <h2>Showing 7 products</h2>
        <button
          onClick={handleShowState}
          className=" btn btn-outline flex text-white normal-case">
          Sort <AiOutlineDownCircle />
        </button>

        {show && <SortComponent />}
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 bg-black text-white gap-4 my-8">
        <Items />
        <Items />
        <Items />

        <Items />
        <Items />
        <Items />

        <Items />
        <Items />
        <Items />
      </div>
      <div className=" flex justify-center ">
        <button className="btn btn-outline border-white text-white mx-auto normal ">
          Load More
        </button>
      </div>
    </AppLayoout>
  );
}
