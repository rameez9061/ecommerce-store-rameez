'use client'
import { ShoppingBagIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import userCartStore from '@/store';

export default function Carticon() {
   
     const [isClient , setIsClient] = useState(false);
     const groupedItems = userCartStore((state)=>state.getGroupedItems())
  
      useEffect(()=>{
        setIsClient(true)
      },[])

      if(!isClient) {
        return null;
      }


  return (
    <Link href={"/cart"} className='flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 shadow-md rounded-md hover:shadow-none hoverEffect'>
     <ShoppingBagIcon className='text-darkBlue w-6 h-6'/>
     <div className='flex flex-col'>
        <p className='text-xs'><span className='font-semibold'>{groupedItems?.length ? groupedItems?.length:0}</span> items</p>
        <p className='font-semibold'>Cart</p>
     </div>
    </Link>
  )
}
